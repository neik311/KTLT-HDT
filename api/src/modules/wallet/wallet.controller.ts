import { Controller, UseGuards, Post, Body, Req } from '@nestjs/common'
import { Request as IRequest } from 'express'
import { WalletHistoryCreateDto, WalletChapterCreateDto } from './dto'
import { CurrentUser } from '../common/decorators'
import {  PaginationDto, UserDto } from '../../dto'
import {  UserAuthGuard } from '../common/guards'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { WalletService } from './wallet.service'

@ApiBearerAuth()
@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly service: WalletService) {}

  @ApiOperation({ summary: '' })
  @UseGuards(UserAuthGuard)
  @Post('create_wallet_history')
  public async createWalletHistory(@CurrentUser() user: UserDto, @Body() data: WalletHistoryCreateDto,@Req() req: IRequest) {
    return await this.service.createWalletHistory(user, data,req)
  }

  @ApiOperation({ summary: '' })
  @UseGuards(UserAuthGuard)
  @Post('create_wallet_chapter')
  public async createWalletChapter(@CurrentUser() user: UserDto, @Body() data: WalletChapterCreateDto[]) {
    return await this.service.createWalletChapter(user, data)
  }

  @ApiOperation({ summary: '' })
  @UseGuards(UserAuthGuard)
  @Post('get_wallet_history')
  public async getWalletHistoryByUser(@CurrentUser() user: UserDto) {
    return await this.service.getWalletHistoryByUser(user)
  }

  @ApiOperation({ summary: '' })
  @UseGuards(UserAuthGuard)
  @Post('get_wallet_chapter')
  public async getWalletChapterByUser(@CurrentUser() user: UserDto, @Body() data: PaginationDto) {
    return await this.service.getWalletChapterByUser(user, data)
  }
}
