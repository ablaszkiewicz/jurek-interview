import { Controller, Get } from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller('cache')
export class CacheController {
  constructor(private readonly cache: CacheService) {}

  @Get()
  dump() {
    return {
      size: this.cache.size,
      hits: this.cache.hits,
      misses: this.cache.misses,
      entries: Object.fromEntries(this.cache.getStore()),
    };
  }
}
