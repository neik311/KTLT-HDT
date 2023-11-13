import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { MessageCreateDto } from '.'

/** Interface cập nhật  */
export class MessageUpdateDto extends MessageCreateDto {
  @ApiProperty({ description: 'Id' })
  @IsString()
  @IsNotEmpty()
  id: string
}
