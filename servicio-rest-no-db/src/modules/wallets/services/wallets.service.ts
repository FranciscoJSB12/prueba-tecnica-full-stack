import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RechargeWalletDto } from 'src/shared/dtos/wallets/recharge-wallet.dto';
import { WalletBalanceReqDto } from 'src/shared/dtos/wallets/wallet-balance-req.dto';
import { IWalletAdapter } from 'src/modules/external/interfaces/wallets-adapter.interface';
import { CheckAxiosError } from 'src/common/utils/check-axios-error.util';
import { ApiResponse } from 'src/core/responses/api-response.dto';
import { RechargedWalletDto } from 'src/shared/dtos/wallets/recharged-wallet.dto';
import { WalletBalanceResDto } from 'src/shared/dtos/wallets/wallet-balance-res.dto';
import { IWalletService } from '../interfaces/wallet-service.interface';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constants';

@Injectable()
export class WalletsService implements IWalletService {
  constructor(
    @Inject(INJECTION_TOKENS.WALLETS_ADAPTER)
    private readonly walletsAdapter: IWalletAdapter,
  ) {}

  async rechargeWallet(
    rechargeWalletDto: RechargeWalletDto,
  ): Promise<ApiResponse<RechargedWalletDto>> {
    try {
      const { data } =
        await this.walletsAdapter.rechargeWallet(rechargeWalletDto);

      return data;
    } catch (err) {
      const ex = this.HandleException(err);
      throw ex;
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
      const ex = this.HandleException(err);
      throw ex;
    }
  }

  private HandleException(err: any) {
    const axiosErr = CheckAxiosError(err);

    if (!axiosErr || axiosErr.statusCode !== 404)
      return new InternalServerErrorException(err.message);

    return new NotFoundException(axiosErr.message);
  }
}
