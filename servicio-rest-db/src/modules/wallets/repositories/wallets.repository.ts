import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/users/entities/user.entity';
import { WalletMapper } from '../mappers/wallet.mapper';
import { RechargeWalletDto } from '../dtos/recharge-wallet.dto';
import { RechargedWalletDto } from '../dtos/recharged-wallet.dto';
import { WalletBalanceReqDto } from '../dtos/wallet-balance-req.dto';
import { IWalletsRepository } from '../interfaces/wallets-repository.interface';

@Injectable()
export class WalletsRepository implements IWalletsRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async updateBalanceByUserCredentials(
    rechargeWalletDto: RechargeWalletDto,
  ): Promise<RechargedWalletDto> {
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
          lean: true,
        },
      )
      .exec();

    if (!updatedUser) throw new NotFoundException('Account not found');

    return WalletMapper.toRegisteredDto(
      updatedUser.wallet.balance,
      updatedUser.document,
    );
  }

  async getBalanceByUserCredentials(
    walletBalanceReqDto: WalletBalanceReqDto,
  ): Promise<number> {
    const user = await this.userModel
      .findOne(
        {
          document: walletBalanceReqDto.document,
          cellphone: walletBalanceReqDto.cellphone,
        },
        {},
        {
          lean: true,
        },
      )
      .exec();

    if (!user) throw new NotFoundException('Account not found');

    const currentBalance = user.wallet.balance;

    return currentBalance;
  }
}
