import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import authMiddleware from '@middlewares/auth.middleware';

const usersRouter = Router();
const usersController = UsersController();

usersRouter.get('/users', authMiddleware, usersController.getUsers);

usersRouter.get('/users/:id', authMiddleware, usersController.getUserById);

usersRouter.put('/users/:id', authMiddleware, usersController.updateUser);

usersRouter.delete('/users/:id', authMiddleware, usersController.deleteUser);

export default usersRouter;
