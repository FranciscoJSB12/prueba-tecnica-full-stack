import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Patch,
  Query,
} from '@nestjs/common';
import { IWalletsService } from '../interfaces/wallets-service.interface';
import { INJECTION_TOKENS } from '../constants/injection-tokens.contant';
import { RechargeWalletDto } from '../dtos/recharge-wallet.dto';
import { ApiResponse } from 'src/core/responses/api-response.dto';
import { RechargedWalletDto } from '../dtos/recharged-wallet.dto';
import { WalletBalanceReqDto } from '../dtos/wallet-balance-req.dto';
import { WalletBalanceResDto } from '../dtos/wallet-balance-res.dto';

@Controller('wallets')
export class WalletsController {
  constructor(
    @Inject(INJECTION_TOKENS.WALLETS_SERVICE)
    private readonly walletsService: IWalletsService,
  ) {}

  @Patch('recharge')
  async rechargeWallet(@Body() rechargeWalletDto: RechargeWalletDto) {
    try {
      const dto = await this.walletsService.rechargeWallet(rechargeWalletDto);

      return ApiResponse.success<RechargedWalletDto>(dto);
    } catch (err) {
      const exception = this.HandleException(err);

      throw exception;
    }
  }

  @Get('balance')
  async getWalletBalance(@Query() walletBalanceReqDto: WalletBalanceReqDto) {
    try {
      const dto = await this.walletsService.getBalance(walletBalanceReqDto);

      return ApiResponse.success<WalletBalanceResDto>(dto);
    } catch (err) {
      const exception = this.HandleException(err);

      throw exception;
    }
  }

  private HandleException(err: any) {
    if (err instanceof NotFoundException) {
      return new NotFoundException(ApiResponse.error(err.message));
    }

    return new InternalServerErrorException(ApiResponse.error(err.message));
  }
}
