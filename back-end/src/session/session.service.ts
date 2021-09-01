import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import dayjs from 'dayjs'

import { PrismaService } from '../prisma/prisma.service'
import { CreateSessionDto } from './dto/create-session.dto'
import { RefreshSessionDto } from './dto/refresh-session.dto'

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const checkPasswords = await compare(password, user.password)

    if (!checkPasswords) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return user
  }

  async create({ user }: CreateSessionDto) {
    const session = await this.prisma.session.create({
      data: {
        expiresIn: dayjs().add(30, 'days').unix(),
        user: {
          connect: {
            id: user.id
          }
        }
      },
      select: {
        id: true,
        expiresIn: true
      }
    })

    const payload = { role: user.role, sub: user.id }
    const accessToken = this.jwtService.sign(payload)
    const refreshToken = session.id

    return { accessToken, refreshToken }
  }

  async refresh(refreshSessionDto: RefreshSessionDto) {
    const refreshTokenExists = await this.prisma.session.findUnique({
      where: {
        id: refreshSessionDto.refreshToken
      },
      include: {
        user: true
      }
    })

    if (!refreshTokenExists) {
      throw new NotFoundException('Refresh token not found')
    }

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshTokenExists.expiresIn))

    if (refreshTokenExpired) {
      await this.prisma.session.delete({
        where: {
          id: refreshSessionDto.refreshToken
        }
      })

      throw new BadRequestException('Refresh token expired')
    }

    await this.prisma.session.delete({
      where: {
        id: refreshSessionDto.refreshToken
      }
    })

    const { accessToken, refreshToken } = await this.create({ user: refreshTokenExists.user })

    return { accessToken, refreshToken }
  }
}
