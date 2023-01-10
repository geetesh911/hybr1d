import { NextFunction, Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { CreateUserDto } from '@/dtos/users.dto';
import { AuthService } from '@/services/auth.service';
import { IDataStoredInToken } from '@/interfaces/auth.interface';
import { IUser } from '@/interfaces/users.interface';

@injectable()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const { cookie, user, token } = await this.authService.register(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(201).json({ data: user, token });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const { cookie, user, token } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: user, token });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: IDataStoredInToken = req.user;
      const logOutUserData: IUser = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData });
    } catch (error) {
      next(error);
    }
  };
}
