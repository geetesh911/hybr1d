import { NextFunction, Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { UpdateUserDto } from '@/dtos/users.dto';
import { UserService } from '@/services/users.service';
import { AuthService } from '@/services/auth.service';
import { IUser } from '@/interfaces/users.interface';

@injectable()
export class UsersController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  public getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.id;
      const user: IUser = await this.userService.findUser(userId);

      res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.id;
      const userData: UpdateUserDto = req.body;
      const updatedUserData: IUser = await this.userService.updateUser(userId, userData);
      const token = this.authService.createToken(updatedUserData);
      const cookie = this.authService.createCookie(token);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: updatedUserData });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.id;
      const deleteUserData: IUser = await this.userService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData });
    } catch (error) {
      next(error);
    }
  };
}
