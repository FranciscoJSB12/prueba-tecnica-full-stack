import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { envConfig } from 'src/config/env-config';
import { ApiResponse } from 'src/core/responses/api-response.dto';
import { RegisterCustomerDto } from 'src/shared/dtos/users/register-customer.dto';
import { RegisteredCustomerDto } from 'src/shared/dtos/users/registered-customer.dto';
import { UserExtRes } from 'src/shared/types/users/users-ext-res.type';
import { IUsersAdapter } from '../interfaces/users-adapter.interface';

@Injectable()
export class UsersAdapter implements IUsersAdapter {
  baseUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = envConfig.restServiceDBBaseUrl();
  }

  registerCustomer(
    registerCustomerDto: RegisterCustomerDto,
  ): Promise<UserExtRes> {
    return firstValueFrom(
      this.httpService
        .post<ApiResponse<RegisteredCustomerDto>>(
          `${this.baseUrl}/registar-cliente`,
          {
            ...registerCustomerDto,
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
    );
  }
}
