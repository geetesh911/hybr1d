import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { Role } from '@prisma/client';
import { SECRET_KEY } from '@/config';
import { HttpException } from '@/exceptions/HttpException';
import { IDataStoredInToken } from '@/interfaces/auth.interface';

export const authMiddleware = <P, ResBody = any, ReqBody = any, ReqQuery = object>(role?: Role) => {
  return async (req: Request<P, ResBody, ReqBody, ReqQuery>, _res: Response, next: NextFunction) => {
    try {
      const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

      if (!Authorization) {
        next(new HttpException(404, 'Authentication token missing'));
        return;
      }
      const secretKey: string = SECRET_KEY;
      console.log(Authorization, secretKey);
      const user = (await verify(Authorization, secretKey)) as IDataStoredInToken;

      console.log(user);
      if (!user || (role && role !== user.role)) {
        next(new HttpException(401, 'Invalid authentication token'));
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      next(new HttpException(401, 'Invalid authentication token'));
    }
  };
};
