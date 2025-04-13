import { MongooseUser } from 'src/common/types/mongoose-user.type';
import { RechargedWalletDto } from '../dtos/recharged-wallet.dto';
import { WalletBalanceResDto } from '../dtos/wallet-balance-res.dto';

export class WalletMapper {
  static toRegisteredDto(userWithWallet: MongooseUser): RechargedWalletDto {
    const dto = new RechargedWalletDto();

    dto.newBalance = userWithWallet.wallet.balance;
    dto.documentOwner = userWithWallet.document;

    return dto;
  }

  static toWalletBalanceResDto(balance: number): WalletBalanceResDto {
    const dto = new WalletBalanceResDto();
    dto.currentBalance = balance;

    return dto;
  }
}
