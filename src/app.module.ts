import { Module } from '@nestjs/common';
import type { Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import type { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { DatabaseLoggerConfig } from '../environments/database-logger.config';
import { DatabaseSnakeNamingStrategy } from '../environments/database-snake-naming.strategy';
/**
 * User section
 */
import { UserController } from './user/user.controller';
import {
  USER_SERVICE_TOKEN,
  USER_REPOSITORY_TOKEN,
} from './user/user.constants';
import { UserService } from './user/user.service';
import { UserEntity } from './user/entities/user.entity';
import { UserRepository } from './user/repositories/user.respository';

const providers: Provider[] = [
  {
    provide: USER_SERVICE_TOKEN,
    useClass: UserService,
  },
  {
    provide: USER_REPOSITORY_TOKEN,
    useClass: UserRepository,
  },
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
  ],
  controllers: [UserController],
  providers: [...providers],
})
export class AppModule {}
