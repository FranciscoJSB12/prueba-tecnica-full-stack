import { Module } from '@nestjs/common';
import { PaymentsService } from './services/payments.service';
import { PaymentsController } from './controllers/payments.controller';
import { ExternalModule } from '../external/external.module';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constant';

@Module({
  controllers: [PaymentsController],
  providers: [
    {
      provide: INJECTION_TOKENS.PAYMENTS_SERVICE,
      useClass: PaymentsService,
    },
  ],
  imports: [ExternalModule],
})
export class PaymentsModule {}
