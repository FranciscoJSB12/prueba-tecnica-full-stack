import { RegisterCustomerDto } from '../dtos/register-customer.dto';
import { RegisteredCustomerDto } from '../dtos/registered-customer.dto';
import { User } from '../entities/user.entity';

export class UserMapper {
  static toRegisteredDto(userEntity: User): RegisteredCustomerDto {
    const dto = new RegisteredCustomerDto();

    dto.id = userEntity.id;
    dto.document = userEntity.document;

    return dto;
  }
}
