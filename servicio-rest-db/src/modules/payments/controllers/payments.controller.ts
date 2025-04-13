import { Body, Controller, Inject, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse } from 'src/core/responses/api-response.dto';
import { CreateOrderReqDto } from '../dtos/create-order-req.dto';
import { CreateOrderResDto } from '../dtos/create-order-res.dto';
import { ConfirmOrderReqDto } from '../dtos/confirm-order-req.dto';
import { IPaymentsService } from '../interfaces/payments-service.inteface';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constant';
import { runOrCatchError } from 'src/common/helpers/run-or-catch-error.helper';

@Controller('pagos')
export class PaymentsController {
  constructor(
    @Inject(INJECTION_TOKENS.PAYMENTS_SERVICE)
    private readonly paymentsService: IPaymentsService,
  ) {}

  @Post('nueva-compra')
  async createPaymentOrder(@Body() createOrderDto: CreateOrderReqDto) {
    return runOrCatchError(async () => {
      const dto = await this.paymentsService.createOrder(createOrderDto);

      return ApiResponse.success<CreateOrderResDto>(
        dto,
        'Token enviado al correo del usuario',
      );
    });
  }

  @Patch(':id/confirmar')
  async confirmPayment(
    @Param('id') id: string,
    @Body() confirmOrderReqDto: ConfirmOrderReqDto,
  ) {
    return runOrCatchError(async () => {
      await this.paymentsService.confirmOrder(id, confirmOrderReqDto);

      return ApiResponse.success<null>(null, 'Compra exitosa');
    });
  }
}
