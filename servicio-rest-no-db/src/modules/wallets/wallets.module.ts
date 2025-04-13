import { Module } from '@nestjs/common';
import { WalletsService } from './services/wallets.service';
import { WalletsController } from './controllers/wallets.controller';
import { ExternalModule } from '../external/external.module';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constants';

@Module({
  controllers: [WalletsController],
  providers: [
    {
      provide: INJECTION_TOKENS.WALLETS_SERVICE,
      useClass: WalletsService,
    },
  ],
  imports: [ExternalModule],
})
export class WalletsModule {}
