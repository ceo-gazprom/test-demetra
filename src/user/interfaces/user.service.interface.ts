import type { IUser } from './user.interface';
import type { IUserEntity } from './user.entity.interface';

export interface IUserService {
  create(
    name: IUser['name'],
    password: IUser['password'],
    email: IUser['email'],
  ): Promise<IUserEntity>;

  getById(id: number): Promise<IUserEntity>;
}
