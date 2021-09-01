import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

import { SessionService } from '../session.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private sessionService: SessionService) {
    super({
      usernameField: 'email',
      passwordField: 'password'
    })
  }

  async validate(email: string, password: string) {
    return await this.sessionService.validateUser(email, password)
  }
}
