import { ApiResponse } from 'src/core/responses/api-response.dto';
import { RechargeWalletDto } from 'src/shared/dtos/wallets/recharge-wallet.dto';
import { RechargedWalletDto } from 'src/shared/dtos/wallets/recharged-wallet.dto';
import { WalletBalanceReqDto } from 'src/shared/dtos/wallets/wallet-balance-req.dto';
import { WalletBalanceResDto } from 'src/shared/dtos/wallets/wallet-balance-res.dto';

export interface IWalletService {
  rechargeWallet(
    rechargeWalletDto: RechargeWalletDto,
  ): Promise<ApiResponse<RechargedWalletDto>>;

  getWalletBalance(
    walletBalanceReqDto: WalletBalanceReqDto,
  ): Promise<ApiResponse<WalletBalanceResDto>>;
}
