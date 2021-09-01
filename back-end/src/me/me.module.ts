import { Module } from '@nestjs/common'

import { UserModule } from '../user/user.module'
import { MeController } from './me.controller'

@Module({
  imports: [UserModule],
  controllers: [MeController]
})
export class MeModule {}
