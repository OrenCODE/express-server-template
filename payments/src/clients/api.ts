import axios, { AxiosRequestConfig } from 'axios';

type APIMethods = {
  post: (url, data) => Promise<any>;
  get: (url, headers?: {}) => Promise<any>;
  delete: (url) => Promise<any>;
  put: (url, data) => Promise<any>;
};

function createAuthClient(customHeaders: Record<string, string> = {}): APIMethods {
  const defaultConfig: AxiosRequestConfig = {
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
  };

  defaultConfig.headers = { ...defaultConfig.headers, ...customHeaders };

  const instance = axios.create(defaultConfig);

  return {
    get: async (url, headers = {}) => {
      try {
        const response = await instance.get(url, { headers });
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    post: async (url, data) => {
      try {
        const response = await instance.post(url, data);
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    put: async (url, data) => {
      try {
        const response = await instance.put(url, data);
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    delete: async url => {
      try {
        const response = await instance.delete(url);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  };
}

export { createAuthClient };
