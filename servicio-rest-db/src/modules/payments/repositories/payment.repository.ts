import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from '../entities/payment.entity';
import { SavePaymentOrderDto } from '../dtos/save-payment-order.dto';
import { IPaymentsRepository } from '../interfaces/payments-repository.interface';

@Injectable()
export class PaymentsRepository implements IPaymentsRepository {
  constructor(
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<Payment>,
  ) {}

  async createOrder(savePaymentOrderDto: SavePaymentOrderDto): Promise<void> {
    const paymentOrder = await this.paymentModel.create({
      sessionId: savePaymentOrderDto.sessionId,
      token: savePaymentOrderDto.token,
      amount: savePaymentOrderDto.amount,
      user: savePaymentOrderDto.userId,
    });
  }
}
