import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { ExternalModule } from '../external/external.module';
import { INJECTION_TOKENS } from 'src/common/constants/injection-tokens.constant';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: INJECTION_TOKENS.USERS_SERVICE,
      useClass: UsersService,
    },
  ],
  imports: [ExternalModule],
})
export class UsersModule {}
