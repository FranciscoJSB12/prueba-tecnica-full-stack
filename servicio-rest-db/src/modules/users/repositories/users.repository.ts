import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { IUsersRepository } from '../interfaces/users-repository.interface';
import { RegisterCustomerDto } from '../dtos/register-customer.dto';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async createUser(user: RegisterCustomerDto): Promise<User> {
    const userEntity = new this.userModel(user);

    return userEntity.save();
  }
}
