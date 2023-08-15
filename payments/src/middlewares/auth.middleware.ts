import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { TokenError } from '@exceptions/TokenError';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import config from '@config/config';
import prisma from '@config/prisma';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
    if (Authorization) {
      const verificationResponse = (await verify(Authorization, config.SECRET_KEY)) as DataStoredInToken;
      const userId = verificationResponse.id;

      const findUser = await prisma.user.findUnique({ where: { id: userId } });

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new TokenError(401, 'Wrong authentication token'));
      }
    } else {
      next(new TokenError(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new TokenError(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
