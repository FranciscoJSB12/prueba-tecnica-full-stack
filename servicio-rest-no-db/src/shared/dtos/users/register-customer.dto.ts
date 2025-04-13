import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterCustomerDto {
  @IsString()
  @MinLength(1)
  readonly document: string;

  @IsString()
  @MinLength(1)
  readonly firstName: string;

  @IsString()
  @MinLength(1)
  readonly lastName: string;

  @IsString()
  @MinLength(1)
  readonly cellphone: string;

  @IsString()
  @IsEmail()
  readonly email: string;
}
