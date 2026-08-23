import { Module } from '@nestjs/common';
import { PullRequestsModule } from '../pull-requests/pull-requests.module';
import { MainController } from './main.controller';

@Module({
  imports: [PullRequestsModule],
  controllers: [MainController],
})
export class MainControllerModule {}
