import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'

import { Public } from '../common/decorators/public-route.decorator'
import { LocalAuthGuard } from '../common/guards/local-auth.guard'
import { CreateSessionDto } from './dto/create-session.dto'
import { RefreshSessionDto } from './dto/refresh-session.dto'
import { SessionService } from './session.service'

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post()
  create(@Req() createSessionDto: CreateSessionDto) {
    return this.sessionService.create(createSessionDto)
  }

  @Public()
  @HttpCode(200)
  @Post('refresh-token')
  @UsePipes(ValidationPipe)
  async refreshToken(@Body() refreshSessionDto: RefreshSessionDto) {
    return await this.sessionService.refresh(refreshSessionDto)
  }
}
