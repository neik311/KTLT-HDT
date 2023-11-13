import { Module } from '@nestjs/common'
import { TypeOrmExModule } from '../../typeorm'
import { MessageRepository, UserRepository } from '../../repositories'
import { MessageService } from './message.service'
import { MessageController } from './message.controller'

@Module({
  imports: [TypeOrmExModule.forCustomRepository([ MessageRepository, UserRepository])],
  providers: [MessageService],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}