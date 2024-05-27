import { Inject, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import type { EntityManager, DataSource } from 'typeorm';
import { UserError } from './exceptions/user.error';
import { UserErrorsEnum } from './exceptions/user-errors.enum';
import type { IUserEntity } from './interfaces/user.entity.interface';
import type { IUserService } from './interfaces/user.service.interface';
import type { IUserRepository } from './interfaces/user.repository.interface';
import { USER_REPOSITORY_TOKEN } from './user.constants';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  private checkEmailIsExists(email: IUserEntity['email']): Promise<boolean> {
    return this.userRepository.existsByEmail(email);
  }

  public async create(
    name: string,
    password: string,
    email: string,
  ): Promise<IUserEntity> {
    const emailIsExists = await this.checkEmailIsExists(email);

    if (emailIsExists) throw new UserError(UserErrorsEnum.EmailAlreadyUsed);

    return this.userRepository.createUser(name, email, password);
  }

  public async getById(id: number): Promise<IUserEntity> {
    const user = await this.userRepository.findOneByUserId(id);

    if (!user) throw new UserError(UserErrorsEnum.UserNotFound);

    return user;
  }
}
