import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { envConfig } from './config/env-config';
import { WalletsModule } from './modules/wallets/wallets.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(envConfig.databaseUri()),
    UsersModule,
    WalletsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
