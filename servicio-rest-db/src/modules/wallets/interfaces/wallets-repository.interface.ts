import type { RechargeWalletDto } from '../dtos/recharge-wallet.dto';
import type { RechargedWalletDto } from '../dtos/recharged-wallet.dto';
import { WalletBalanceReqDto } from '../dtos/wallet-balance-req.dto';

export interface IWalletsRepository {
  updateBalanceByUserCredentials(
    rechargeWalletDto: RechargeWalletDto,
  ): Promise<RechargedWalletDto>;

  getBalanceByUserCredentials(
    walletBalanceReqDto: WalletBalanceReqDto,
  ): Promise<number>;
}
