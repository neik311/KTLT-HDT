import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { CommentCreateDto } from '.'

/** Interface cập nhật  */
export class CommentUpdateDto extends CommentCreateDto {
  @ApiProperty({ description: 'Id' })
  @IsString()
  @IsNotEmpty()
  id: string
}
