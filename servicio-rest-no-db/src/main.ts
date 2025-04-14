import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envConfig } from './config/env-config';
import { ValidationPipe } from '@nestjs/common';
import { ValidationFilter } from './core/filters/validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.useGlobalFilters(new ValidationFilter());

  await app.listen(envConfig.port());
}
bootstrap();
