import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { Role } from '@prisma/client'

import { Public } from '@/decorators/public-route.decorator'
import { Roles } from '@/decorators/roles.decorator'
import { ParametersPipe } from '@/pipes/parameters.pipe'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto)
  }

  @Get()
  @Roles(Role.ADMIN)
  async findAll() {
    return await this.userService.findAll()
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  async findOne(@Param('id', ParametersPipe) id: string) {
    return await this.userService.findOne(id)
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UsePipes(ValidationPipe)
  async update(@Param('id', ParametersPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(@Param('id', ParametersPipe) id: string) {
    await this.userService.remove(id)
  }
}
