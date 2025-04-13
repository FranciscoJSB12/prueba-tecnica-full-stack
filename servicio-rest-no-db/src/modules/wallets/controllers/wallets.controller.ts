import { Body, Controller, Get, Inject, Patch, Query } from '@nestjs/common';
import { IWalletService } from '../interfaces/wallet-service.interface';
import { RechargeWalletReqDto } from 'src/shared/dtos/wallets/recharge-wallet-req.dto';
import { WalletBalanceReqDto } from 'src/shared/dtos/wallets/wallet-balance-req.dto';
import { runOrCatchError } from 'src/common/helpers/run-or-catch-error.helper';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constant';

@Controller('billeteras')
export class WalletsController {
  constructor(
    @Inject(INJECTION_TOKENS.WALLETS_SERVICE)
    private readonly walletsService: IWalletService,
  ) {}

  @Patch('recarga')
  async rechargeWallet(@Body() rechargeWalletDto: RechargeWalletReqDto) {
    return runOrCatchError(async () => {
      const result =
        await this.walletsService.rechargeWallet(rechargeWalletDto);

      return result;
    });
  }

  @Get('saldo')
  async getWalletBalance(@Query() walletBalanceReqDto: WalletBalanceReqDto) {
    return runOrCatchError(async () => {
      const result =
        await this.walletsService.getWalletBalance(walletBalanceReqDto);

      return result;
    });
  }
}
