import { ApiResponse } from 'src/core/responses/api-response.dto';
import { ConfirmOrderReqDto } from 'src/shared/dtos/payments/confirm-order-req.dto';
import { CreateOrderReqDto } from 'src/shared/dtos/payments/create-order-req.dto';
import { CreateOrderResDto } from 'src/shared/dtos/payments/create-order-res.dto';

export interface IPaymentService {
  createPaymentOrder(
    createOrderReqDto: CreateOrderReqDto,
  ): Promise<ApiResponse<CreateOrderResDto>>;

  confirmPayment(
    id: string,
    confirmOrderReqDto: ConfirmOrderReqDto,
  ): Promise<ApiResponse<null>>;
}
