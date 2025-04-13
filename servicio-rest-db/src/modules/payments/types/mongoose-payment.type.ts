import { Document } from 'mongoose';
import { Payment } from '../entities/payment.entity';

export type MongoosePayment = Document<unknown, {}, Payment> &
  Payment &
  Required<{
    _id: unknown;
  }> & {
    __v: number;
  };
