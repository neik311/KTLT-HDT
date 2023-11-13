import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { ApiProperty } from '@nestjs/swagger'
import {  UserEntity } from '.'
import { enumData } from '../constants'

/** Lịch sử nạp / rút */
@Entity({ name: 'wallet_history' })
export class WalletHistoryEntity extends BaseEntity {
  @ApiProperty({ description: '' })
  @Column({
    type: 'varchar',
    length: 36,
    nullable: false,
  })
  userId: string
  @ManyToOne(() => UserEntity, (p) => p.id)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: Promise<UserEntity>

  @ApiProperty({ description: 'Loại nạp / rút' })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    default: enumData.WalletHistoryType.Deposit.code,
  })
  type: string

  @ApiProperty({ description: 'Thông tin giao dịch' })
  @Column({
    type: 'text',
    nullable: true,
  })
  content: string

  @ApiProperty({ description: 'Giá trị' })
  @Column({ nullable: false, type: 'decimal', precision: 12, scale: 4, default: 0 })
  amount: number

  @ApiProperty({ description: 'Tiền tệ' })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  currency: string
}
