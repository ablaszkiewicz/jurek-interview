import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Nothing here is worth protecting.
  app.enableCors({ origin: '*' });

  // Deliberately obscure port - see the block in README.md. Nothing else on the machine wants it.
  await app.listen(47104);
}

bootstrap();
