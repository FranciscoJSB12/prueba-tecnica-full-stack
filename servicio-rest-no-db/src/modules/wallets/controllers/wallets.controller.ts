import { Body, Controller, Get, Inject, Patch, Query } from '@nestjs/common';
import { IWalletService } from '../interfaces/wallet-service.interface';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constant';
import { RechargeWalletReqDto } from 'src/shared/dtos/wallets/recharge-wallet-req.dto';
import { WalletBalanceReqDto } from 'src/shared/dtos/wallets/wallet-balance-req.dto';
import { handleExceptionType } from 'src/common/helpers/handle-exception-type.helper';

@Controller('billeteras')
export class WalletsController {
  constructor(
    @Inject(INJECTION_TOKENS.WALLETS_SERVICE)
    private readonly walletsService: IWalletService,
  ) {}

  @Patch('recarga')
  async rechargeWallet(@Body() rechargeWalletDto: RechargeWalletReqDto) {
    try {
      const result =
        await this.walletsService.rechargeWallet(rechargeWalletDto);

      return result;
    } catch (err) {
      const exception = handleExceptionType(err);

      throw exception;
    }
  }

  @Get('saldo')
  async getWalletBalance(@Query() walletBalanceReqDto: WalletBalanceReqDto) {
    try {
      const result =
        await this.walletsService.getWalletBalance(walletBalanceReqDto);

      return result;
    } catch (err) {
      const exception = handleExceptionType(err);

      throw exception;
    }
  }
}
