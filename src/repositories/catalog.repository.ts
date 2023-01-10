import { injectable } from 'tsyringe';
import { PrismaService } from '@/services/prisma.service';
import { BaseRepository } from './base.repository';
import { Catalog } from '@prisma/client';

@injectable()
export class CatalogRepository extends BaseRepository {
  constructor(private readonly prismaService: PrismaService) {
    super('catalog');
  }

  public async getSellerCatalog(sellerId: string): Promise<Catalog> {
    const catalog: Catalog = await this.prismaService.catalog.findUnique({ where: { userId: sellerId } });

    return catalog;
  }
}
