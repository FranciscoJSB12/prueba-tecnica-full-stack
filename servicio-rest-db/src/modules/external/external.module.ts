import { Module } from '@nestjs/common';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constant';
import { EmailAdapter } from './adapters/email.adapter';

@Module({
  providers: [
    {
      provide: INJECTION_TOKENS.EMAIL_ADAPTER,
      useClass: EmailAdapter,
    },
  ],
  exports: [
    {
      provide: INJECTION_TOKENS.EMAIL_ADAPTER,
      useClass: EmailAdapter,
    },
  ],
})
export class ExternalModule {}
