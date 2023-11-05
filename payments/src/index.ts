import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { loggerMiddleware } from '@middlewares/logger.middleware';
import { errorMiddleware } from '@middlewares/error.middleware';

import config from '@config/config';
import logger from '@utils/logger';
import paymentsRouter from '@routers/payments.router';
import swaggerDocumentation from '@documentation/swagger';

const port = config.PORT;
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(loggerMiddleware);
app.use(paymentsRouter);
app.use(swaggerDocumentation);
app.use(errorMiddleware);

app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});
