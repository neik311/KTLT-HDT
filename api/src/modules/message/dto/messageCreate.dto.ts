import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class MessageCreateDto {

  @ApiProperty({ description: '' })
  @IsString()
  @IsNotEmpty()
  content: string

  @ApiProperty({ description: '' })
  parentId: string
}
