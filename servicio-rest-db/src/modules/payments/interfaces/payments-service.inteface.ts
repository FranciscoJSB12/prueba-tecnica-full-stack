import { CreateOrderReqDto } from '../dtos/create-order-req.dto';
import { CreateOrderResDto } from '../dtos/create-order-res.dto';

export interface IPaymentsService {
  createOrder(createOrderReqDto: CreateOrderReqDto): Promise<CreateOrderResDto>;
}
