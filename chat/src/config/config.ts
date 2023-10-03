import * as dotenv from 'dotenv';
import * as process from 'process';
import { cleanEnv, port, str } from 'envalid';

const path = __dirname + `/../../.env.${process.env.NODE_ENV}`;

dotenv.config({ path });

export default cleanEnv(process.env, {
  NODE_ENV: str({ default: 'development' }),
  PORT: port({ default: 8000 }),
});
