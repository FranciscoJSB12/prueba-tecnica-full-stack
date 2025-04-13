import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IEmailAdapter } from '../interfaces/email-adapter.interface';

@Injectable()
export class EmailAdapter implements IEmailAdapter {
  constructor(private readonly mailService: MailerService) {}

  async sendMail(token: string, email: string) {
    await this.mailService.sendMail({
      from: 'Any Company!',
      to: email,
      subject: `Confirmación compra`,
      text: `Token: ${token} - Expiración 5 min`,
    });
  }
}
