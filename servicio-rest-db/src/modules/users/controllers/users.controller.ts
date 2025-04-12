import {
  Body,
  ConflictException,
  Controller,
  Inject,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { RegisterCustomerDto } from '../dtos/register-customer.dto';
import { INJECTION_TOKENS } from '../constants/injection-tokens.constant';
import { IUsersService } from '../interfaces/users-service.interface';
import { RegisteredCustomerDto } from '../dtos/registered-customer.dto';
import { ApiResponse } from 'src/core/responses/api-response.dto';

@Controller()
export class UsersController {
  constructor(
    @Inject(INJECTION_TOKENS.USERS_SERVICE)
    private readonly usersService: IUsersService,
  ) {}

  @Post('registar-cliente')
  async registerCustomer(@Body() registerCustomerDto: RegisterCustomerDto) {
    try {
      const respDto: RegisteredCustomerDto =
        await this.usersService.registerCustomer(registerCustomerDto);

      return ApiResponse.success<RegisteredCustomerDto>(
        respDto,
        'User registered successfully',
      );
    } catch (err) {
      if (err.errorResponse?.code === 11000) {
        throw new ConflictException(
          ApiResponse.error(`Error: Duplicated Element`),
        );
      }

      throw new InternalServerErrorException(
        ApiResponse.error(`Error: ${err.message}`),
      );
    }
  }
}
