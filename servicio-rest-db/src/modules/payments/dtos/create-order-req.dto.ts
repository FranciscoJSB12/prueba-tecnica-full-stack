import { IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreateOrderReqDto {
  @IsString()
  @MinLength(1)
  readonly document: string;

  @Min(1)
  @IsPositive()
  readonly amount: number;
}
