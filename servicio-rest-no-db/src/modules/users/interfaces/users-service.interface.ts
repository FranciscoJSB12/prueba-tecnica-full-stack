import { ApiResponse } from 'src/core/responses/api-response.dto';
import { RegisterCustomerDto } from 'src/shared/dtos/users/register-customer.dto';
import { RegisteredCustomerDto } from 'src/shared/dtos/users/registered-customer.dto';

export interface IUsersService {
  registerCustomer(
    registerCustomerDto: RegisterCustomerDto,
  ): Promise<ApiResponse<RegisteredCustomerDto>>;
}
