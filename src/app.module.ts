import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';
import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';
import type { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { DatabaseLoggerConfig } from '../environments/database-logger.config';
import { DatabaseSnakeNamingStrategy } from '../environments/database-snake-naming.strategy';
/**
 * Monitoring
 */
import { HealthcheckController } from './healthchek/healthcheck.controller';
/**
 * User section
 */
import { UserController } from './user/user.controller';
import {
  USER_SERVICE_TOKEN,
  USER_REPOSITORY_TOKEN,
  USER_TASK_QUEUE_TOKEN,
} from './user/user.constants';
import { UserService } from './user/user.service';
import { UserEntity } from './user/entities/user.entity';
import { UserRepository } from './user/repositories/user.respository';
import { UserTaskConsumer } from './user/tuser-task.consumer';

const providers: Provider[] = [
  {
    provide: USER_SERVICE_TOKEN,
    useClass: UserService,
  },
  {
    provide: USER_REPOSITORY_TOKEN,
    useClass: UserRepository,
  },
  UserTaskConsumer,
];

const entities: EntityClassOrSchema[] = [UserEntity];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',

      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,

      namingStrategy: new DatabaseSnakeNamingStrategy(),
      logging: process.env.NODE_ENV == 'development' ? true : false,
      logger:
        process.env.NODE_ENV == 'development'
          ? new DatabaseLoggerConfig()
          : undefined,

      /** We are using migrations, synchronize should be set to false. */
      synchronize: false,

      autoLoadEntities: true,

      /**
       * Run migrations automatically
       * you can disable this if you prefer running migration manually.
       */
      migrationsRun: false,
    }),
    TypeOrmModule.forFeature([...entities]),
    /**
     * Queues
     */
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerQueue({
      name: USER_TASK_QUEUE_TOKEN,
      defaultJobOptions: {
        attempts: 2,
      },
    }),
    /**
     * Cache
     */
    CacheModule.register<RedisClientOptions>({
      /**
       * @see https://github.com/dabroek/node-cache-manager-redis-store/issues/40
       */
      // @ts-ignore
      store: async () =>
        await redisStore({
          socket: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
          },
        }),
      ttl: 60 * 30, // 30 min
    }),
    /**
     * Requests
     */
    HttpModule.register({
      proxy: {
        host: '*********',
        port: 1111,
        auth: {
          username: '*****',
          password: '****',
        },
      },
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [HealthcheckController, UserController],
  providers: [...providers],
})
export class AppModule {}
