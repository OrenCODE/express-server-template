import express from 'express';
import helmet from 'helmet';
import http from 'http';

import { errorMiddleware } from '@middlewares/error.middleware';
import { loggerMiddleware } from '@middlewares/logger.middleware';

import config from '@config/config';
import logger from '@utils/logger';

import initializeSocketIO from './sockets/socket';
import configureCors from './utils/cors.util';

const port = config.PORT;
const app = express();
const httpServer = http.createServer(app);

app.use(helmet());
configureCors(app);

app.use(express.json());

app.use(loggerMiddleware);
app.use(errorMiddleware);

initializeSocketIO(httpServer);

httpServer.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});
