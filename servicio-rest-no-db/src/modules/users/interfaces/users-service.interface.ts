import { ApiResponse } from 'src/core/responses/api-response.dto';
import { RegisterCustomerReqDto } from 'src/shared/dtos/users/register-customer-req.dto';
import { RegisterCustomerResDto } from 'src/shared/dtos/users/register-customer-res.dto';

export interface IUsersService {
  registerCustomer(
    registerCustomerDto: RegisterCustomerReqDto,
  ): Promise<ApiResponse<RegisterCustomerResDto>>;
}
