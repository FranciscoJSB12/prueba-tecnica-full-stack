import { Inject, Injectable } from '@nestjs/common';
import { IPaymentsService } from '../interfaces/payments-service.inteface';
import { IPaymentsRepository } from '../interfaces/payments-repository.interface';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constant';
import { IUsersRepository } from 'src/modules/users/interfaces/users-repository.interface';
import { CreateOrderReqDto } from '../dtos/create-order-req.dto';
import { PaymentsMapper } from '../mappers/payments.mapper';
import { CreateOrderResDto } from '../dtos/create-order-res.dto';
import { IEmailAdapter } from 'src/modules/external/interfaces/email-adapter.interface';

@Injectable()
export class PaymentsService implements IPaymentsService {
  constructor(
    @Inject(INJECTION_TOKENS.PAYMENTS_REPOSITORY)
    private readonly paymentsRepository: IPaymentsRepository,
    @Inject(INJECTION_TOKENS.USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
    @Inject(INJECTION_TOKENS.EMAIL_ADAPTER)
    private readonly emailAdapter: IEmailAdapter,
  ) {}
  async createOrder(
    createOrderReqDto: CreateOrderReqDto,
  ): Promise<CreateOrderResDto> {
    const userEntity = await this.usersRepository.getUserByDocument(
      createOrderReqDto.document,
    );

    const orderDto = PaymentsMapper.toSavePaymentOrderDto(
      createOrderReqDto,
      userEntity,
    );
    const createOrderResDto = PaymentsMapper.toCreateOrderResDto({
      ...orderDto,
    });

    await this.paymentsRepository.createOrder(orderDto);

    await this.emailAdapter.sendMail(createOrderResDto.token, userEntity.email);

    return createOrderResDto;
  }
}
