import axios from 'axios';
import config from '@config/config';

const baseURL = config.PAYMENTS_CLIENT_URL;

const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

const Api = {
  get: async (url, headers = {}) => {
    try {
      const response = await apiClient.get(url, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  post: async (url, data, headers = {}) => {
    try {
      const response = await apiClient.post(url, data, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  put: async (url, data) => {
    try {
      const response = await apiClient.put(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async url => {
    try {
      const response = await apiClient.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default Api;
