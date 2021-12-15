import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  public catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response.status(400).json({
      message: {
        statusCode: 400,
        error: 'Query Failed',
        message: exception.message,
      },
    });
  }
}
