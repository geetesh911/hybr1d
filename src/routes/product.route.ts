import { Router } from 'express';
import { injectable } from 'tsyringe';
import { ProductController } from '@/controllers/product.controller';
import { IRoutes } from '@/interfaces/routes.interface';
import { CreateProductDto } from '@/dtos/product.dto';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { authMiddleware } from '@/middlewares/auth.middleware';

@injectable()
export class ProductRoute implements IRoutes {
  public path = '/product';
  public router = Router();

  constructor(private readonly productController: ProductController, private readonly createProductDto: CreateProductDto) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/create-product/`,
      authMiddleware(),
      validationMiddleware(this.createProductDto),
      this.productController.createProduct,
    );
  }
}
