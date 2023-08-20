import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';
import { CreateUserDto, CreateUserSchema, UserDto, UserSchema } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { CreateSubscriptionDto } from '@dtos/subscription.dto';
import AuthService from '@services/auth.service';
import SubscriptionService from '@services/subscription.service';

class AuthController {
  public authService = new AuthService();
  public subscriptionService = new SubscriptionService();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const validatedUser = CreateUserSchema.parse(userData);
      const { cookie, newUser } = await this.authService.signup(validatedUser);

      const payment: CreateSubscriptionDto = await this.subscriptionService.createSubscriptionPayment(newUser, cookie);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(201).json({ data: newUser, subscription: payment, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: UserDto = req.body;
      const validatedUser = UserSchema.parse(userData);
      const { cookie, findUser } = await this.authService.login(validatedUser);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: UserDto = req.user;
      const validatedUser = UserSchema.parse(userData);
      const logOutUserData: User = await this.authService.logout(validatedUser);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
