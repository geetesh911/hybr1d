import { Router } from 'express';
import { injectable } from 'tsyringe';
import { BuyerController } from '@/controllers/buyer.controller';
import { IRoutes } from '@/interfaces/routes.interface';
import { ISellerIdParam } from '@/interfaces/common.interface';
import { CreateOrderDto } from '@/dtos/buyer.dto';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { authMiddleware } from '@/middlewares/auth.middleware';

@injectable()
export class BuyerRoute implements IRoutes {
  public path = '/buyer';
  public router = Router();

  constructor(private readonly buyerController: BuyerController, private readonly createOrderDto: CreateOrderDto) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/list-of-sellers`, this.buyerController.getSellersList);
    this.router.get<ISellerIdParam>(`${this.path}/seller-catalog/:sellerId`, this.buyerController.getSellerCatalog);
    this.router.post<ISellerIdParam>(
      `${this.path}/create-order/:sellerId`,
      authMiddleware(),
      validationMiddleware(this.createOrderDto),
      this.buyerController.createOrder,
    );
  }
}
