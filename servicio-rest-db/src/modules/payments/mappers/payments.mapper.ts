import { SavePaymentOrderDto } from '../dtos/save-payment-order.dto';
import { generateSixDigitToken } from '../utils/generate-six-digits-token.util';
import { generatSessionId } from '../utils/generate-session-id.util';
import type { MongooseUser } from 'src/common/types/mongoose-user.type';
import type { CreateOrderReqDto } from '../dtos/create-order-req.dto';
import { CreateOrderResDto } from '../dtos/create-order-res.dto';

export class PaymentsMapper {
  static toSavePaymentOrderDto(
    createOrderDto: CreateOrderReqDto,
    user: MongooseUser,
  ): SavePaymentOrderDto {
    const dto = new SavePaymentOrderDto();
    dto.amount = createOrderDto.amount;
    dto.userId = user.id;
    dto.token = generateSixDigitToken();
    dto.sessionId = generatSessionId();

    return dto;
  }

  static toCreateOrderResDto(
    savePaymentOrderDto: SavePaymentOrderDto,
  ): CreateOrderResDto {
    const dto = new CreateOrderResDto();

    dto.sessionId = savePaymentOrderDto.sessionId;

    return dto;
  }
}
