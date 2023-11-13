import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

/** Interface tạo chapter */
export class ChapterCreateDto {
  @ApiProperty({ description: '' })
  @IsNotEmpty()
  chapterNumber: number

  @ApiProperty({ description: '' })
  name: string

  @ApiProperty({ description: 'Tên' })
  @IsString()
  @IsNotEmpty()
  storyId: string

  @ApiProperty({ description: '' })
  @IsString()
  @IsNotEmpty()
  content: string 

  @ApiProperty({ description: '' })
  @IsNumber()
  @IsOptional()
  price: number

  @ApiProperty({ description: '' })
  @IsString()
  @IsOptional()
  currency: string
}
