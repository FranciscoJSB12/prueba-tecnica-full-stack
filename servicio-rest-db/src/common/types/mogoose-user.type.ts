import type { Document } from 'mongoose';
import type { User } from '../../modules/users/entities/user.entity';

export type MongooseUser = Document<unknown, {}, User> &
  User &
  Required<{
    _id: unknown;
  }> & {
    __v: number;
  };
