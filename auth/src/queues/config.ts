import { ConnectionOptions } from 'bullmq';
import config from '@config/config';

export const connection: ConnectionOptions = {
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
};
