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
import { ResponseDto, MessagesEnum } from '../core/dtos/response.dto';
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
  public async getById(
    @Query() userIdDto: UserIdDto,
  ): Promise<ResponseDto<UserDto>> {
    const { id } = userIdDto;

    const user = await this.userService.getById(id);

    return new ResponseDto(200, MessagesEnum.ok, new UserDto(user), 'user');
  }

  @Post('create')
  public async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const { name, email, password } = createUserDto;

    const createdUser = await this.userService.create(name, password, email);

    return new UserDto(createdUser);
  }
}
