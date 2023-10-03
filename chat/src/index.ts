import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { errorMiddleware } from '@middlewares/error.middleware';
import { loggerMiddleware } from '@middlewares/logger.middleware';

import config from '@config/config';
import logger from '@utils/logger';

const port = config.PORT;
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(loggerMiddleware);
app.use(errorMiddleware);

app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});
