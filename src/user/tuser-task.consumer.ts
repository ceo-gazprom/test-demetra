import { Inject } from '@nestjs/common';
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { USER_TASK_QUEUE_TOKEN, USER_REPOSITORY_TOKEN } from './user.constants';
import type { IUserRepository } from './interfaces/user.repository.interface';
import type { IUserTask } from './interfaces/user-task.interface';

@Processor(USER_TASK_QUEUE_TOKEN)
export class UserTaskConsumer {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  // Update user status after 10 sec
  @Process('test-task')
  public async updateStatus(job: Job<IUserTask>): Promise<any> {
    return this.userRepository.updateStatus(job.data.id);
  }
}
