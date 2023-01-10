import { injectable } from 'tsyringe';
import { User, Role } from '@prisma/client';
import { PrismaService } from '@/services/prisma.service';
import { BaseRepository } from './base.repository';
import { ICreateUserDto, IUserDto } from '@/dtos/users.dto';
import { IUser } from '@/interfaces/users.interface';

@injectable()
export class UsersRepository extends BaseRepository {
  constructor(private readonly prismaService: PrismaService) {
    super('users');
  }

  public async getUserFromEmail(email: string): Promise<IUser> {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    return user && this.exclude(user, 'password');
  }

  public async getUserFromId(userId: string): Promise<IUser> {
    const user = await this.prismaService.user.findUnique({ where: { id: userId } });
    return user && this.exclude(user, 'password');
  }

  public async getUserFromEmailWithPassword(email: string): Promise<User> {
    const user: User = await this.prismaService.user.findUnique({ where: { email } });
    return user;
  }

  public async getSellers(): Promise<IUser[]> {
    const sellers: User[] = await this.prismaService.user.findMany({ where: { role: Role.SELLER } });
    return sellers.map(seller => this.exclude(seller, 'password'));
  }

  public async createUser(createUserInput: ICreateUserDto): Promise<IUser> {
    const { name, email, password } = createUserInput;

    const user = await this.prismaService.user.create({
      data: {
        name,
        email,
        password,
        role: createUserInput.role || Role.BUYER,
      },
    });

    return user && this.exclude(user, 'password');
  }

  public async updateUser(userId: string, updateUserInput: IUserDto): Promise<IUser> {
    const { name, email } = updateUserInput;

    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: { name, email },
    });

    return user && this.exclude(user, 'password');
  }

  public async deleteUser(userId: string): Promise<IUser> {
    const user = await this.prismaService.user.delete({ where: { id: userId } });

    return user && this.exclude(user, 'password');
  }

  public exclude<User, Key extends keyof User>(user: User, ...keys: Key[]): Omit<User, Key> {
    keys.forEach(key => delete user[key]);
    return user;
  }
}
