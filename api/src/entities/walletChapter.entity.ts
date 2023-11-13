import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.entity'
import { ApiProperty } from '@nestjs/swagger'
import { ChapterEntity, StoryEntity, UserEntity } from '.'

/** Lịch sử mua */
@Entity({ name: 'wallet_chapter' })
export class WalletChapterEntity extends BaseEntity {
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

  @ApiProperty({ description: '' })
  @Column({
    type: 'varchar',
    length: 36,
    nullable: false,
  })
  chapterId: string
  @ManyToOne(() => ChapterEntity, (p) => p.id)
  @JoinColumn({ name: 'chapterId', referencedColumnName: 'id' })
  chapter: Promise<ChapterEntity>

  @ApiProperty({ description: 'Giá mua' })
  @Column({ nullable: false, type: 'decimal', precision: 12, scale: 4, default: 0 })
  price: number

  @ApiProperty({ description: 'Tiền tệ' })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  currency: string
}
