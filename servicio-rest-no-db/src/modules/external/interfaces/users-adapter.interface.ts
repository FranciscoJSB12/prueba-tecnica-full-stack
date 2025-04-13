import type { RegisterCustomerDto } from 'src/shared/dtos/users/register-customer.dto';
import type { UserRes } from 'src/shared/types/users/users-res.type';

export interface IUsersAdapter {
  registerCustomer(registerCustomerDto: RegisterCustomerDto): Promise<UserRes>;
}
