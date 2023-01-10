import { injectable } from 'tsyringe';
import { Catalog, Order, Role } from '@prisma/client';
import { UsersRepository } from '@/repositories/user.repository';
import { CatalogRepository } from '@/repositories/catalog.repository';
import { IUser } from '@/interfaces/users.interface';
import { HttpException } from '@/exceptions/HttpException';
import { ICreateCatalogDto } from '@/dtos/seller.dto';
import { OrderRepository } from '@/repositories/order.repository';

@injectable()
export class SellerService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly catalogRepository: CatalogRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  public async getSellerOrders(sellerId: string): Promise<Order[]> {
    const orders: Order[] = await this.orderRepository.getSellerOrders(sellerId);

    return orders;
  }
  public async createCatalog(sellerId: string, createCatalogInput: ICreateCatalogDto): Promise<Catalog> {
    const user: IUser = await this.userRepository.getUserFromId(sellerId);

    if (!user) throw new HttpException(409, "User doesn't exist");
    if (user.role === Role.BUYER) throw new HttpException(403, 'User Forbidden');

    const sellerCatalog: Catalog = await this.catalogRepository.getSellerCatalog(sellerId);

    if (sellerCatalog) throw new HttpException(409, 'Catalog already created');

    const catalog: Catalog = await this.catalogRepository.createCatalog(sellerId, createCatalogInput);

    return catalog;
  }
}
