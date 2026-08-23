import { NestFactory } from '@nestjs/core';
import { PullRequestsModule } from './pull-requests/pull-requests.module';

async function bootstrap() {
  const app = await NestFactory.create(PullRequestsModule);

  // The frontend runs on its own dev server port, so the browser treats every call as
  // cross-origin. Wide open on purpose - there is nothing to protect here.
  app.enableCors({ origin: '*' });

  // Deliberately obscure port - see the block in README.md. Nothing else on the machine wants it.
  await app.listen(47101);
}

bootstrap();
