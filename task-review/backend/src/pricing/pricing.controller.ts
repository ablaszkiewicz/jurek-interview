import { Controller, Get, Param, Query } from '@nestjs/common';
import { Price, PricingService } from './pricing.service';

@Controller('products')
export class PricingController {
  constructor(private readonly pricing: PricingService) {}

  @Get(':id/price')
  getPrice(@Param('id') id: string, @Query('currency') currency = 'PLN'): Promise<Price> {
    return this.pricing.getPrice(id, currency);
  }
}
