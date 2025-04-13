import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constants';
import { ApiResponse } from 'src/core/responses/api-response.dto';
import { IUsersAdapter } from 'src/modules/external/interfaces/users-adapter.interface';
import { RegisterCustomerDto } from 'src/shared/dtos/users/register-customer.dto';
import { RegisteredCustomerDto } from 'src/shared/dtos/users/registered-customer.dto';
import { IUsersService } from '../interfaces/users-service.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(INJECTION_TOKENS.USERS_ADAPTER)
    private readonly usersAdapter: IUsersAdapter,
  ) {}

  async registerCustomer(
    registerCustomerDto: RegisterCustomerDto,
  ): Promise<ApiResponse<RegisteredCustomerDto>> {
    try {
      const { data } =
        await this.usersAdapter.registerCustomer(registerCustomerDto);

      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const statusCode = err.status;
        const message = err.response?.data?.message;

        if (statusCode === 409) throw new ConflictException(message);
      }

      throw new InternalServerErrorException(err.message);
    }
  }
}
