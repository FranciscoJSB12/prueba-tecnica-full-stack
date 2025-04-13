import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ClientSession, Connection } from 'mongoose';
import { dbTransactionHandler } from 'src/common/utils/db-transaction-handler';
import { PaymentsMapper } from '../mappers/payments.mapper';
import { CreateOrderReqDto } from '../dtos/create-order-req.dto';
import { CreateOrderResDto } from '../dtos/create-order-res.dto';
import { ConfirmOrderReqDto } from '../dtos/confirm-order-req.dto';
import { IEmailAdapter } from 'src/modules/external/interfaces/email-adapter.interface';
import { IPaymentsService } from '../interfaces/payments-service.inteface';
import { IPaymentsRepository } from '../interfaces/payments-repository.interface';
import { IUsersRepository } from 'src/modules/users/interfaces/users-repository.interface';
import { IWalletsRepository } from 'src/modules/wallets/interfaces/wallets-repository.interface';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constant';

@Injectable()
export class PaymentsService implements IPaymentsService {
  constructor(
    @Inject(INJECTION_TOKENS.PAYMENTS_REPOSITORY)
    private readonly paymentsRepository: IPaymentsRepository,
    @Inject(INJECTION_TOKENS.USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
    @Inject(INJECTION_TOKENS.WALLETS_REPOSITORY)
    private readonly walletsRepository: IWalletsRepository,
    @Inject(INJECTION_TOKENS.EMAIL_ADAPTER)
    private readonly emailAdapter: IEmailAdapter,
    @InjectConnection() private connection: Connection,
  ) {}
  async createOrder(
    createOrderReqDto: CreateOrderReqDto,
  ): Promise<CreateOrderResDto> {
    const userEntity = await this.usersRepository.getUserByDocument(
      createOrderReqDto.document,
    );

    if (userEntity.wallet.balance == 0) {
      throw new BadRequestException('Cuenta sin fondos');
    }

    if (userEntity.wallet.balance < createOrderReqDto.amount) {
      throw new BadRequestException('Saldo insuficiente');
    }

    const orderDto = PaymentsMapper.toSavePaymentOrderDto(
      createOrderReqDto,
      userEntity,
    );

    const token = orderDto.token;

    const createOrderResDto = PaymentsMapper.toCreateOrderResDto({
      ...orderDto,
    });

    await this.paymentsRepository.createOrder(orderDto);

    await this.emailAdapter.sendMail(token, userEntity.email);

    return createOrderResDto;
  }

  async confirmOrder(
    sessionId: string,
    confirmOrderReqDto: ConfirmOrderReqDto,
  ) {
    await dbTransactionHandler(
      this.connection,
      async (dbSession: ClientSession) => {
        const order = await this.paymentsRepository.findOrderBySessionId(
          sessionId,
          dbSession,
        );

        if (order.isConfirmed) {
          throw new BadRequestException('Esta orden ya ha sido confirmada');
        }

        if (order.token !== confirmOrderReqDto.confirmationToken) {
          throw new BadRequestException('Token incorrecto');
        }

        if (new Date() > order.tokenExpirationDate) {
          throw new ForbiddenException('Token expirado');
        }

        await this.paymentsRepository.confirmOrder(
          sessionId,
          confirmOrderReqDto,
          dbSession,
        );

        await this.walletsRepository.updateBalanceByUser(
          order.userId,
          order.amount * -1,
          dbSession,
        );
      },
    );
  }
}
