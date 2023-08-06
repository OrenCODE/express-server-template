import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import authMiddleware from '@middlewares/auth.middleware';
import validateSignup from '@utils/validateSignup';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/signup', validateSignup, authController.signUp);

authRouter.post('/login', authController.logIn);

authRouter.post('/logout', authMiddleware, authController.logOut);

export default authRouter;
