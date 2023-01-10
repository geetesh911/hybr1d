import { Router } from 'express';
import { injectable } from 'tsyringe';
import { AuthController } from '@/controllers/auth.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { CreateUserDto } from '@/dtos/users.dto';
import { LoginUserDto } from '@/dtos/auth.dto';
import { IRoutes } from '@/interfaces/routes.interface';

@injectable()
export class AuthRoute implements IRoutes {
  public path = '/auth';
  public router = Router();

  constructor(
    private readonly createUserDto: CreateUserDto,
    private readonly loginUserDto: LoginUserDto,
    private readonly authController: AuthController,
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, validationMiddleware(this.createUserDto), this.authController.register);
    this.router.post(`${this.path}/login`, validationMiddleware(this.loginUserDto), this.authController.logIn);
    this.router.post(`${this.path}/logout`, authMiddleware(), this.authController.logOut);
  }
}
