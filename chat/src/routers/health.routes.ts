import { Router } from 'express';
import HealthController from '@controllers/health.controller';

const healthRouter = Router();
const healthController = HealthController();

healthRouter.get('/live', healthController.live);

export default healthRouter;
