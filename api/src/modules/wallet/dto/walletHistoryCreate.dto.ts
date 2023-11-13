import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class WalletHistoryCreateDto {
  @ApiProperty({ description: '' })
  @IsString()
  @IsNotEmpty()
  type: string

  @ApiProperty({ description: '' })
  @IsNumber()
  @IsNotEmpty()
  amount: number

  @ApiProperty({ description: '' })
  @IsString()
  @IsNotEmpty()
  currency: string

  @ApiProperty({ description: '' })
  @IsOptional()
  content: string
}
