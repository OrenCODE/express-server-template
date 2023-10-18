import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import authMiddleware from '@middlewares/auth.middleware';

const authRouter = Router();
const authController = AuthController();

authRouter.post('/auth/signup', authController.signUp);

authRouter.post('/auth/login', authController.logIn);

authRouter.post('/auth/logout', authMiddleware, authController.logOut);

export default authRouter;
