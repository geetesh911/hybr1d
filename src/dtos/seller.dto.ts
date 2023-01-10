import Joi from 'joi';
import { injectable } from 'tsyringe';
import { AbstractValidatedDto } from './abstract.dto';

export interface ICreateCatalogDto {
  productIds: string[];
}

@injectable()
export class CreateCatalogDto extends AbstractValidatedDto implements ICreateCatalogDto {
  productIds: string[];

  public getSchema(): Joi.ObjectSchema {
    return Joi.object({
      productIds: Joi.array().items(Joi.string()),
    });
  }
}
