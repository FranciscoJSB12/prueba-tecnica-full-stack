import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../responses/api-response.dto';

@Catch(HttpException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    if (
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse
    ) {
      const messages = exceptionResponse.message;

      // Return just the first error message
      const firstMessage = Array.isArray(messages) ? messages[0] : messages;

      response.status(status).json({
        ...ApiResponse.error(firstMessage),
      });
    } else {
      response.status(status).json(exceptionResponse);
    }
  }
}
