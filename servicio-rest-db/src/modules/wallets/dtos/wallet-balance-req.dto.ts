import { MinLength } from 'class-validator';

export class WalletBalanceReqDto {
  @MinLength(1, { message: 'document query param is required' })
  document: string;

  @MinLength(1, { message: 'cellphone query param is required' })
  cellphone: string;
}
