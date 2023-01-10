import Joi from 'joi';
import { injectable } from 'tsyringe';
import { AbstractValidatedDto } from './abstract.dto';

export interface ICreateOrderDto {
  productIds: string[];
}

@injectable()
export class CreateOrderDto extends AbstractValidatedDto implements ICreateOrderDto {
  productIds: string[];

  public getSchema(): Joi.ObjectSchema {
    return Joi.object({
      productIds: Joi.array().items(Joi.string()),
    });
  }
}
