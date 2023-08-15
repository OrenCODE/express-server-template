import api from './index';

function createAuthClient() {
  const fetchData = async () => {
    try {
      const data = await api.get('/api/data');
      console.log('Data:', data);
      return data;
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
    fetchData,
    postData,
  };
}

const authClient = createAuthClient();

export default authClient;
