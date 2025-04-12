import type { RegisterCustomerDto } from '../dtos/register-customer.dto';
import type { RegisteredCustomerDto } from '../dtos/registered-customer.dto';

export interface IUsersService {
  registerCustomer(
    registerCustomerDto: RegisterCustomerDto,
  ): Promise<RegisteredCustomerDto>;
}
