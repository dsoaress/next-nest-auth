import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { PrismaService } from '../prisma/prisma.service'
import { SessionController } from './session.controller'
import { SessionService } from './session.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '15m' }
      }),
      inject: [ConfigService]
    }),
    PassportModule
  ],
  controllers: [SessionController],
  providers: [SessionService, PrismaService, LocalStrategy, JwtStrategy]
})
export class SessionModule {}
