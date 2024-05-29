import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import type { UpdateResult } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import type { IUserEntity } from '../interfaces/user.entity.interface';
import type { IUserRepository } from '../interfaces/user.repository.interface';

@Injectable()
export class UserRepository
  extends Repository<UserEntity>
  implements IUserRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  public async createUser(
    name: IUserEntity['name'],
    email: IUserEntity['email'],
    password: IUserEntity['password'],
  ): Promise<IUserEntity> {
    const newUserEntity = this.create({ name, email, password });
    return this.save(newUserEntity);
  }

  public async existsByEmail(email: IUserEntity['email']): Promise<boolean> {
    const qb = this.createQueryBuilder();

    return qb
      .select('id')
      .where('email = :email', { email })
      .limit(1)
      .getRawOne()
      .then((result) => (result ? true : false));
  }

  public async findOneByUserId(id: IUserEntity['id']): Promise<UserEntity> {
    return this.findOneBy({ id });
  }

  public async findOneByEmail(
    email: IUserEntity['email'],
  ): Promise<IUserEntity> {
    return this.findOneBy({ email });
  }

  public async updateStatus(id: IUserEntity['id']): Promise<UpdateResult> {
    return this.update(
      {
        id,
      },
      { status: true },
    );
  }
}
