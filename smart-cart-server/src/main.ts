import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true, // Enable credentials (if needed)
  });

  await app.listen(5000);

  app.useLogger(app.get(Logger));
}
bootstrap();
