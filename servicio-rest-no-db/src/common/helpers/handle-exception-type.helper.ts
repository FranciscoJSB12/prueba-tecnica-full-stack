import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ApiResponse } from 'src/core/responses/api-response.dto';

export function handleExceptionType(err: any) {
  if (err instanceof NotFoundException)
    return new NotFoundException(ApiResponse.error(err.message));

  if (err instanceof BadRequestException)
    return new BadRequestException(ApiResponse.error(err.message));

  if (err instanceof ForbiddenException)
    return new ForbiddenException(ApiResponse.error(err.message));

  if (err instanceof ConflictException)
    return new ConflictException(ApiResponse.error(err.message));

  return new InternalServerErrorException(err.message);
}
