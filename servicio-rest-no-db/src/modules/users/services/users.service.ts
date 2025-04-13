import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constants';
import { ApiResponse } from 'src/core/responses/api-response.dto';
import { IUsersAdapter } from 'src/modules/external/interfaces/users-adapter.interface';
import { RegisterCustomerDto } from 'src/shared/dtos/users/register-customer.dto';
import { RegisteredCustomerDto } from 'src/shared/dtos/users/registered-customer.dto';
import { IUsersService } from '../interfaces/users-service.interface';
import { CheckAxiosError } from 'src/common/utils/check-axios-error.util';

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
      const axiosErr = CheckAxiosError(err);

      if (!axiosErr || axiosErr.statusCode !== 409)
        throw new InternalServerErrorException(err.message);

      throw new ConflictException(axiosErr.message);
    }
  }
}
