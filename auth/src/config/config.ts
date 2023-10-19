import * as dotenv from 'dotenv';
import * as process from 'process';
import { cleanEnv, port, str, num } from 'envalid';

const path = __dirname + `/../../.env.${process.env.NODE_ENV}`;

dotenv.config({ path });

export default cleanEnv(process.env, {
  NODE_ENV: str({ default: 'development' }),
  PORT: port({ default: 3000 }),
  DOMAIN: str({ default: 'http://localhost:3000' }),
  DATABASE_URL: str(),
  SECRET_KEY: str(),
  TOKEN_EXPIRY: num({ default: 10800 }),
  PAYMENTS_CLIENT_URL: str(),
  SUBSCRIPTION_PRICE: num({ default: 100 }),
  REDIS_HOST: str({ default: '127.0.0.1' }),
  REDIS_PORT: num({ default: 6379 }),
});
