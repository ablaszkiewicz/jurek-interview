import { Module } from '@nestjs/common';
import { SatelliteModule } from '../satellite/satellite.module';
import { MainController } from './main.controller';

@Module({
  imports: [SatelliteModule],
  controllers: [MainController],
})
export class MainControllerModule {}
