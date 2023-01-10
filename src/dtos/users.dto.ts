import { Role } from '@prisma/client';
import Joi from 'joi';
import { injectable } from 'tsyringe';
import { AbstractValidatedDto } from './abstract.dto';

export interface IUserDto {
  name: string;
  email: string;
}

export interface ICreateUserDto extends IUserDto {
  password: string;
  role?: Role;
}

export const passwordPattern = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/);
export const passwordErrorMessage = new Error(
  'Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length',
);

@injectable()
export class CreateUserDto extends AbstractValidatedDto implements ICreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: Role;

  public getSchema(): Joi.ObjectSchema {
    return Joi.object({
      name: Joi.string().required().max(100),
      email: Joi.string().email().required().max(100),
      role: Joi.string().valid(Role.BUYER, Role.SELLER),
      password: Joi.string().regex(passwordPattern).error(passwordErrorMessage).required().min(8).max(20),
    });
  }
}

@injectable()
export class UpdateUserDto extends AbstractValidatedDto implements IUserDto {
  email: string;
  name: string;

  public getSchema(): Joi.ObjectSchema {
    return Joi.object({
      name: Joi.string().required().max(200),
      email: Joi.string().email().required().max(100),
    });
  }
}
