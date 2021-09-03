import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'

import { JwtAuthGuard } from '@/guards/jwt-auth.guard'
import { RolesGuard } from '@/guards/roles.guard'

import { AppController } from './app.controller'
import { MeModule } from './me/me.module'
import { SessionModule } from './session/session.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, SessionModule, MeModule],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard }
  ]
})
export class AppModule {}
