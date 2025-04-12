import { RechargedWalletDto } from '../dtos/recharged-wallet.dto';
import { WalletBalanceResDto } from '../dtos/wallet-balance-res.dto';

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

  static toWalletBalanceResDto(balance: number): WalletBalanceResDto {
    const dto = new WalletBalanceResDto();
    dto.currentBalance = balance;

    return dto;
  }
}
