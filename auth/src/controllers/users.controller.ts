import { NextFunction, Request, Response } from 'express';
import UsersService from '@/services/users.service';
import { User } from '@prisma/client';

const UsersController = () => {
  const usersService = UsersService();

  const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users: User[] = await usersService.getUsers();
      res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  };

  const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const user: User | null = await usersService.getUserById(id);
      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  };

  const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const userUpdate: User = req.body;
      const updatedUser: User = await usersService.updateUser(id, userUpdate);
      res.status(200).json({ user: updatedUser });
    } catch (error) {
      next(error);
    }
  };

  const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const deletedUser: User = await usersService.deleteUser(id);
      res.status(200).json({ user: deletedUser });
    } catch (error) {
      next(error);
    }
  };

  return { getUsers, getUserById, updateUser, deleteUser };
};

export default UsersController;
