import api from './api';
import config from '@config/config';

function createAuthClient() {
  const URL = config.AUTH_CLIENT_URL;

  const findUserById = async (userId: string, idToken: string) => {
    const url = `${URL}users/${userId}`;
    const headers = { cookie: `Authorization=${idToken}` };
    try {
      return await api.get(url, headers);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const postData = async newData => {
    try {
      const response = await api.post('/api/data', newData);
      console.log('Response:', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  return {
    findUserById,
    postData,
  };
}

const AuthClient = createAuthClient();

export default AuthClient;
