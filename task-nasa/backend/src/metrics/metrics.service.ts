import { Injectable } from '@nestjs/common';

export type Metrics = {
  /** Requests that reached the main controller. */
  requests_received: number;
  /** Calls that actually went out to the satellite. */
  satellite_hits: number;
};

/**
 * Two counters, nothing more. The test script resets them before a run and reads them back after,
 * so a run reports what came in at the front door next to what went out to the satellite.
 */
@Injectable()
export class MetricsService {
  private requestsReceived = 0;
  private satelliteHits = 0;

  countRequest(): void {
    this.requestsReceived++;
  }

  countSatelliteHit(): void {
    this.satelliteHits++;
  }

  reset(): void {
    this.requestsReceived = 0;
    this.satelliteHits = 0;
  }

  snapshot(): Metrics {
    return {
      requests_received: this.requestsReceived,
      satellite_hits: this.satelliteHits,
    };
  }
}
