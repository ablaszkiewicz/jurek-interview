import { NestFactory } from '@nestjs/core';
import { PullRequestsModule } from './pull-requests/pull-requests.module';

async function bootstrap() {
  const app = await NestFactory.create(PullRequestsModule);

  // The frontend runs on its own dev server port, so the browser treats every call as
  // cross-origin. Wide open on purpose - there is nothing to protect here.
  app.enableCors({ origin: '*' });

  await app.listen(3000);
}

bootstrap();
