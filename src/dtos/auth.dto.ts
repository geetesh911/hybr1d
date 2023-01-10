import Joi from 'joi';
import { injectable } from 'tsyringe';
import { AbstractValidatedDto } from './abstract.dto';
import { passwordErrorMessage, passwordPattern } from './users.dto';

export interface ILoginUserDto {
  email: string;
  password: string;
}

@injectable()
export class LoginUserDto extends AbstractValidatedDto implements ILoginUserDto {
  email: string;
  password: string;

  public getSchema(): Joi.ObjectSchema {
    return Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().regex(passwordPattern).error(passwordErrorMessage).required().min(8).max(20),
    });
  }
}
