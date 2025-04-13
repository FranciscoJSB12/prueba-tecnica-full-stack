import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { envConfig } from 'src/config/env-config';
import { ApiResponse } from 'src/core/responses/api-response.dto';
import { ConfirmOrderReqDto } from 'src/shared/dtos/payments/confirm-order-req.dto';
import { CreateOrderReqDto } from 'src/shared/dtos/payments/create-order-req.dto';
import { CreateOrderResDto } from 'src/shared/dtos/payments/create-order-res.dto';
import { ConfirmPaymentOrderAxiosRes } from 'src/shared/types/payments/confirm-payment-order-axios-res.type';
import { CreatePaymentOrderAxiosRes } from 'src/shared/types/payments/create-payment-order-axios-res.type';
import { IPaymentAdapter } from '../interfaces/payments-adapter.interface';

@Injectable()
export class PaymentsAdapter implements IPaymentAdapter {
  baseUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = envConfig.restServiceDBBaseUrl();
  }

  async createPaymentOrder(
    createOrderReqDto: CreateOrderReqDto,
  ): Promise<CreatePaymentOrderAxiosRes> {
    return firstValueFrom(
      this.httpService
        .post<
          ApiResponse<CreateOrderResDto>
        >(`${this.baseUrl}/pagos/nueva-compra`, createOrderReqDto)
        .pipe(
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
    );
  }

  async confirmPayment(
    id: string,
    confirmOrderReqDto: ConfirmOrderReqDto,
  ): Promise<ConfirmPaymentOrderAxiosRes> {
    return firstValueFrom(
      this.httpService
        .patch<
          ApiResponse<null>
        >(`${this.baseUrl}/pagos/${id}/confirmar`, confirmOrderReqDto)
        .pipe(
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
    );
  }
}
