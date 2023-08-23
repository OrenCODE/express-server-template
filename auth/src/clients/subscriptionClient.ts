import api from './api';
import config from '@config/config';
import { AxiosError } from 'axios';
import { CreateSubscriptionDTO } from '@dtos/subscription.dto';

const SubscriptionClient = () => {
  const URL = config.PAYMENTS_CLIENT_URL;
  const SubscriptionClientError = (e: AxiosError): AxiosError => {
    throw new AxiosError(e.message, 'payments', e.config, e.request, e.response);
  };

  const createSubscriptionPayment = async (data: CreateSubscriptionDTO, cookie: string) => {
    const url = `${URL}payments`;
    try {
      return await api.post(url, data, { cookie });
    } catch (e) {
      return SubscriptionClientError(e);
    }
  };

  return { createSubscriptionPayment };
};

export default SubscriptionClient;
