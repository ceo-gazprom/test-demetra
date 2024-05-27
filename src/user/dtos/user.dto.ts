import { ApiProperty } from '@nestjs/swagger';
import type { IUser } from '../interfaces/user.interface';

export class UserDto {
  @ApiProperty()
  public id: IUser['id'];

  @ApiProperty()
  public name: IUser['name'];

  @ApiProperty()
  public email: IUser['email'];

  @ApiProperty()
  public status: IUser['status'];

  constructor(user: IUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.status = user.status;
  }
}
