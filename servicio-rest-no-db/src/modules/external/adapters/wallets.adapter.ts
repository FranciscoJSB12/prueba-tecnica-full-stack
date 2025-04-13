import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { envConfig } from 'src/config/env-config';
import { ApiResponse } from 'src/core/responses/api-response.dto';
import { RechargeWalletDto } from 'src/shared/dtos/wallets/recharge-wallet.dto';
import { RechargedWalletDto } from 'src/shared/dtos/wallets/recharged-wallet.dto';
import { WalletBalanceReqDto } from 'src/shared/dtos/wallets/wallet-balance-req.dto';
import { WalletBalanceResDto } from 'src/shared/dtos/wallets/wallet-balance-res.dto';
import { WalletBalanceExtRes } from 'src/shared/types/wallets/wallet-balance-ext-res.type';
import { WalletRechargeExtRes } from 'src/shared/types/wallets/wallet-recharge-ext-res.type';
import { IWalletAdapter } from '../interfaces/wallets-adapter.interface';

@Injectable()
export class WalletsAdapter implements IWalletAdapter {
  baseUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = envConfig.restServiceDBBaseUrl();
  }

  rechargeWallet(
    rechargeWalletDto: RechargeWalletDto,
  ): Promise<WalletRechargeExtRes> {
    return firstValueFrom(
      this.httpService
        .patch<
          ApiResponse<RechargedWalletDto>
        >(`${this.baseUrl}/billeteras/recarga`, rechargeWalletDto)
        .pipe(
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
    );
  }

  getBalance(
    walletBalanceReqDto: WalletBalanceReqDto,
  ): Promise<WalletBalanceExtRes> {
    return firstValueFrom(
      this.httpService
        .get<ApiResponse<WalletBalanceResDto>>(
          `${this.baseUrl}/billeteras/saldo`,
          {
            params: {
              document: walletBalanceReqDto.document,
              cellphone: walletBalanceReqDto.cellphone,
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
    );
  }
}
