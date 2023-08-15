import { Request } from 'express';

export interface DataStoredInToken {
  id: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}

export interface RequestWithUser extends Request {
  user: User;
}
