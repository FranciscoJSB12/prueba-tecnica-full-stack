import type { ConfirmOrderReqDto } from '../dtos/confirm-order-req.dto';
import type { CreateOrderReqDto } from '../dtos/create-order-req.dto';
import type { CreateOrderResDto } from '../dtos/create-order-res.dto';

export interface IPaymentsService {
  createOrder(createOrderReqDto: CreateOrderReqDto): Promise<CreateOrderResDto>;

  confirmOrder(sessionId: string, confirmOrderReqDto: ConfirmOrderReqDto);
}
