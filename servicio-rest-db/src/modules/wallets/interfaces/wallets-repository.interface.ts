import { MongooseUser } from 'src/common/types/mogoose-user.type';
import type { RechargeWalletDto } from '../dtos/recharge-wallet.dto';
import { WalletBalanceReqDto } from '../dtos/wallet-balance-req.dto';

export interface IWalletsRepository {
  updateBalanceByUserCredentials(
    rechargeWalletDto: RechargeWalletDto,
  ): Promise<MongooseUser>;

  getBalanceByUserCredentials(
    walletBalanceReqDto: WalletBalanceReqDto,
  ): Promise<number>;
}
