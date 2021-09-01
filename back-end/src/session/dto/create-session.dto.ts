import { User } from '@prisma/client'

export class CreateSessionDto {
  user!: User
}
