import { Request, Response } from 'express';
import { HttpException } from '@/exceptions/HttpException';
import { AbstractValidatedDto } from '@/dtos/abstract.dto';

export const validationMiddleware = <P, ResBody = any, ReqBody = any, ReqQuery = object>(type: AbstractValidatedDto) => {
  return (req: Request<P, ResBody, ReqBody, ReqQuery>, _res: Response, next) => {
    const schema = type?.getSchema();
    if (!schema) throw new Error('Schema not provided');

    const validationResult = schema.validate(req?.body || {});

    if (validationResult.error) {
      const message = validationResult.error.message;

      next(new HttpException(400, message));
      return;
    }
    next();
  };
};
