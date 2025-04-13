import type { AxiosResponse } from 'axios';
import type { ApiResponse } from 'src/core/responses/api-response.dto';
import type { RegisterCustomerResDto } from 'src/shared/dtos/users/register-customer-res.dto';

export type RegisterUserAxiosRes = AxiosResponse<
  ApiResponse<RegisterCustomerResDto>,
  any
>;
