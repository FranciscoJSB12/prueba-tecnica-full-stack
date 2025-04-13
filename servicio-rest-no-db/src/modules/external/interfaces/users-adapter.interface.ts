import type { RegisterCustomerReqDto } from 'src/shared/dtos/users/register-customer-req.dto';
import type { RegisterUserAxiosRes } from 'src/shared/types/users/register-user-axios-res.type';

export interface IUsersAdapter {
  registerCustomer(
    registerCustomerDto: RegisterCustomerReqDto,
  ): Promise<RegisterUserAxiosRes>;
}
