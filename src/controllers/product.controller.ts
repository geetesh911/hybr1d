import { NextFunction, Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { Product } from '@prisma/client';
import { ProductService } from '@/services/product.service';
import { ICreateProductDto } from '@/dtos/product.dto';

@injectable()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  public createProduct = async (req: Request<null, null, ICreateProductDto>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const createProductInput = req.body;
      const product: Product = await this.productService.createProduct(createProductInput);

      res.status(200).json({ product });
    } catch (error) {
      next(error);
    }
  };
}
