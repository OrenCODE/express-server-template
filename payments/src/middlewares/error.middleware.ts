import { NextFunction, Request, Response } from 'express';
import { ZodError as ValidationError } from 'zod';
import { AxiosError as ClientError } from 'axios';
import { ErrorCodes } from '@utils/errorCodes';
import { isDEV, logError } from '@middlewares/logger.middleware';
import { AppError, CustomError, DatabaseError, TokenError } from '@interfaces/error.interface';

const errorMiddleware = (error: AppError, req: Request, res: Response, next: NextFunction) => {
  try {
    if (error instanceof TokenError) {
      const { message, status } = error;
      logError(message);
      return res.status(status).json({ message, status });
    }

    const { message, stack } = error;
    const statusCode = res.statusCode ? res.statusCode : 500;

    if (error instanceof ValidationError) {
      const validationErrors = error.errors;
      const errorObject = {};

      validationErrors.forEach(issue => {
        const field = issue.path.join('.');
        errorObject[field] = issue.message;
      });
      logError(stack);
      return res.status(400).json({ errors: errorObject });
    }

    if (error instanceof ClientError) {
      const { code, config, request, response } = error;
      const clientError = {
        client: code,
        reason: isDEV ? response?.data?.message ?? 'unknown' : `${code} client issue`,
        message: message || ErrorCodes.InternalServerError,
        method: request.method,
        url: config.url,
      };
      logError(stack);
      return res.status(statusCode).json({ error: clientError });
    }

    if (error instanceof DatabaseError) {
      logError(stack);
      return res.status(statusCode).json({ message: message || ErrorCodes.InternalServerError });
    }

    if (error instanceof CustomError) {
      const { code } = error;
      logError(stack);
      return res.status(statusCode).json({ error: code });
    }

    logError(stack);
    res.status(statusCode).json({ message: message || ErrorCodes.InternalServerError, stack });
  } catch (error) {
    next(error);
  }
};

export { errorMiddleware };
