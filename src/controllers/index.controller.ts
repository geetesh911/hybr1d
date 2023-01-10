import { NextFunction, Request, Response } from 'express';
import { injectable } from 'tsyringe';

@injectable()
export class IndexController {
  public index = (_req: Request, res: Response, next: NextFunction): void => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}
