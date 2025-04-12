import { Inject, Injectable } from '@nestjs/common';
import { UserMapper } from '../mappers/user.mapper';
import { RegisterCustomerDto } from '../dtos/register-customer.dto';
import { IUsersService } from '../interfaces/users-service.interface';
import { IUsersRepository } from '../interfaces/users-repository.interface';
import { INJECTION_TOKENS } from '../constants/injection-tokens.constant';
import { User } from '../entities/user.entity';
import { RegisteredCustomerDto } from '../dtos/registered-customer.dto';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(INJECTION_TOKENS.USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async registerCustomer(
    registerCustomerDto: RegisterCustomerDto,
  ): Promise<RegisteredCustomerDto> {
    const userModel: User =
      await this.usersRepository.createUser(registerCustomerDto);

    const userDto = UserMapper.toRegisteredDto(userModel);

    return userDto;
  }
}
