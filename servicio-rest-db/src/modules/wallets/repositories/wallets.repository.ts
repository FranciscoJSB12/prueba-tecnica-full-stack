import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { User } from 'src/modules/users/entities/user.entity';
import { RechargeWalletDto } from '../dtos/recharge-wallet.dto';
import { WalletBalanceReqDto } from '../dtos/wallet-balance-req.dto';
import { IWalletsRepository } from '../interfaces/wallets-repository.interface';
import { MongooseUser } from 'src/common/types/mongoose-user.type';

@Injectable()
export class WalletsRepository implements IWalletsRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async updateBalanceByUserCredentials(
    rechargeWalletDto: RechargeWalletDto,
  ): Promise<MongooseUser> {
    const updatedUser = await this.userModel
      .findOneAndUpdate(
        {
          document: rechargeWalletDto.document,
          cellphone: rechargeWalletDto.cellphone,
        },
        {
          $inc: { 'wallet.balance': rechargeWalletDto.amount },
          $set: { 'wallet.lastTransactionAt': Date.now() },
        },
        {
          new: true, // Retorna el documento como es LUEGO de la actualizacion
        },
      )
      .exec();

    if (!updatedUser) throw new NotFoundException('Cuenta no econtrada');

    return updatedUser;
  }

  async getBalanceByUserCredentials(
    walletBalanceReqDto: WalletBalanceReqDto,
  ): Promise<number> {
    const user = await this.userModel
      .findOne({
        document: walletBalanceReqDto.document,
        cellphone: walletBalanceReqDto.cellphone,
      })
      .exec();

    if (!user) throw new NotFoundException('Cuenta no econtrada');

    const currentBalance = user.wallet.balance;

    return currentBalance;
  }

  async updateBalanceByUser(
    id: string,
    amount: number,
    dbSession: ClientSession | null = null,
  ) {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        { _id: id },
        { $inc: { 'wallet.balance': amount } },
        { new: true },
      )
      .session(dbSession)
      .exec();

    if (!updatedUser) throw new NotFoundException('Cuenta no econtrada');

    return updatedUser;
  }
}
