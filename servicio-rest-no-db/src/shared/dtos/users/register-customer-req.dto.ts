import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterCustomerReqDto {
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
  @IsEmail({}, { message: 'Formato de correo no correcto' })
  readonly email: string;
}
