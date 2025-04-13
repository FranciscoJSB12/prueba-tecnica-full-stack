import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsersAdapter } from './adapters/users.adapter';
import { WalletsAdapter } from './adapters/wallets.adapter';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constant';
import { PaymentsAdapter } from './adapters/payments.adapter';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: INJECTION_TOKENS.USERS_ADAPTER,
      useClass: UsersAdapter,
    },
    {
      provide: INJECTION_TOKENS.WALLETS_ADAPTER,
      useClass: WalletsAdapter,
    },
    {
      provide: INJECTION_TOKENS.PAYMENTS_ADAPTER,
      useClass: PaymentsAdapter,
    },
  ],
  exports: [
    {
      provide: INJECTION_TOKENS.USERS_ADAPTER,
      useClass: UsersAdapter,
    },
    {
      provide: INJECTION_TOKENS.WALLETS_ADAPTER,
      useClass: WalletsAdapter,
    },
    {
      provide: INJECTION_TOKENS.PAYMENTS_ADAPTER,
      useClass: PaymentsAdapter,
    },
  ],
})
export class ExternalModule {}
