import Joi from 'joi';
import { injectable } from 'tsyringe';
import { AbstractValidatedDto } from './abstract.dto';

export interface ICreateProductDto {
  name: string;
  price: number;
  catalogId?: string;
}

@injectable()
export class CreateProductDto extends AbstractValidatedDto implements ICreateProductDto {
  name: string;
  price: number;
  catalogId?: string;

  public getSchema(): Joi.ObjectSchema {
    return Joi.object({
      name: Joi.string().required().max(200),
      price: Joi.number().min(0),
      catalogId: Joi.string().max(200),
    });
  }
}
