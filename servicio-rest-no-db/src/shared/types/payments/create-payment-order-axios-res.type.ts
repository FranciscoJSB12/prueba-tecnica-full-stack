import { AxiosResponse } from 'axios';
import { ApiResponse } from 'src/core/responses/api-response.dto';
import { CreateOrderResDto } from 'src/shared/dtos/payments/create-order-res.dto';

export type CreatePaymentOrderAxiosRes = AxiosResponse<
  ApiResponse<CreateOrderResDto>,
  any
>;
