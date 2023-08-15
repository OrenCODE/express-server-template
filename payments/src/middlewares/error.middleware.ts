import { NextFunction, Request, Response } from 'express';
import { ZodError as ValidationError } from 'zod';
import { ErrorCodes } from '@utils/errorCodes';
import { logError } from '@middlewares/logger.middleware';
import { AppError, CustomError, DatabaseError } from '@interfaces/error.interface';

const errorMiddleware = (error: AppError, req: Request, res: Response, next: NextFunction) => {
  try {
    const { message, stack } = error;
    const statusCode = res.statusCode ? res.statusCode : 500;

    if (error instanceof ValidationError) {
      const validationErrors = error.errors;
      const errors = validationErrors.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      logError(stack);
      return res.status(400).json({ errors });
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
