import type { IUserEntity } from './user.entity.interface';

export interface IUser {
  id: IUserEntity['id'];
  name: IUserEntity['name'];
  password: IUserEntity['password'];
  email: IUserEntity['email'];
  status: IUserEntity['status'];
}
