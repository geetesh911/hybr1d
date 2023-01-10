import { NextFunction, Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { SellerService } from '@/services/seller.service';
import { Catalog } from '@prisma/client';
import { ISellerIdParam } from '@/interfaces/common.interface';
import { ICreateCatalogDto } from '@/dtos/seller.dto';

@injectable()
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  public getSellerOrders = async (req: Request<ISellerIdParam, null, ICreateCatalogDto>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const sellerId: string = req.user.id;

      const orders = await this.sellerService.getSellerOrders(sellerId);

      res.status(200).json({ data: orders });
    } catch (error) {
      next(error);
    }
  };

  public createCatalog = async (req: Request<ISellerIdParam, null, ICreateCatalogDto>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const sellerId: string = req.user.id;
      const createCatalogInput = req.body;
      const catalog: Catalog = await this.sellerService.createCatalog(sellerId, createCatalogInput);
      res.status(200).json({ data: catalog });
    } catch (error) {
      next(error);
    }
  };
}
