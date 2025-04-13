import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { UsersModule } from './modules/users/users.module';
import { WalletsModule } from './modules/wallets/wallets.module';
import { envConfig } from './config/env-config';
import { ExternalModule } from './modules/external/external.module';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(envConfig.databaseUri()),
    MailerModule.forRoot({
      transport: {
        host: envConfig.emailHost(),
        auth: {
          user: envConfig.gmailAddress(),
          pass: envConfig.gmailAppPassword(),
        },
      },
    }),
    UsersModule,
    WalletsModule,
    ExternalModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
