import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { compare, hash, hashSync } from 'bcryptjs'

import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create({ name, email, password, role }: CreateUserDto) {
    const emailExists = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    if (emailExists) {
      throw new BadRequestException('Email already registered')
    }

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 8),
        role
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        role: true,
        active: true,
        verified: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return user
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        role: true,
        active: true,
        verified: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return users
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id)
    const { oldPassword, password } = updateUserDto

    if (password) {
      if (!oldPassword) {
        throw new BadRequestException('Current password is required in password change')
      }

      const checkPasswords = await compare(oldPassword, user.password)

      if (!checkPasswords) {
        throw new BadRequestException('Passwords do not match')
      }

      updateUserDto.password = await hash(password, 8)

      delete updateUserDto.oldPassword
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id
      },
      data: {
        ...updateUserDto
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        role: true,
        active: true,
        verified: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return updatedUser
  }

  async remove(id: string) {
    await this.findOne(id)
    await this.prisma.user.delete({
      where: {
        id
      }
    })
  }
}
