import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { handleAxiosError } from '../utils/handle-axios-error.util';

export function handleErrorStatusCode(err: any) {
  const axiosErr = handleAxiosError(err);

  if (axiosErr) {
    switch (axiosErr.statusCode) {
      case 400:
        return new BadRequestException(axiosErr.message);

      case 403:
        return new ForbiddenException(axiosErr.message);

      case 404:
        return new NotFoundException(axiosErr.message);

      case 409:
        return new ConflictException(axiosErr.message);
    }
  }

  return new InternalServerErrorException(
    axiosErr ? axiosErr.message : err.message,
  );
}
