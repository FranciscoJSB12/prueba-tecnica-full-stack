import { Body, Controller, Inject, Param, Patch, Post } from '@nestjs/common';
import { IPaymentService } from '../interfaces/payment-service.interface';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constant';
import { CreateOrderReqDto } from 'src/shared/dtos/payments/create-order-req.dto';
import { ConfirmOrderReqDto } from 'src/shared/dtos/payments/confirm-order-req.dto';
import { handleExceptionType } from 'src/common/helpers/handle-exception-type.helper';

@Controller('pagos')
export class PaymentsController {
  constructor(
    @Inject(INJECTION_TOKENS.PAYMENTS_SERVICE)
    private readonly paymentsService: IPaymentService,
  ) {}

  @Post('nueva-compra')
  async createPaymentOrder(@Body() createOrderDto: CreateOrderReqDto) {
    try {
      const result =
        await this.paymentsService.createPaymentOrder(createOrderDto);
      return result;
    } catch (err) {
      const exception = handleExceptionType(err);

      throw exception;
    }
  }

  @Patch(':id/confirmar')
  async confirmPayment(
    @Param('id') id: string,
    @Body() confirmOrderReqDto: ConfirmOrderReqDto,
  ) {
    try {
      const result = await this.paymentsService.confirmPayment(
        id,
        confirmOrderReqDto,
      );

      return result;
    } catch (err) {
      const exception = handleExceptionType(err);

      throw exception;
    }
  }
}
