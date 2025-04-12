import type { RechargeWalletDto } from '../dtos/recharge-wallet.dto';
import type { RechargedWalletDto } from '../dtos/recharged-wallet.dto';

export interface IWalletsRepository {
  updateBalanceByUserCredentials(
    rechargeWalletDto: RechargeWalletDto,
  ): Promise<RechargedWalletDto>;
}
