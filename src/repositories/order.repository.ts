import { injectable } from 'tsyringe';
import { PrismaService } from '@/services/prisma.service';
import { BaseRepository } from './base.repository';
import { Order } from '@prisma/client';

@injectable()
export class OrderRepository extends BaseRepository {
  constructor(private readonly prismaService: PrismaService) {
    super('order');
  }

  public async createOrder(sellerId: string, buyerId: string, productIds: string[]): Promise<Order> {
    const order: Order = await this.prismaService.order.create({
      data: {
        seller: { connect: { id: sellerId } },
        buyer: { connect: { id: buyerId } },
        products: { connect: productIds.map(id => ({ id })) },
      },
    });

    return order;
  }
}
