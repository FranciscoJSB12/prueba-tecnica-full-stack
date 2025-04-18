import { AxiosResponse } from 'axios';
import { ApiResponse } from 'src/core/responses/api-response.dto';
import { WalletBalanceResDto } from 'src/shared/dtos/wallets/wallet-balance-res.dto';

export type WalletBalanceAxiosRes = AxiosResponse<
  ApiResponse<WalletBalanceResDto>,
  any
>;
