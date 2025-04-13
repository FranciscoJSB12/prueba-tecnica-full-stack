import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExternalModule } from './modules/external/external.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ExternalModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
