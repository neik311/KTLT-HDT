import { In, Like } from 'typeorm'
import { Request as IRequest } from 'express'
import { CREATE_SUCCESS, ERROR_NOT_FOUND_DATA, ERROR_WALLET_AMOUNT, ERROR_WALLET_TRANSFER, enumData } from './../../constants/index'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ChapterRepository, WalletHistoryRepository, WalletChapterRepository } from '../../repositories'
import { ChapterEntity, UserEntity, WalletChapterEntity, WalletHistoryEntity } from '../../entities'
import { WalletHistoryCreateDto, WalletChapterCreateDto } from './dto'
import { PaginationDto, UserDto } from '../../dto'

@Injectable()
export class WalletService {
  constructor(
    private readonly walletHisRepo: WalletHistoryRepository,
    private readonly walletChapterRepo: WalletChapterRepository,
    private readonly chapterRepo: ChapterRepository,
  ) {}

  /** Thêm mới dữ liệu */
  public async createWalletHistory(user: UserDto, data: WalletHistoryCreateDto, req: IRequest) {
    console.log(req?.headers?.origin)
    if (data.type !== enumData.WalletHistoryType.Deposit.code && data.type !== enumData.WalletHistoryType.Withdraw.code)
      throw new Error(ERROR_WALLET_TRANSFER)
    if (+data.amount <= 0) throw new Error(ERROR_WALLET_AMOUNT)

    await this.walletChapterRepo.manager.transaction(async (trans) => {
      const walletHisRepo = trans.getRepository(WalletHistoryEntity)
      const userRepo = trans.getRepository(UserEntity)

      const foundUser = await userRepo.findOne({ where: { id: user.id, isDeleted: false, verified: true } })
      if (!foundUser) throw new Error(ERROR_NOT_FOUND_DATA)
      if (data.type === enumData.WalletHistoryType.Withdraw.code && +data.amount > +foundUser.amount) throw new Error(ERROR_WALLET_AMOUNT)

      const newWalletHis = new WalletHistoryEntity()
      newWalletHis.userId = user.id
      newWalletHis.amount = data.amount
      newWalletHis.content = data.content
      newWalletHis.currency = data.currency
      newWalletHis.type = data.type
      newWalletHis.createdAt = new Date()
      newWalletHis.createdBy = user.id
      await walletHisRepo.save(newWalletHis)

      if (data.type === enumData.WalletHistoryType.Withdraw.code) foundUser.amount = +foundUser.amount - +data.amount
      else if (data.type === enumData.WalletHistoryType.Deposit.code) foundUser.amount = +foundUser.amount + +data.amount
      await userRepo.save(foundUser)
    })

    return { message: CREATE_SUCCESS }
  }

  public async createWalletChapter(user: UserDto, data: WalletChapterCreateDto[]) {
    const totalPrice = await this.walletChapterRepo.manager.transaction(async (trans) => {
      const walletChapterRepo = trans.getRepository(WalletChapterEntity)
      const chapterRepo = trans.getRepository(ChapterEntity)
      const userRepo = trans.getRepository(UserEntity)

      const foundUser = await userRepo.findOne({ where: { id: user.id, isDeleted: false, verified: true } })
      if (!foundUser) throw new Error(ERROR_NOT_FOUND_DATA)

      const lstChapterId = data.map((item) => item.chapterId)
      const foundChapter = await chapterRepo.find({ where: { id: In(lstChapterId) } })
      if (foundChapter?.length !== lstChapterId.length) throw new Error(ERROR_NOT_FOUND_DATA)

      let totalPrice = 0
      for (let item of foundChapter) {
        totalPrice += +item.price
      }

      if (+foundUser.amount < +totalPrice) throw new Error(ERROR_WALLET_AMOUNT)

      const lstTask = []
      for (let item of foundChapter) {
        const newWalletChapter = new WalletChapterEntity()
        newWalletChapter.userId = user.id
        newWalletChapter.chapterId = item.id
        newWalletChapter.price = item.price
        newWalletChapter.currency = item.currency
        newWalletChapter.createdAt = new Date()
        newWalletChapter.createdBy = user.id
        lstTask.push(walletChapterRepo.save(newWalletChapter))
      }

      foundUser.amount = +foundUser.amount - +totalPrice
      await Promise.all(lstTask)
      await userRepo.save(foundUser)
      return totalPrice
    })

    return { message: CREATE_SUCCESS, totalPrice }
  }

  /** Lấy ds lịch sử thanh toán */
  public async getWalletHistoryByUser(user: UserDto) {
    const res: any[] = await this.walletHisRepo.find({
      where: { userId: user.id },
      order: { createdAt: 'DESC' }
    })
    for (let item of res) {
      item.typeName = enumData.WalletHistoryType[item.type].name
    }
    return res
  }

  /** Phân trang */
  public async getWalletChapterByUser(user: UserDto, data: PaginationDto) {
    const whereCon: any = { userId: user.id }
    if (data.where.storyId) {
      const lstChapter = await this.chapterRepo.find({ where: { storyId: data.where.storyId } })
      const lstChapterId = lstChapter.map((item) => item.id)
      whereCon.chapterId = In(lstChapterId)
    }
    const res: any[] = await this.walletChapterRepo.findAndCount({
      where: whereCon,
      order: { createdAt: 'DESC' },
      take: data.take,
      skip: data.skip,
      relations: {
        chapter: {
          story: true,
        },
      },
    })
    for (let item of res[0]) {
      item.storyName = item?.__chapter__?.__story__?.name
      item.storyId = item?.__chapter__?.__story__?.id
      item.chapterId = item?.__chapter__?.id
      item.chapterNumber = item?.__chapter__?.chapterNumber
      item.chapterName = item?.__chapter__?.name
      delete item?.__chapter__
    }
    return res
  }
}
