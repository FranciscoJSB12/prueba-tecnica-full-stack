import type { RechargeWalletDto } from '../dtos/recharge-wallet.dto';
import type { RechargedWalletDto } from '../dtos/recharged-wallet.dto';
import type { WalletBalanceReqDto } from '../dtos/wallet-balance-req.dto';
import type { WalletBalanceResDto } from '../dtos/wallet-balance-res.dto';

export interface IWalletsService {
  rechargeWallet(
    rechargeWalletDto: RechargeWalletDto,
  ): Promise<RechargedWalletDto>;

  getBalance(
    walletBalanceReqDto: WalletBalanceReqDto,
  ): Promise<WalletBalanceResDto>;
}
