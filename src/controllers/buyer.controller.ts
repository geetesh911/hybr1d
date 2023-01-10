import { NextFunction, Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { BuyerService } from '@/services/buyer.service';
import { IUser } from '@/interfaces/users.interface';
import { Catalog, Order } from '@prisma/client';
import { ISellerIdParam } from '@/interfaces/common.interface';
import { ICreateOrderDto } from '@/dtos/buyer.dto';

@injectable()
export class BuyerController {
  constructor(private readonly buyerService: BuyerService) {}

  public getSellersList = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const sellers: IUser[] = await this.buyerService.getSellersList();
      res.status(200).json({ data: sellers });
    } catch (error) {
      next(error);
    }
  };

  public getSellerCatalog = async (req: Request<ISellerIdParam>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const sellerId: string = req.params.sellerId;
      const catalog: Catalog = await this.buyerService.getSellerCatalog(sellerId);
      res.status(200).json({ data: catalog });
    } catch (error) {
      next(error);
    }
  };

  public createOrder = async (req: Request<ISellerIdParam, null, ICreateOrderDto>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const sellerId: string = req.params.sellerId;
      const buyerId: string = req.user.id;
      const { productIds } = req.body;
      const order: Order = await this.buyerService.createOrder(sellerId, buyerId, productIds);
      res.status(200).json({ data: order });
    } catch (error) {
      next(error);
    }
  };
}
