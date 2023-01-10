import Joi from 'joi';

export abstract class AbstractValidatedDto {
  public abstract getSchema(): Joi.ObjectSchema;
}
