import { injectable } from 'tsyringe';
import { Product } from '@prisma/client';
import { ProductRepository } from '@/repositories/product.repository';
import { ICreateProductDto } from '@/dtos/product.dto';

@injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  public async createProduct(createProductInput: ICreateProductDto): Promise<Product> {
    const product: Product = await this.productRepository.createProduct(createProductInput);

    return product;
  }
}
