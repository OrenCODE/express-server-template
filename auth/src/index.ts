import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import usersRouter from '@/routers/users.routes';
import authRouter from '@/routers/auth.routes';
import logger from '@utils/logger';
import { errorMiddleware } from '@middlewares/error.middleware';
import { loggerMiddleware } from '@middlewares/logger.middleware';
import config from '@config/config';

const port = config.PORT;
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(loggerMiddleware);
app.use(usersRouter);
app.use(authRouter);
app.use(errorMiddleware);

app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});
