import { Inject, Injectable } from '@nestjs/common';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constant';
import { handleErrorStatusCode } from 'src/common/helpers/handle-error-status-code.helper';
import { ApiResponse } from 'src/core/responses/api-response.dto';
import { IPaymentAdapter } from 'src/modules/external/interfaces/payments-adapter.interface';
import { ConfirmOrderReqDto } from 'src/shared/dtos/payments/confirm-order-req.dto';
import { CreateOrderReqDto } from 'src/shared/dtos/payments/create-order-req.dto';
import { CreateOrderResDto } from 'src/shared/dtos/payments/create-order-res.dto';
import { IPaymentService } from '../interfaces/payment-service.interface';

@Injectable()
export class PaymentsService implements IPaymentService {
  constructor(
    @Inject(INJECTION_TOKENS.PAYMENTS_ADAPTER)
    private readonly paymentsAdapter: IPaymentAdapter,
  ) {}

  async createPaymentOrder(
    createOrderReqDto: CreateOrderReqDto,
  ): Promise<ApiResponse<CreateOrderResDto>> {
    try {
      const { data } =
        await this.paymentsAdapter.createPaymentOrder(createOrderReqDto);

      return data;
    } catch (err) {
      const exception = handleErrorStatusCode(err);

      throw exception;
    }
  }

  async confirmPayment(
    id: string,
    confirmOrderReqDto: ConfirmOrderReqDto,
  ): Promise<ApiResponse<null>> {
    try {
      const { data } = await this.paymentsAdapter.confirmPayment(
        id,
        confirmOrderReqDto,
      );

      return data;
    } catch (err) {
      const exception = handleErrorStatusCode(err);

      throw exception;
    }
  }
}
