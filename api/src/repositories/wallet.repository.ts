import { Repository } from 'typeorm'
import { WalletChapterEntity,WalletHistoryEntity } from '../entities'
import { CustomRepository } from '../typeorm'

@CustomRepository(WalletChapterEntity)
export class WalletChapterRepository extends Repository<WalletChapterEntity> {}

@CustomRepository(WalletHistoryEntity)
export class WalletHistoryRepository extends Repository<WalletHistoryEntity> {}