import { Inject, Injectable } from '@nestjs/common';
import { IWalletsService } from '../interfaces/wallets-service.interface';
import { IWalletsRepository } from '../interfaces/wallets-repository.interface';
import { RechargeWalletDto } from '../dtos/recharge-wallet.dto';
import { RechargedWalletDto } from '../dtos/recharged-wallet.dto';
import { INJECTION_TOKENS } from '../constants/injection-tokens.contant';
import { WalletBalanceReqDto } from '../dtos/wallet-balance-req.dto';
import { WalletMapper } from '../mappers/wallet.mapper';
import { WalletBalanceResDto } from '../dtos/wallet-balance-res.dto';

@Injectable()
export class WalletsService implements IWalletsService {
  constructor(
    @Inject(INJECTION_TOKENS.WALLETS_REPOSITORY)
    private readonly walletsRepository: IWalletsRepository,
  ) {}

  async rechargeWallet(
    rechargeWalletDto: RechargeWalletDto,
  ): Promise<RechargedWalletDto> {
    const dto =
      await this.walletsRepository.updateBalanceByUserCredentials(
        rechargeWalletDto,
      );

    return dto;
  }

  async getBalance(
    walletBalanceReqDto: WalletBalanceReqDto,
  ): Promise<WalletBalanceResDto> {
    const balance =
      await this.walletsRepository.getBalanceByUserCredentials(
        walletBalanceReqDto,
      );

    return WalletMapper.toWalletBalanceResDto(balance);
  }
}
