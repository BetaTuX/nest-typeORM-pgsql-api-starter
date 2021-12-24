import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { QueryFailedExceptionFilter } from './filters/queryFailedException.filter';
import { EntityNotFoundExceptionFilter } from './filters/entityNotFound.filter';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.useGlobalFilters(
    new QueryFailedExceptionFilter(),
    new EntityNotFoundExceptionFilter(),
  );
  await app.listen(3000);
}
bootstrap();
