import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { injectable } from 'tsyringe';
import { User } from '@prisma/client';
import { SECRET_KEY } from '@/config';
import { CreateUserDto } from '@/dtos/users.dto';
import { LoginUserDto } from '@/dtos/auth.dto';
import { HttpException } from '@/exceptions/HttpException';
import { IAuthResponse, IDataStoredInToken, ITokenData } from '@/interfaces/auth.interface';
import { UsersRepository } from '@/repositories/user.repository';
import { IUser } from '@/interfaces/users.interface';
import { UserService } from './users.service';

@injectable()
export class AuthService {
  constructor(private readonly userRepository: UsersRepository, private readonly userService: UserService) {}

  public async register(userData: CreateUserDto): Promise<IAuthResponse> {
    const user: IUser = await this.userService.createUser(userData);

    const tokenData: ITokenData = this.createToken(user);
    const cookie: string = this.createCookie(tokenData);

    return { cookie, user, token: tokenData.token };
  }

  public async login(userData: LoginUserDto): Promise<IAuthResponse> {
    const user: User = await this.userRepository.getUserFromEmailWithPassword(userData.email);
    if (!user) throw new HttpException(409, `Invalid Credentials`);
    if (!user.active) throw new HttpException(409, `This user is disabled`);

    const isPasswordMatching: boolean = await compare(userData.password, user.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Invalid Credentials');

    const tokenData: ITokenData = this.createToken(user);
    const cookie: string = this.createCookie(tokenData);

    return { cookie, user: this.userRepository.exclude(user, 'password'), token: tokenData.token };
  }

  public async logout(userData: IDataStoredInToken): Promise<IUser> {
    const user: IUser = await this.userService.findUser(userData.id);
    if (!user) throw new HttpException(409, "User doesn't exist");

    return user;
  }

  public createToken(user: User | IUser): ITokenData {
    const dataStoredInToken: IDataStoredInToken = {
      email: user.email,
      role: user.role,
      id: user.id,
    };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = +process.env.EXPIRES_IN;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: ITokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}
