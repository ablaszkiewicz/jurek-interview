import { Module } from '@nestjs/common';
import { SatelliteService } from './satellite.service';

@Module({
  providers: [SatelliteService],
  exports: [SatelliteService],
})
export class SatelliteModule {}
