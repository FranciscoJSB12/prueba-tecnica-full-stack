import type { AxiosResponse } from 'axios';
import type { ApiResponse } from 'src/core/responses/api-response.dto';

export type ConfirmPaymentOrderAxiosRes = AxiosResponse<ApiResponse<null>, any>;
