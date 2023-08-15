import { Router } from 'express';
import PaymentsController from '@controllers/payments.controller';
import authMiddleware from '@middlewares/auth.middleware';

const paymentsRouter = Router();
const paymentsController = new PaymentsController();

paymentsRouter.post('/payments', authMiddleware, paymentsController.createPaymentForUser);

paymentsRouter.get('/payments', authMiddleware, paymentsController.getAllPayments);

paymentsRouter.get('/payments/user', authMiddleware, paymentsController.getAllPaymentsForUser);

paymentsRouter.get('/payments/:id', authMiddleware, paymentsController.getPaymentById);

paymentsRouter.delete('/payments/:id', authMiddleware, paymentsController.deletePaymentById);

export default paymentsRouter;
