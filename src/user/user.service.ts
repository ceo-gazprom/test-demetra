import { Inject, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';
import { CACHE_MANAGER, CacheTTL, CacheKey } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { UserError } from './exceptions/user.error';
import { UserErrorsEnum } from './exceptions/user-errors.enum';
import type { IUserEntity } from './interfaces/user.entity.interface';
import type { IUserService } from './interfaces/user.service.interface';
import type { IUserRepository } from './interfaces/user.repository.interface';
import { USER_REPOSITORY_TOKEN, USER_TASK_QUEUE_TOKEN } from './user.constants';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @InjectQueue(USER_TASK_QUEUE_TOKEN) private readonly taskQueue: Queue,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
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

    const user = await this.userRepository.createUser(name, email, password);

    await this.taskQueue.add(
      'test-task',
      {
        id: user.id,
      },
      { delay: 10000 },
    );

    return user;
  }

  public async getById(id: number): Promise<IUserEntity> {
    // If exists returns the user from the cache
    const cachedUser = await this.cacheManager.get(id.toString());
    if (cachedUser) return cachedUser as IUserEntity;
    // Find for a user in the database
    const user = await this.userRepository.findOneByUserId(id);
    // If the user is not found
    if (!user) throw new UserError(UserErrorsEnum.UserNotFound);
    // Write into cahche
    await this.cacheManager.set(id.toString(), user);

    return user;
  }
}
