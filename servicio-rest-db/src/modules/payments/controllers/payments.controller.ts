import {
  Body,
  Controller,
  Inject,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateOrderReqDto } from '../dtos/create-order-req.dto';
import { IPaymentsService } from '../interfaces/payments-service.inteface';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constant';
import { ApiResponse } from 'src/core/responses/api-response.dto';
import { CreateOrderResDto } from '../dtos/create-order-res.dto';

@Controller('payments')
export class PaymentsController {
  constructor(
    @Inject(INJECTION_TOKENS.PAYMENTS_SERVICE)
    private readonly paymentsService: IPaymentsService,
  ) {}

  @Post('new-order')
  async createPurchaseOrder(@Body() createOrderDto: CreateOrderReqDto) {
    try {
      const dto = await this.paymentsService.createOrder(createOrderDto);
      return ApiResponse.success<CreateOrderResDto>(dto);
    } catch (err) {
      throw new InternalServerErrorException(
        ApiResponse.error(`Error: ${err.message}`),
      );
    }
  }
}
