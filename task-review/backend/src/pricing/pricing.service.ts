import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';
import { SupplierService } from '../supplier/supplier.service';

export type Price = {
  product_id: string;
  currency: string;
  amount: number;
};

@Injectable()
export class PricingService {
  constructor(
    private readonly supplier: SupplierService,
    private readonly cache: CacheService,
  ) {
    this.cache.useNamespace('pricing');
  }

  async getPrice(id: string, currency: string): Promise<Price> {
    const cached = this.cache.get(id);

    if (cached) {
      return JSON.parse(cached) as Price;
    }

    const product = await this.supplier.fetchProduct(id);

    if (!product) {
      throw new NotFoundException(`No product with id ${id}`);
    }

    // Rates move slowly, so they are worth keeping around too.
    const cachedRate = this.cache.get(currency);
    const rate = cachedRate ? Number(cachedRate) : await this.supplier.fetchExchangeRate(currency);

    if (!rate) {
      throw new BadRequestException(`Unsupported currency ${currency}`);
    }

    this.cache.set(currency, String(rate));

    const price = {
      product_id: product.id,
      currency,
      amount: Math.round(product.base_price * rate * 100) / 100,
    };

    this.cache.set(id, JSON.stringify(price));

    return price;
  }
}
