import { CustomError } from '@exceptions/CustomError';
import { DatabaseError } from '@exceptions/DatabaseError';
import { TokenError } from '@exceptions/TokenError';

type AppError = CustomError | DatabaseError | TokenError | Error;

export { CustomError, DatabaseError, TokenError, AppError };
