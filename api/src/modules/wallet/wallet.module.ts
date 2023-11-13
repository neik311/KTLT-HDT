import { Module } from '@nestjs/common'
import { TypeOrmExModule } from '../../typeorm'
import {  ChapterRepository, WalletHistoryRepository, WalletChapterRepository } from '../../repositories'
import { WalletController } from './wallet.controller'
import { WalletService } from './wallet.service'


@Module({
  imports: [TypeOrmExModule.forCustomRepository([ChapterRepository, WalletHistoryRepository, WalletChapterRepository])],
  providers: [WalletService],
  controllers: [WalletController],
  exports: [WalletService],
})
export class WalletModule {}
