import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/users/entities/user.entity';
import { WalletMapper } from '../mappers/wallet.mapper';
import { RechargeWalletDto } from '../dtos/recharge-wallet.dto';
import { IWalletsRepository } from '../interfaces/wallets-repository.interface';
import { RechargedWalletDto } from '../dtos/recharged-wallet.dto';

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
          new: true,
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
}
