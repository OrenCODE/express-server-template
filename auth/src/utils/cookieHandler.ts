import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import config from '@config/config';

const createAuthCookie = (user: User) => {
  const tokenData = createToken(user);
  return createCookie(tokenData);
};

const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = { id: user.id };
  const secretKey: string = config.SECRET_KEY;
  const expiresIn: number = config.TOKEN_EXPIRY;

  return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => {
  const path = 'Path=/;';
  const httpOnly = 'HttpOnly;';
  const sameSite = 'SameSite=Lax;';
  const maxAge = `Max-Age=${tokenData.expiresIn};`;
  const authorization = `Authorization=${tokenData.token};`;

  const secured = process.env.NODE_ENV === 'production' ? 'Secure;' : '';

  return `${authorization} ${maxAge} ${path} ${httpOnly} ${sameSite} ${secured}`;
};

const deleteCookie = 'Authorization=; Max-age=0; Path=/;';

export { createAuthCookie, deleteCookie };
