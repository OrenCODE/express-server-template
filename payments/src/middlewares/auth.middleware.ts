import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { TokenError } from '@exceptions/TokenError';
import { DataStoredInToken, RequestWithUser, User } from '@interfaces/auth.interface';
import config from '@config/config';
import AuthClient from '@clients/authClient';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || extractAuthorizationHeader(req);
    if (Authorization) {
      const headers = { cookie: `Authorization=${Authorization}` };
      const authClient = AuthClient(headers);

      const userId = verifyTokenAndGetUserId(Authorization);
      const user = await fetchUserDetails(authClient, userId);

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

const verifyTokenAndGetUserId = (token: string) => {
  const verificationResponse = verify(token, config.SECRET_KEY) as DataStoredInToken;
  return verificationResponse.id;
};

const fetchUserDetails = async (authClient, userId: string) => {
  return authClient.findUserById(userId);
};

const attachUserToRequest = (req: RequestWithUser, user: User) => {
  req.user = user;
};

export default authMiddleware;
