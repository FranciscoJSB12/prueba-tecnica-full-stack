import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { envConfig } from 'src/config/env-config';
import { ApiResponse } from 'src/core/responses/api-response.dto';
import { RegisterCustomerReqDto } from 'src/shared/dtos/users/register-customer-req.dto';
import { RegisterCustomerResDto } from 'src/shared/dtos/users/register-customer-res.dto';
import { RegisterUserAxiosRes } from 'src/shared/types/users/register-user-axios-res.type';
import { IUsersAdapter } from '../interfaces/users-adapter.interface';

@Injectable()
export class UsersAdapter implements IUsersAdapter {
  baseUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = envConfig.restServiceDBBaseUrl();
  }

  registerCustomer(
    registerCustomerDto: RegisterCustomerReqDto,
  ): Promise<RegisterUserAxiosRes> {
    return firstValueFrom(
      this.httpService
        .post<ApiResponse<RegisterCustomerResDto>>(
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
