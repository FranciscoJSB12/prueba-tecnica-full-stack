import type { AxiosResponse } from 'axios';
import type { ApiResponse } from 'src/core/responses/api-response.dto';
import type { RegisteredCustomerDto } from 'src/shared/dtos/users/registered-customer.dto';

export type UserRes = AxiosResponse<ApiResponse<RegisteredCustomerDto>, any>;
