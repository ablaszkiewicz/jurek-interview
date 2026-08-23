import { Module } from '@nestjs/common';
import { SupplierModule } from '../supplier/supplier.module';
import { PricingController } from './pricing.controller';
import { PricingService } from './pricing.service';

@Module({
  imports: [SupplierModule],
  controllers: [PricingController],
  providers: [PricingService],
})
export class PricingModule {}
