import { NextFunction, Request, Response } from 'express';
import UsersService from '@/services/users.service';
import { User } from '@prisma/client';

class UsersController {
  public usersService = new UsersService();

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users: User[] = await this.usersService.getUsers();
      res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const user: User | null = await this.usersService.getUserById(id);
      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const userUpdate: User = req.body;
      const updatedUser: User = await this.usersService.updateUser(id, userUpdate);
      res.status(200).json({ user: updatedUser });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const deletedUser: User = await this.usersService.deleteUser(id);
      res.status(200).json({ user: deletedUser });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
