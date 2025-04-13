import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsersAdapter } from './adapters/users.adapter';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constants';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: INJECTION_TOKENS.USERS_ADAPTER,
      useClass: UsersAdapter,
    },
  ],
  exports: [
    {
      provide: INJECTION_TOKENS.USERS_ADAPTER,
      useClass: UsersAdapter,
    },
  ],
})
export class ExternalModule {}
