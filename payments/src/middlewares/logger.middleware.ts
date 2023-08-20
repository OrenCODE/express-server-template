import config from '@config/config';
import logger from '@utils/logger';
import { NextFunction, Request, Response } from 'express';

const development = config.NODE_ENV === 'development';
const isDEV = development;

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (development) logger.info(`${req.method} ${req.url}`);
  next();
};
const logError = (reason: string) => {
  if (development) logger.error(reason);
};

export { loggerMiddleware, logError, isDEV };
