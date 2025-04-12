import { User } from 'src/modules/users/entities/user.entity';
import { RechargedWalletDto } from '../dtos/recharged-wallet.dto';

export class WalletMapper {
  static toRegisteredDto(
    balance: number,
    document: string,
  ): RechargedWalletDto {
    const dto = new RechargedWalletDto();

    dto.newBalance = balance;
    dto.documentOwner = document;

    return dto;
  }
}
