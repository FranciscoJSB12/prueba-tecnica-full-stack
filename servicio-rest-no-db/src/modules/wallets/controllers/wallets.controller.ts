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
import { IWalletService } from '../interfaces/wallet-service.interface';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constants';
import { RechargeWalletDto } from 'src/shared/dtos/wallets/recharge-wallet.dto';
import { ApiResponse } from 'src/core/responses/api-response.dto';
import { WalletBalanceReqDto } from 'src/shared/dtos/wallets/wallet-balance-req.dto';

@Controller('billeteras')
export class WalletsController {
  constructor(
    @Inject(INJECTION_TOKENS.WALLETS_SERVICE)
    private readonly walletsService: IWalletService,
  ) {}

  @Patch('recarga')
  async rechargeWallet(@Body() rechargeWalletDto: RechargeWalletDto) {
    try {
      const dto = await this.walletsService.rechargeWallet(rechargeWalletDto);

      return dto;
    } catch (err) {
      const exception = this.HandleException(err);

      throw exception;
    }
  }

  @Get('saldo')
  async getWalletBalance(@Query() walletBalanceReqDto: WalletBalanceReqDto) {
    try {
      const dto =
        await this.walletsService.getWalletBalance(walletBalanceReqDto);

      return dto;
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
