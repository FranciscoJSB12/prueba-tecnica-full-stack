import type { AxiosResponse } from 'axios';
import type { ApiResponse } from 'src/core/responses/api-response.dto';
import type { RechargeWalletResDto } from 'src/shared/dtos/wallets/recharge-wallet-res.dto';

export type WalletRechargeAxiosRes = AxiosResponse<
  ApiResponse<RechargeWalletResDto>,
  any
>;
