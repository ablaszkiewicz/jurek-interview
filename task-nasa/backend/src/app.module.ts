import { Module } from '@nestjs/common';
import { MainControllerModule } from './main-controller/main-controller.module';
import { MetricsModule } from './metrics/metrics.module';
import { TestRunModule } from './test-run/test-run.module';

@Module({
  imports: [MetricsModule, MainControllerModule, TestRunModule],
})
export class AppModule {}
