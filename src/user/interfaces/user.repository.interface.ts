import type { UpdateResult } from 'typeorm';
import type { IUserEntity } from './user.entity.interface';

export interface IUserRepository {
  createUser(
    name: IUserEntity['name'],
    email: IUserEntity['email'],
    password: IUserEntity['password'],
  ): Promise<IUserEntity>;
  existsByEmail(email: IUserEntity['email']): Promise<boolean>;
  findOneByUserId(id: IUserEntity['id']): Promise<IUserEntity>;
  findOneByEmail(email: IUserEntity['email']): Promise<IUserEntity>;
  updateStatus(id: IUserEntity['id']): Promise<UpdateResult>;
}
