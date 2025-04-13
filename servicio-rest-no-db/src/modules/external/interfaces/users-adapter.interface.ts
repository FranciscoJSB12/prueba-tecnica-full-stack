import type { RegisterCustomerDto } from 'src/shared/dtos/users/register-customer.dto';
import type { UserExtRes } from 'src/shared/types/users/users-ext-res.type';

export interface IUsersAdapter {
  registerCustomer(
    registerCustomerDto: RegisterCustomerDto,
  ): Promise<UserExtRes>;
}
