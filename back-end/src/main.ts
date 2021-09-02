import { NestFactory } from '@nestjs/core'

import { AllExceptionsFilter } from '@/filters/http-exception.filter'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  app.useGlobalFilters(new AllExceptionsFilter())

  await app.listen(3010)
}

bootstrap()
