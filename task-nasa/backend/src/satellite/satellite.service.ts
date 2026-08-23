import { Injectable } from '@nestjs/common';
import { MetricsService } from '../metrics/metrics.service';

export type SunIntensityReading = {
  /** The timestamp that was asked for, in milliseconds. */
  timestamp: number;
  /** Start of the five-second window the reading actually belongs to, in milliseconds. */
  window_start: number;
  /** Solar irradiance in W/m2. */
  intensity: number;
};

/** The satellite only samples every five seconds. Anything finer is the same reading. */
const WINDOW_MS = 5000;

const MIN_LATENCY_MS = 1000;
const MAX_LATENCY_MS = 2000;

/**
 * Stand-in for the satellite uplink: slow, and limited by how often the hardware samples.
 *
 * The instrument takes one reading every five seconds, so a timestamp is answered by the window it
 * falls into rather than by the exact millisecond. Two timestamps in the same window are the same
 * question as far as the satellite is concerned.
 */
@Injectable()
export class SatelliteService {
  constructor(private readonly metrics: MetricsService) {}

  async getSunIntensity(timestamp: number): Promise<SunIntensityReading> {
    this.metrics.countSatelliteHit();

    // The uplink is slow and its latency wanders a bit, the way a real one would.
    const latency = MIN_LATENCY_MS + Math.random() * (MAX_LATENCY_MS - MIN_LATENCY_MS);
    await new Promise((resolve) => setTimeout(resolve, latency));

    const windowStart = Math.floor(timestamp / WINDOW_MS) * WINDOW_MS;

    return {
      timestamp,
      window_start: windowStart,
      intensity: intensityFor(windowStart),
    };
  }
}

/**
 * Same window in, same number out, forever. Derived from the window rather than stored, so there
 * is no hidden state anywhere in here.
 */
function intensityFor(windowStart: number): number {
  const seed = Math.sin(windowStart / WINDOW_MS) * 10000;
  const unit = seed - Math.floor(seed);

  // Roughly the range a sun-facing sensor would report, in W/m2.
  return Math.round((900 + unit * 500) * 10) / 10;
}
