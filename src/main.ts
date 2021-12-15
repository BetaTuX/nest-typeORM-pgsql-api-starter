import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { QueryFailedExceptionFilter } from './filters/queryFailedException.filter';
import { EntityNotFoundExceptionFilter } from './filters/entityNotFound.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new QueryFailedExceptionFilter(),
    new EntityNotFoundExceptionFilter(),
  );
  await app.listen(3000);
}
bootstrap();
