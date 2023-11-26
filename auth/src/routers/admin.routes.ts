import { Router } from 'express';
import { Queue as QueueMQ } from 'bullmq';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { connection } from '@queues/config';

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

// Create the Bull Queue instance
const exampleQueue = new QueueMQ('exampleQueue', { connection });

// Create a Worker for the Queue
// new Worker('exampleQueue', async job => emailProcess(job), { connection });

createBullBoard({
  queues: [new BullMQAdapter(exampleQueue)],
  serverAdapter,
});

const adminRouter = Router();

adminRouter.get('/admin', (req, res) => {
  res.send('Admin Page');
});

// Bull Queue dashboard route
adminRouter.use('/admin/queues', serverAdapter.getRouter());

export default adminRouter;
