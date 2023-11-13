import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class WalletChapterCreateDto {
  @ApiProperty({ description: '' })
  @IsString()
  @IsNotEmpty()
  chapterId: string
}
