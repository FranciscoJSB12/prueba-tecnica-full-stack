import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { User, UserSchema } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';
import { INJECTION_TOKENS } from './constants/injection-tokens.constant';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: INJECTION_TOKENS.USERS_SERVICE,
      useClass: UsersService,
    },
    {
      provide: INJECTION_TOKENS.USERS_REPOSITORY,
      useClass: UsersRepository,
    },
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
})
export class UsersModule {}
