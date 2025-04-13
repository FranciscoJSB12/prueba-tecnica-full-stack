import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getUserByDocument(document: string) {
    const userEntity = await this.userModel.findOne({ document }).exec();

    if (!userEntity) throw new NotFoundException('Cuenta no econtrada');

    return userEntity;
  }

  async createUser(user: RegisterCustomerDto) {
    const userEntity = new this.userModel({ ...user, wallet: {} });

    return userEntity.save();
  }
}
