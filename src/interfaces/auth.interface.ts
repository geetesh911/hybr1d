import { Request } from 'express';
import { IUser } from './users.interface';

export interface IDataStoredInToken {
  id: string;
  email: string;
  role: string;
}

export interface ITokenData {
  token: string;
  expiresIn: number;
}

export interface IRequestWithUser extends Request {
  user: IDataStoredInToken;
}

export interface IAuthResponse {
  token: string;
  cookie: string;
  user: IUser;
}
