import { Controller, Get, Post } from '@nestjs/common';
import { Metrics, MetricsService } from '../metrics/metrics.service';

/**
 * Start and stop signals for the test script. Start zeroes the counters, stop reads them back.
 * Nothing here throttles or changes behaviour - it only brackets a run so the numbers mean
 * something.
 */
@Controller('test-run')
export class TestRunController {
  private startedAt = 0;

  constructor(private readonly metrics: MetricsService) {}

  @Post('start')
  start(): { started_at: number } {
    this.metrics.reset();
    this.startedAt = Date.now();

    return { started_at: this.startedAt };
  }

  @Post('stop')
  stop(): Metrics & { duration_ms: number } {
    return {
      ...this.metrics.snapshot(),
      duration_ms: this.startedAt === 0 ? 0 : Date.now() - this.startedAt,
    };
  }

  @Get('stats')
  stats(): Metrics {
    return this.metrics.snapshot();
  }
}
