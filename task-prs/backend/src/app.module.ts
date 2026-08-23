import { Module } from '@nestjs/common';
import { MainControllerModule } from './main-controller/main-controller.module';

@Module({
  imports: [MainControllerModule],
})
export class AppModule {}
