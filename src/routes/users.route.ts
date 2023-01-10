import { Router } from 'express';
import { injectable } from 'tsyringe';
import { UsersController } from '@/controllers/users.controller';
import { IRoutes } from '@/interfaces/routes.interface';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { UpdateUserDto } from '@/dtos/users.dto';

@injectable()
export class UsersRoute implements IRoutes {
  public path = '/users';
  public router = Router();

  constructor(private readonly updateUserDto: UpdateUserDto, private readonly usersController: UsersController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/user`, authMiddleware(), this.usersController.getUser);
    this.router.put(`${this.path}/user`, authMiddleware(), validationMiddleware(this.updateUserDto), this.usersController.updateUser);
    this.router.delete(`${this.path}/user`, authMiddleware(), this.usersController.deleteUser);
  }
}
