import { Global, Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';

// Global so the counters stay a single instance no matter who injects them.
@Global()
@Module({
  providers: [MetricsService],
  exports: [MetricsService],
})
export class MetricsModule {}
