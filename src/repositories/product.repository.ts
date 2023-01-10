import { injectable } from 'tsyringe';
import { PrismaService } from '@/services/prisma.service';
import { BaseRepository } from './base.repository';
import { Product } from '@prisma/client';
import { ICreateProductDto } from '@/dtos/product.dto';

@injectable()
export class ProductRepository extends BaseRepository {
  constructor(private readonly prismaService: PrismaService) {
    super('product');
  }

  public async createProduct(createProductInput: ICreateProductDto): Promise<Product> {
    const { name, price } = createProductInput;
    const product: Product = await this.prismaService.product.create({
      data: {
        name,
        price,
        catalog: createProductInput.catalogId && {
          connect: { id: createProductInput.catalogId },
        },
      },
    });

    return product;
  }
}
