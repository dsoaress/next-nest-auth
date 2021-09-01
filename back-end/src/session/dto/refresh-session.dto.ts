import { IsNotEmpty, IsUUID } from 'class-validator'

export class RefreshSessionDto {
  @IsNotEmpty()
  @IsUUID()
  refreshToken!: string
}
