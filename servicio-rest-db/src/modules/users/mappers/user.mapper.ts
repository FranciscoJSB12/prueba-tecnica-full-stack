import { RegisteredCustomerDto } from '../dtos/registered-customer.dto';
import type { MongooseUser } from '../../../common/types/mongoose-user.type';

export class UserMapper {
  static toRegisteredDto(userEntity: MongooseUser): RegisteredCustomerDto {
    const dto = new RegisteredCustomerDto();

    dto.id = userEntity.id;
    dto.document = userEntity.document;

    return dto;
  }
}
