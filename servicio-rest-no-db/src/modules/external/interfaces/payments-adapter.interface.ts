import type { ConfirmOrderReqDto } from 'src/shared/dtos/payments/confirm-order-req.dto';
import type { CreateOrderReqDto } from 'src/shared/dtos/payments/create-order-req.dto';
import type { ConfirmPaymentOrderAxiosRes } from 'src/shared/types/payments/confirm-payment-order-axios-res.type';
import type { CreatePaymentOrderAxiosRes } from 'src/shared/types/payments/create-payment-order-axios-res.type';

export interface IPaymentAdapter {
  createPaymentOrder(
    createOrderReqDto: CreateOrderReqDto,
  ): Promise<CreatePaymentOrderAxiosRes>;

  confirmPayment(
    id: string,
    confirmOrderReqDto: ConfirmOrderReqDto,
  ): Promise<ConfirmPaymentOrderAxiosRes>;
}
