import { Inject, Injectable } from '@nestjs/common';
import { RechargeWalletReqDto } from 'src/shared/dtos/wallets/recharge-wallet-req.dto';
import { WalletBalanceReqDto } from 'src/shared/dtos/wallets/wallet-balance-req.dto';
import { IWalletAdapter } from 'src/modules/external/interfaces/wallets-adapter.interface';

import { ApiResponse } from 'src/core/responses/api-response.dto';
import { RechargeWalletResDto } from 'src/shared/dtos/wallets/recharge-wallet-res.dto';
import { WalletBalanceResDto } from 'src/shared/dtos/wallets/wallet-balance-res.dto';
import { IWalletService } from '../interfaces/wallet-service.interface';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constant';
import { handleErrorStatusCode } from 'src/common/helpers/handle-error-status-code.helper';

@Injectable()
export class WalletsService implements IWalletService {
  constructor(
    @Inject(INJECTION_TOKENS.WALLETS_ADAPTER)
    private readonly walletsAdapter: IWalletAdapter,
  ) {}

  async rechargeWallet(
    rechargeWalletDto: RechargeWalletReqDto,
  ): Promise<ApiResponse<RechargeWalletResDto>> {
    try {
      const { data } =
        await this.walletsAdapter.rechargeWallet(rechargeWalletDto);

      return data;
    } catch (err) {
      const exception = handleErrorStatusCode(err);

      throw exception;
    }
  }

  async getWalletBalance(
    walletBalanceReqDto: WalletBalanceReqDto,
  ): Promise<ApiResponse<WalletBalanceResDto>> {
    try {
      const { data } =
        await this.walletsAdapter.getBalance(walletBalanceReqDto);

      return data;
    } catch (err) {
      const exception = handleErrorStatusCode(err);

      throw exception;
    }
  }
}
