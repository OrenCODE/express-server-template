import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import authMiddleware from '@middlewares/auth.middleware';
import hasPermission from '@utils/hasPermission';

const usersRouter = Router();
const usersController = UsersController();

const viewUsersPermission = 'view_users';

usersRouter.get('/users', authMiddleware, hasPermission(viewUsersPermission), usersController.getUsers);

usersRouter.get('/users/:id', authMiddleware, usersController.getUserById);

usersRouter.put('/users/:id', authMiddleware, usersController.updateUser);

usersRouter.delete('/users/:id', authMiddleware, usersController.deleteUser);

export default usersRouter;
