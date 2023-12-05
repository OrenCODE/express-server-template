import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { TokenError } from '@exceptions/TokenError';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import config from '@config/config';
import userDAO from '@repository/user.dao';
import { User } from '@prisma/client';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || extractAuthorizationHeader(req);

    if (Authorization) {
      const userId = await verifyTokenAndGetUserId(Authorization);
      const user = await fetchUserById(userId);

      if (user) {
        attachUserToRequest(req, user);
        next();
      } else {
        next(new TokenError(401, 'Wrong authentication token'));
      }
    } else {
      next(new TokenError(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(error);
  }
};

const extractAuthorizationHeader = (req: RequestWithUser) => {
  const header = req.header('Authorization');
  return header ? header.split('Bearer ')[1] : null;
};

const verifyTokenAndGetUserId = async (token: string) => {
  const verificationResponse = verify(token, config.SECRET_KEY) as DataStoredInToken;
  return verificationResponse.id;
};

const fetchUserById = async (userId: string) => {
  return userDAO.getUserById(userId);
};

const attachUserToRequest = (req: RequestWithUser, user: User) => {
  req.user = user;
};

export default authMiddleware;
