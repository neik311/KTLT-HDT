import { Controller, UseGuards, Post, Body } from '@nestjs/common'
import { MessageCreateDto } from './dto'
import { CurrentUser } from '../common/decorators'
import { FilterOneDto, PaginationDto, UserDto } from '../../dto'
import { JwtAuthGuard, UserAuthGuard } from '../common/guards'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { MessageService } from './message.service'

@ApiBearerAuth()
@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(private readonly service: MessageService) {}

  @ApiOperation({ summary: 'Lấy danh sách bình luận (phân trang)' })
  @Post('pagination')
  public async pagination(@Body() data: PaginationDto) {
    return await this.service.pagination(data)
  }

  @ApiOperation({ summary: 'Tạo mới bình luận' })
  @UseGuards(UserAuthGuard)
  @Post('create_data')
  public async createData(@CurrentUser() user: UserDto, @Body() data: MessageCreateDto) {
    return await this.service.createData(user, data)
  }


  @ApiOperation({ summary: 'Cập nhật trạng thái' })
  @UseGuards(JwtAuthGuard)
  @Post('update_active')
  public async updateActive(@CurrentUser() user: UserDto, @Body() data: FilterOneDto) {
    return await this.service.updateActive(user, data)
  }
}
