import type { AxiosResponse } from 'axios';
import type { ApiResponse } from 'src/core/responses/api-response.dto';
import type { RechargedWalletDto } from 'src/shared/dtos/wallets/recharged-wallet.dto';

export type WalletRechargeExtRes = AxiosResponse<
  ApiResponse<RechargedWalletDto>,
  any
>;
