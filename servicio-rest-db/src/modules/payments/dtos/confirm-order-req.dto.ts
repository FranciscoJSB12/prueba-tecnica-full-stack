import { MinLength } from 'class-validator';

export class ConfirmOrderReqDto {
  @MinLength(6)
  confirmationToken: string;
}
