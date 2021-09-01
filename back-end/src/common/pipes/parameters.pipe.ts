import { BadRequestException, PipeTransform } from '@nestjs/common'
import { isUUID } from 'class-validator'

export class ParametersPipe implements PipeTransform {
  transform(value: string) {
    const isValidId = isUUID(value)

    if (!isValidId) {
      throw new BadRequestException('This is not a valid id')
    }

    return value
  }
}
