import { Module } from '@nestjs/common';
import { PaymentsService } from './services/payments.service';
import { PaymentsController } from './controllers/payments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './entities/payment.entity';
import { PaymentsRepository } from './repositories/payment.repository';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constant';
import { UsersModule } from '../users/users.module';
import { ExternalModule } from '../external/external.module';
import { WalletsModule } from '../wallets/wallets.module';

@Module({
  controllers: [PaymentsController],
  providers: [
    {
      provide: INJECTION_TOKENS.PAYMENTS_SERVICE,
      useClass: PaymentsService,
    },
    {
      provide: INJECTION_TOKENS.PAYMENTS_REPOSITORY,
      useClass: PaymentsRepository,
    },
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: Payment.name,
        schema: PaymentSchema,
      },
    ]),
    UsersModule,
    WalletsModule,
    ExternalModule,
  ],
})
export class PaymentsModule {}
