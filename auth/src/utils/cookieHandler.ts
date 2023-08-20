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
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

export { createAuthCookie };
