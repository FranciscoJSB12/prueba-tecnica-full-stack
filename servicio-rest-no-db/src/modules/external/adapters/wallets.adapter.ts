import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { envConfig } from 'src/config/env-config';
import { ApiResponse } from 'src/core/responses/api-response.dto';
import { RechargeWalletReqDto } from 'src/shared/dtos/wallets/recharge-wallet-req.dto';
import { RechargeWalletResDto } from 'src/shared/dtos/wallets/recharge-wallet-res.dto';
import { WalletBalanceReqDto } from 'src/shared/dtos/wallets/wallet-balance-req.dto';
import { WalletBalanceResDto } from 'src/shared/dtos/wallets/wallet-balance-res.dto';
import { WalletBalanceAxiosRes } from 'src/shared/types/wallets/wallet-balance-axios-res.type';
import { WalletRechargeAxiosRes } from 'src/shared/types/wallets/wallet-recharge-axios-res.type';
import { IWalletAdapter } from '../interfaces/wallets-adapter.interface';

@Injectable()
export class WalletsAdapter implements IWalletAdapter {
  baseUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = envConfig.restServiceDBBaseUrl();
  }

  rechargeWallet(
    rechargeWalletDto: RechargeWalletReqDto,
  ): Promise<WalletRechargeAxiosRes> {
    return firstValueFrom(
      this.httpService
        .patch<
          ApiResponse<RechargeWalletResDto>
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
  ): Promise<WalletBalanceAxiosRes> {
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
