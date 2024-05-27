import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../core/abstract.entity';
import { DatabaseTables, DatabaseSchemas } from '../../core/database.constants';
import type { IUserEntity } from '../interfaces/user.entity.interface';

@Entity({
  name: DatabaseTables.USERS,
  schema: DatabaseSchemas.PUBLIC,
})
export class UserEntity extends AbstractEntity implements IUserEntity {
  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  public name: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  public password: string;

  @Column({
    type: 'varchar',
    length: 128,
    unique: true,
  })
  public email: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  public status: boolean;
}
