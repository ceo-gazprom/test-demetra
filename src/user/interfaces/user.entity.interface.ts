import type { IAbstractEntity } from '../../core/interfaces/abstract.entity.interface';

export interface IUserEntity extends IAbstractEntity {
  name: string;
  password: string;
  email: string;
  status: boolean;
}
