import {
  Body,
  ConflictException,
  Controller,
  Inject,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { IUsersService } from '../interfaces/users-service.interface';
import { RegisterCustomerDto } from 'src/shared/dtos/users/register-customer.dto';
import { ApiResponse } from 'src/core/responses/api-response.dto';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constants';

@Controller()
export class UsersController {
  constructor(
    @Inject(INJECTION_TOKENS.USERS_SERVICE)
    private readonly usersService: IUsersService,
  ) {}

  @Post('registar-cliente')
  async registerCustomer(@Body() registerCustomerDto: RegisterCustomerDto) {
    try {
      const resp =
        await this.usersService.registerCustomer(registerCustomerDto);

      return resp;
    } catch (err) {
      if (err instanceof ConflictException) {
        throw new ConflictException(ApiResponse.error(err.message));
      }

      throw new InternalServerErrorException(
        ApiResponse.error(`Error: ${err.message}`),
      );
    }
  }
}
