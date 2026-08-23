import { Module } from '@nestjs/common';
import { CacheModule } from './cache/cache.module';
import { CatalogModule } from './catalog/catalog.module';
import { PricingModule } from './pricing/pricing.module';

@Module({
  imports: [CacheModule, CatalogModule, PricingModule],
})
export class AppModule {}
