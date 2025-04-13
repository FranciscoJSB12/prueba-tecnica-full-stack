import { SavePaymentOrderDto } from '../dtos/save-payment-order.dto';

export interface IPaymentsRepository {
  createOrder(savePaymentDto: SavePaymentOrderDto): Promise<void>;
}
