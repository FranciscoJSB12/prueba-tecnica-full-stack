import type { ClientSession } from 'mongoose';
import type { ConfirmOrderReqDto } from '../dtos/confirm-order-req.dto';
import type { SavePaymentOrderDto } from '../dtos/save-payment-order.dto';
import type { MongoosePayment } from '../types/mongoose-payment.type';

export interface IPaymentsRepository {
  createOrder(savePaymentDto: SavePaymentOrderDto): Promise<void>;

  findOrderBySessionId(
    sessionId: string,
    dbSession: ClientSession | null,
  ): Promise<MongoosePayment>;

  confirmOrder(
    sessionId: string,
    confirmOrderReqDto: ConfirmOrderReqDto,
    dbSession: ClientSession | null,
  ): Promise<MongoosePayment>;
}
