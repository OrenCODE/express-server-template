import { Router } from 'express';
import { Queue } from 'bullmq';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { connection } from '@/queue/config';

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

// Create the Bull Queue instance
const exampleQueue = new Queue('exampleQueue', { connection });

// Create a Worker for the Queue
// new Worker('exampleQueue', async job => emailProcess(job), { connection });

createBullBoard({
  queues: [new BullAdapter(exampleQueue)],
  serverAdapter,
});

const adminRouter = Router();

adminRouter.get('/admin', (req, res) => {
  res.send('Admin Page');
});

// Bull Queue dashboard route
adminRouter.use('/admin/queues', serverAdapter.getRouter());

export default adminRouter;
