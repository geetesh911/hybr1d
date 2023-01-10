import { hash } from 'bcrypt';
import { injectable } from 'tsyringe';
import { CreateUserDto, UpdateUserDto } from '@/dtos/users.dto';
import { HttpException } from '@/exceptions/HttpException';
import { UsersRepository } from '@/repositories/user.repository';
import { IUser } from '@/interfaces/users.interface';

@injectable()
export class UserService {
  constructor(private readonly userRepository: UsersRepository) {}

  public async findUser(userId: string): Promise<IUser> {
    const user: IUser = await this.userRepository.getUserFromId(userId);
    if (!user) throw new HttpException(409, "User doesn't exist");
    if (!user.active) throw new HttpException(409, `This user is disabled`);

    return user;
  }

  public async createUser(userData: CreateUserDto): Promise<IUser> {
    const user: IUser = await this.userRepository.getUserFromEmail(userData?.email);
    if (user) throw new HttpException(409, `This email already exists`);

    const hashedPassword: string = await hash(userData.password, 10);

    return this.userRepository.createUser({ ...userData, password: hashedPassword });
  }

  public async updateUser(userId: string, userData: UpdateUserDto): Promise<IUser> {
    const user: IUser = await this.userRepository.getUserFromId(userId);
    if (!user) throw new HttpException(409, "User doesn't exist");
    if (!user.active) throw new HttpException(409, `This user is disabled`);

    return this.userRepository.updateUser(userId, userData);
  }

  public async deleteUser(userId: string): Promise<IUser> {
    const user: IUser = await this.userRepository.getUserFromId(userId);
    if (!user) throw new HttpException(409, "User doesn't exist");

    return this.userRepository.deleteUser(userId);
  }
}
