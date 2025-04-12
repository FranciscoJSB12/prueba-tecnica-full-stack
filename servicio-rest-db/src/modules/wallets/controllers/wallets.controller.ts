import {
  Body,
  Controller,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { IWalletsService } from '../interfaces/wallets-service.interface';
import { INJECTION_TOKENS } from '../constants/injection-tokens.contant';
import { RechargeWalletDto } from '../dtos/recharge-wallet.dto';
import { ApiResponse } from 'src/core/responses/api-response.dto';
import { RechargedWalletDto } from '../dtos/recharged-wallet.dto';

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
      if (err instanceof NotFoundException) {
        throw new NotFoundException(ApiResponse.error(err.message));
      }

      throw new InternalServerErrorException(ApiResponse.error(err.message));
    }
  }
}
