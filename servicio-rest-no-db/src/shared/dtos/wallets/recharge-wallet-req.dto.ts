import {
  IsNumber,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class RechargeWalletReqDto {
  @IsNumber()
  @Min(1)
  @IsPositive()
  readonly amount: number;

  @IsString()
  @MinLength(1)
  readonly document: string;

  @IsString()
  @MinLength(1)
  readonly cellphone: string;
}
