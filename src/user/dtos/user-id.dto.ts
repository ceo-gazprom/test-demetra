import { IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TrimTransform } from '../../core/transformers/trim.transformer';

export class UserIdDto {
  @IsNotEmpty()
  @TrimTransform()
  @ApiPropertyOptional({
    example: '1',
    description: 'User id',
  })
  public id: number;
}
