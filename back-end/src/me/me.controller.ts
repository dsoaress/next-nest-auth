import { Body, Controller, Delete, Get, Patch, Req, UsePipes, ValidationPipe } from '@nestjs/common'
import { User } from '@prisma/client'

import { UpdateUserDto } from '../user/dto/update-user.dto'
import { UserService } from '../user/user.service'

@Controller('me')
export class MeController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findMe(@Req() { user }: { user: User }) {
    return await this.userService.findOne(user.id)
  }

  @Patch()
  @UsePipes(ValidationPipe)
  async update(@Req() { user }: { user: User }, @Body() updateUserDto: UpdateUserDto) {
    await this.userService.update(user.id, updateUserDto)
  }

  @Delete()
  async delete(@Req() { user }: { user: User }) {
    await this.userService.remove(user.id)
  }
}
