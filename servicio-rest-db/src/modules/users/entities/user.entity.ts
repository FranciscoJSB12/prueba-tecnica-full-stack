import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Wallet } from 'src/modules/wallets/entities/wallet.entity';
import { Payment } from 'src/modules/payments/entities/payment.entity';

@Schema()
export class User extends Document {
  @Prop({
    unique: true,
    index: true,
    required: true,
  })
  document: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, index: true, unique: true })
  cellphone: string;

  @Prop({ require: true, unique: true })
  email: string;

  @Prop({ type: Wallet, required: true })
  wallet: Wallet;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'PurchaseOrder' }] })
  PaymentOrders: Payment[];
}

export const UserSchema = SchemaFactory.createForClass(User);
