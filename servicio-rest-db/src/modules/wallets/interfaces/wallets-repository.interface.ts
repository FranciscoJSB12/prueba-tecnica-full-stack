import type { ClientSession } from 'mongoose';
import type { MongooseUser } from 'src/common/types/mongoose-user.type';
import type { RechargeWalletDto } from '../dtos/recharge-wallet.dto';
import type { WalletBalanceReqDto } from '../dtos/wallet-balance-req.dto';

export interface IWalletsRepository {
  updateBalanceByUserCredentials(
    rechargeWalletDto: RechargeWalletDto,
  ): Promise<MongooseUser>;

  getBalanceByUserCredentials(
    walletBalanceReqDto: WalletBalanceReqDto,
  ): Promise<number>;

  updateBalanceByUser(
    id: string,
    amount: number,
    dbSession: ClientSession | null,
  ): Promise<MongooseUser>;
}
