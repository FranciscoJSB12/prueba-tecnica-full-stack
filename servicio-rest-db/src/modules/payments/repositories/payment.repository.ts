import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Payment } from '../entities/payment.entity';
import { SavePaymentOrderDto } from '../dtos/save-payment-order.dto';
import { ConfirmOrderReqDto } from '../dtos/confirm-order-req.dto';
import { IPaymentsRepository } from '../interfaces/payments-repository.interface';
import { MongoosePayment } from '../types/mongoose-payment.type';

@Injectable()
export class PaymentsRepository implements IPaymentsRepository {
  constructor(
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<Payment>,
  ) {}

  async createOrder(savePaymentOrderDto: SavePaymentOrderDto): Promise<void> {
    await this.paymentModel.create({
      sessionId: savePaymentOrderDto.sessionId,
      token: savePaymentOrderDto.token,
      amount: savePaymentOrderDto.amount,
      userId: savePaymentOrderDto.userId,
    });
  }

  async findOrderBySessionId(
    sessionId: string,
    dbSession: ClientSession | null = null,
  ): Promise<MongoosePayment> {
    const order = await this.paymentModel
      .findOne({ sessionId })
      .session(dbSession)
      .exec();

    if (!order) throw new NotFoundException('Orden de compra no encontrada');

    return order;
  }

  async confirmOrder(
    sessionId: string,
    confirmOrderReqDto: ConfirmOrderReqDto,
    dbSession: ClientSession | null = null,
  ): Promise<MongoosePayment> {
    const order = await this.paymentModel
      .findOneAndUpdate(
        {
          sessionId,
          token: confirmOrderReqDto.confirmationToken,
        },
        {
          $set: {
            isConfirmed: true,
            confirmedAt: new Date(),
          },
        },
        { new: true },
      )
      .session(dbSession)
      .exec();

    if (!order) throw new NotFoundException('Orden de compra no encontrada');

    return order;
  }
}
