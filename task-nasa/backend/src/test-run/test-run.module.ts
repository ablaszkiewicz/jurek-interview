import { Module } from '@nestjs/common';
import { TestRunController } from './test-run.controller';

@Module({
  controllers: [TestRunController],
})
export class TestRunModule {}
