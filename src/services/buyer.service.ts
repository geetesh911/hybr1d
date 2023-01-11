import { injectable } from 'tsyringe';
import { Catalog, Order } from '@prisma/client';
import { UsersRepository } from '@/repositories/user.repository';
import { CatalogRepository } from '@/repositories/catalog.repository';
import { IUser } from '@/interfaces/users.interface';
import { OrderRepository } from '@/repositories/order.repository';

@injectable()
export class BuyerService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly catalogRepository: CatalogRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  public async getSellersList(): Promise<IUser[]> {
    const sellers: IUser[] = await this.userRepository.getSellers();

    return sellers;
  }

  public async getSellerCatalog(sellerId: string): Promise<Catalog> {
    const catalog: Catalog = await this.catalogRepository.getSellerCatalog(sellerId);

    return catalog;
  }

  public async createOrder(sellerId: string, buyerId: string, productIds: string[]): Promise<Order> {
    const order: Order = await this.orderRepository.createOrder(sellerId, buyerId, productIds);

    return order;
  }
}
