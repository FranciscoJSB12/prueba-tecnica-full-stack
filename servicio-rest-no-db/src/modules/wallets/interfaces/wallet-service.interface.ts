import { ApiResponse } from 'src/core/responses/api-response.dto';
import { RechargeWalletReqDto } from 'src/shared/dtos/wallets/recharge-wallet-req.dto';
import { RechargeWalletResDto } from 'src/shared/dtos/wallets/recharge-wallet-res.dto';
import { WalletBalanceReqDto } from 'src/shared/dtos/wallets/wallet-balance-req.dto';
import { WalletBalanceResDto } from 'src/shared/dtos/wallets/wallet-balance-res.dto';

export interface IWalletService {
  rechargeWallet(
    rechargeWalletDto: RechargeWalletReqDto,
  ): Promise<ApiResponse<RechargeWalletResDto>>;

  getWalletBalance(
    walletBalanceReqDto: WalletBalanceReqDto,
  ): Promise<ApiResponse<WalletBalanceResDto>>;
}
