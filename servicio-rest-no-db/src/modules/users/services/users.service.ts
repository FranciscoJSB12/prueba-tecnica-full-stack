import { Inject, Injectable } from '@nestjs/common';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constant';
import { ApiResponse } from 'src/core/responses/api-response.dto';
import { IUsersAdapter } from 'src/modules/external/interfaces/users-adapter.interface';
import { RegisterCustomerReqDto } from 'src/shared/dtos/users/register-customer-req.dto';
import { RegisterCustomerResDto } from 'src/shared/dtos/users/register-customer-res.dto';
import { IUsersService } from '../interfaces/users-service.interface';
import { handleErrorStatusCode } from 'src/common/helpers/handle-error-status-code.helper';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(INJECTION_TOKENS.USERS_ADAPTER)
    private readonly usersAdapter: IUsersAdapter,
  ) {}

  async registerCustomer(
    registerCustomerDto: RegisterCustomerReqDto,
  ): Promise<ApiResponse<RegisterCustomerResDto>> {
    try {
      const { data } =
        await this.usersAdapter.registerCustomer(registerCustomerDto);

      return data;
    } catch (err) {
      const exception = handleErrorStatusCode(err);

      throw exception;
    }
  }
}
