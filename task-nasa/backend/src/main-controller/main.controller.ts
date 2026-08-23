import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { MetricsService } from '../metrics/metrics.service';
import { SatelliteService, SunIntensityReading } from '../satellite/satellite.service';

/**
 * The public face of the service. It hands every request it receives straight to the satellite and
 * returns whatever comes back.
 */
@Controller()
export class MainController {
  constructor(
    private readonly satellite: SatelliteService,
    private readonly metrics: MetricsService,
  ) {}

  @Get('sun-intensity')
  getSunIntensity(@Query('timestamp') timestamp?: string): Promise<SunIntensityReading> {
    this.metrics.countRequest();

    const parsed = Number(timestamp);

    if (!timestamp || !Number.isFinite(parsed)) {
      throw new BadRequestException('timestamp query parameter is required, in milliseconds');
    }

    return this.satellite.getSunIntensity(parsed);
  }
}
