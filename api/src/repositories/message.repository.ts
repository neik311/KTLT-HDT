import { Repository } from 'typeorm'
import { MessageEntity } from '../entities'
import { CustomRepository } from '../typeorm'

@CustomRepository(MessageEntity)
export class MessageRepository extends Repository<MessageEntity> {}