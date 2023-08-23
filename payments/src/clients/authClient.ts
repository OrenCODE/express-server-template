import { createAuthClient } from './api';
import config from '@config/config';
import { AxiosError } from 'axios';
import { User } from '@interfaces/auth.interface';

const AuthClient = headers => {
  const api = createAuthClient(headers);
  const URL = config.AUTH_CLIENT_URL;

  const findUserById = async (userId: string): Promise<User | null> => {
    const url = `${URL}users/${userId}`;
    try {
      const { user } = await api.get(url);
      return user;
    } catch (e) {
      AuthClientError(e);
    }
  };

  return { findUserById };
};

const AuthClientError = (e: AxiosError): AxiosError => {
  throw new AxiosError(e.message, 'auth', e.config, e.request, e.response);
};

export default AuthClient;
