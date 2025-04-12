import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Wallet extends Document {
  @Prop({ default: 0, min: 0 })
  balance: number;

  @Prop({ required: true, default: 'USD' })
  currency: string;

  @Prop()
  lastTransactionAt?: Date;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;
}
