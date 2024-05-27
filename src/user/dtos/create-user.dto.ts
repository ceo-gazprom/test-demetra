import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { ToLowerCaseTransform } from '../../core/transformers/to-lower-case.transformer';
import { TrimTransform } from '../../core/transformers/trim.transformer';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  @Matches(/[a-zA-Z0-9_]/)
  @TrimTransform()
  @ToLowerCaseTransform()
  @ApiProperty({
    example: 'Jhon',
    description: 'User display name.',
  })
  public name: string;

  @IsEmail()
  @MinLength(6)
  @MaxLength(120)
  @TrimTransform()
  @ToLowerCaseTransform()
  @ApiProperty({
    example: 'satoshinakamoto@gmail.com',
    description: '',
  })
  public email: string;

  @MinLength(6)
  @MaxLength(120)
  @TrimTransform()
  @ApiProperty({
    example: '123456abcd',
    description: 'User password.',
  })
  public password: string;
}
