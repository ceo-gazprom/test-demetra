import {
  Body,
  Controller,
  Get,
  Query,
  Inject,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserIdDto } from './dtos/user-id.dto';
import { UserDto } from './dtos/user.dto';
import { UserExceptionsFilter } from './exceptions/user.exceptions.filter';
import { USER_SERVICE_TOKEN } from './user.constants';
import type { IUserService } from './interfaces/user.service.interface';

@ApiTags('Users')
@Controller({
  path: 'user',
  version: '1',
})
@UseFilters(UserExceptionsFilter)
export class UserController {
  constructor(
    @Inject(USER_SERVICE_TOKEN) private readonly userService: IUserService,
  ) {}

  @Get('get-user-by-id')
  public async getById(@Query() userIdDto: UserIdDto): Promise<UserDto> {
    const { id } = userIdDto;

    console.log(id);
    const user = await this.userService.getById(id);
    return new UserDto(user);
  }

  @Post('create')
  public async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const { name, email, password } = createUserDto;

    const createdUser = await this.userService.create(name, email, password);

    return new UserDto(createdUser);
  }
}
