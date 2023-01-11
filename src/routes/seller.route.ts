import { Router } from 'express';
import { injectable } from 'tsyringe';
import { SellerController } from '@/controllers/seller.controller';
import { IRoutes } from '@/interfaces/routes.interface';
import { CreateCatalogDto } from '@/dtos/seller.dto';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { Role } from '@prisma/client';

@injectable()
export class SellerRoute implements IRoutes {
  public path = '/seller';
  public router = Router();

  constructor(private readonly sellerController: SellerController, private readonly createCatalogDto: CreateCatalogDto) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/orders/`, authMiddleware(), this.sellerController.getSellerOrders);
    this.router.post(
      `${this.path}/create-catalog/`,
      authMiddleware(Role.SELLER),
      validationMiddleware(this.createCatalogDto),
      this.sellerController.createCatalog,
    );
  }
}
