import { Body, Controller, Inject, Param, Patch, Post } from '@nestjs/common';
import { IPaymentService } from '../interfaces/payment-service.interface';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constant';
import { CreateOrderReqDto } from 'src/shared/dtos/payments/create-order-req.dto';
import { ConfirmOrderReqDto } from 'src/shared/dtos/payments/confirm-order-req.dto';
import { runOrCatchError } from 'src/common/helpers/run-or-catch-error.helper';

@Controller('pagos')
export class PaymentsController {
  constructor(
    @Inject(INJECTION_TOKENS.PAYMENTS_SERVICE)
    private readonly paymentsService: IPaymentService,
  ) {}

  @Post('nueva-compra')
  async createPaymentOrder(@Body() createOrderDto: CreateOrderReqDto) {
    return runOrCatchError(async () => {
      const result =
        await this.paymentsService.createPaymentOrder(createOrderDto);
      return result;
    });
  }

  @Patch(':id/confirmar')
  async confirmPayment(
    @Param('id') id: string,
    @Body() confirmOrderReqDto: ConfirmOrderReqDto,
  ) {
    return runOrCatchError(async () => {
      const result = await this.paymentsService.confirmPayment(
        id,
        confirmOrderReqDto,
      );
      return result;
    });
  }
}
