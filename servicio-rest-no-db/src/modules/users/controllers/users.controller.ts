import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IUsersService } from '../interfaces/users-service.interface';
import { RegisterCustomerReqDto } from 'src/shared/dtos/users/register-customer-req.dto';
import { runOrCatchError } from 'src/common/helpers/run-or-catch-error.helper';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constant';

@Controller()
export class UsersController {
  constructor(
    @Inject(INJECTION_TOKENS.USERS_SERVICE)
    private readonly usersService: IUsersService,
  ) {}

  @Post('registar-cliente')
  async registerCustomer(@Body() registerCustomerDto: RegisterCustomerReqDto) {
    return runOrCatchError(async () => {
      const result =
        await this.usersService.registerCustomer(registerCustomerDto);

      return result;
    });
  }
}
