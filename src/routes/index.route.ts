import { Router } from 'express';
import { injectable } from 'tsyringe';
import { IndexController } from '@/controllers/index.controller';
import { IRoutes } from '@/interfaces/routes.interface';

@injectable()
export class IndexRoute implements IRoutes {
  public path = '/';
  public router = Router();

  constructor(private readonly indexController: IndexController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
  }
}
