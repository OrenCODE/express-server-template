import api from './api';
import config from '@config/config';
import { AxiosError } from 'axios';
import { CreateSubscriptionDTO } from '@dtos/subscription.dto';

const SubscriptionClient = () => {
  const URL = config.PAYMENTS_CLIENT_URL;
  const SubscriptionClientError = (e: AxiosError): AxiosError => {
    throw new AxiosError(e.message, 'payments', e.config, e.request, e.response);
  };

  const createSubscriptionPayment = async (newData: CreateSubscriptionDTO, cookie: string) => {
    const url = `${URL}payments`;
    try {
      const { data } = await api.post(url, newData, { cookie });
      return data;
    } catch (e) {
      return SubscriptionClientError(e);
    }
  };

  return { createSubscriptionPayment };
};

export default SubscriptionClient;
