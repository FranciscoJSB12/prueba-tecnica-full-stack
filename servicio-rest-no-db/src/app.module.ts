import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExternalModule } from './modules/external/external.module';
import { UsersModule } from './modules/users/users.module';
import { WalletsModule } from './modules/wallets/wallets.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ExternalModule,
    UsersModule,
    WalletsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
