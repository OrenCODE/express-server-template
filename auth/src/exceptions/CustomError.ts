import { ErrorCodes } from '@utils/errorCodes';

export class CustomError extends Error {
  public code: ErrorCodes;

  constructor(code: ErrorCodes) {
    super();
    this.code = code;
  }
}
