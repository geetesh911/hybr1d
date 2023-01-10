import { injectable } from 'tsyringe';
import { Catalog } from '@prisma/client';
import { PrismaService } from '@/services/prisma.service';
import { ICreateCatalogDto } from '@/dtos/seller.dto';
import { BaseRepository } from './base.repository';

@injectable()
export class CatalogRepository extends BaseRepository {
  constructor(private readonly prismaService: PrismaService) {
    super('catalog');
  }

  public async getSellerCatalog(sellerId: string): Promise<Catalog> {
    const catalog: Catalog = await this.prismaService.catalog.findUnique({ where: { sellerId }, include: { products: true } });

    return catalog;
  }

  public async createCatalog(sellerId: string, createCatalogInput: ICreateCatalogDto): Promise<Catalog> {
    const { productIds } = createCatalogInput;
    const catalog: Catalog = await this.prismaService.catalog.create({
      data: {
        seller: { connect: { id: sellerId } },
        products: { connect: productIds.map(id => ({ id })) },
      },
    });

    return catalog;
  }
}
