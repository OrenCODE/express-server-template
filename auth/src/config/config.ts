import * as dotenv from 'dotenv';
import * as process from 'process';
import { cleanEnv, port, str, num } from 'envalid';

const path = __dirname + `/../../.env.${process.env.NODE_ENV}`;

dotenv.config({ path });

export default cleanEnv(process.env, {
  NODE_ENV: str({ default: 'development' }),
  PORT: port({ default: 3000 }),
  DATABASE_URL: str(),
  SECRET_KEY: str(),
  TOKEN_EXPIRY: num({ default: 10800 }),
});
