import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IUsersService } from '../interfaces/users-service.interface';
import { RegisterCustomerReqDto } from 'src/shared/dtos/users/register-customer-req.dto';
import { handleExceptionType } from 'src/common/helpers/handle-exception-type.helper';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constant';

@Controller()
export class UsersController {
  constructor(
    @Inject(INJECTION_TOKENS.USERS_SERVICE)
    private readonly usersService: IUsersService,
  ) {}

  @Post('registar-cliente')
  async registerCustomer(@Body() registerCustomerDto: RegisterCustomerReqDto) {
    try {
      const result =
        await this.usersService.registerCustomer(registerCustomerDto);

      return result;
    } catch (err) {
      const exception = handleExceptionType(err);

      throw exception;
    }
  }
}
