import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/modules/users/entities/user.entity';

@Schema()
export class Payment extends Document {
  @Prop({
    unique: true,
    index: true,
    required: true,
  })
  sessionId: string;

  @Prop({
    unique: true,
    index: true,
    required: true,
  })
  token: string;

  @Prop({ required: true, default: () => new Date(Date.now() + 5 * 60 * 1000) }) // 5 minutos para que expire
  tokenExpirationDate: Date;

  @Prop({ required: true, default: false })
  isConfirmed: boolean;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  isTokenExpired(): boolean {
    return this.tokenExpirationDate < new Date();
  }
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
