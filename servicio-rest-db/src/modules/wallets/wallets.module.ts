import { Module } from '@nestjs/common';
import { WalletsService } from './services/wallets.service';
import { WalletsController } from './controllers/wallets.controller';
import { INJECTION_TOKENS } from './constants/injection-tokens.contant';
import { UsersModule } from '../users/users.module';
import { WalletsRepository } from './repositories/wallets.repository';

@Module({
  controllers: [WalletsController],
  imports: [UsersModule],
  providers: [
    {
      provide: INJECTION_TOKENS.WALLETS_SERVICE,
      useClass: WalletsService,
    },
    {
      provide: INJECTION_TOKENS.WALLETS_REPOSITORY,
      useClass: WalletsRepository,
    },
  ],
})
export class WalletsModule {}
