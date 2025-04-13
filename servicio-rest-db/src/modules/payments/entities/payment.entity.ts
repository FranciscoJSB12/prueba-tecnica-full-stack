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

  @Prop({
    required: true,
    default: Date.now,
  })
  tokenCreatedAt: Date;

  @Prop({ required: true, default: () => new Date(Date.now() + 5 * 60 * 1000) }) // 5 minutos para que expire
  tokenExpirationDate: Date;

  @Prop({ required: true, default: false })
  isConfirmed: boolean;

  @Prop()
  confirmedAt: Date;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
