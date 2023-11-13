import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { ApiProperty } from '@nestjs/swagger'
import { UserEntity } from '.'

/** Tin nhắn */
@Entity({ name: 'message' })
export class MessageEntity extends BaseEntity {
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
    length: 500,
    nullable: true,
  })
  content: string

  /** Bình luận cha */
  @Column({
    type: 'varchar',
    length: 36,
    nullable: true,
  })
  parentId: string
  @ManyToOne(() => MessageEntity, (p) => p.children)
  @JoinColumn({ name: 'parentId', referencedColumnName: 'id' })
  parent: MessageEntity

  /** ds bình luận con - 1 bình luận cha sẽ có thể có nhiều con */
  @OneToMany(() => MessageEntity, (p) => p.parent)
  children: Promise<MessageEntity[]>
}
