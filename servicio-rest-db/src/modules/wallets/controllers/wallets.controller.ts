import { Body, Controller, Get, Inject, Patch, Query } from '@nestjs/common';
import { IWalletsService } from '../interfaces/wallets-service.interface';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constant';
import { RechargeWalletDto } from '../dtos/recharge-wallet.dto';
import { ApiResponse } from 'src/core/responses/api-response.dto';
import { RechargedWalletDto } from '../dtos/recharged-wallet.dto';
import { WalletBalanceReqDto } from '../dtos/wallet-balance-req.dto';
import { WalletBalanceResDto } from '../dtos/wallet-balance-res.dto';
import { runOrCatchError } from 'src/common/helpers/run-or-catch-error.helper';

@Controller('billeteras')
export class WalletsController {
  constructor(
    @Inject(INJECTION_TOKENS.WALLETS_SERVICE)
    private readonly walletsService: IWalletsService,
  ) {}

  @Patch('recarga')
  async rechargeWallet(@Body() rechargeWalletDto: RechargeWalletDto) {
    return runOrCatchError(async () => {
      const dto = await this.walletsService.rechargeWallet(rechargeWalletDto);

      return ApiResponse.success<RechargedWalletDto>(dto);
    });
  }

  @Get('saldo')
  async getWalletBalance(@Query() walletBalanceReqDto: WalletBalanceReqDto) {
    return runOrCatchError(async () => {
      const dto = await this.walletsService.getBalance(walletBalanceReqDto);

      return ApiResponse.success<WalletBalanceResDto>(dto);
    });
  }
}
