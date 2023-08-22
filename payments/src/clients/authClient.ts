import api from './api';
import config from '@config/config';
import { AxiosError } from 'axios';

const AuthClient = () => {
  const URL = config.AUTH_CLIENT_URL;
  const AuthClientError = (e: AxiosError): AxiosError => {
    throw new AxiosError(e.message, 'auth', e.config, e.request, e.response);
  };

  const findUserById = async (userId: string, idToken: string) => {
    const url = `${URL}users/${userId}`;
    const headers = { cookie: `Authorization=${idToken}` };
    try {
      return await api.get(url, headers);
    } catch (e) {
      return AuthClientError(e);
    }
  };

  return { findUserById };
};

export default AuthClient;
