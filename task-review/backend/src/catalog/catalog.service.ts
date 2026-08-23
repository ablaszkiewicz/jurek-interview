import { Injectable, NotFoundException } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';
import { Product, SupplierService } from '../supplier/supplier.service';

@Injectable()
export class CatalogService {
  constructor(
    private readonly supplier: SupplierService,
    private readonly cache: CacheService,
  ) {
    this.cache.useNamespace('catalog');
  }

  async getProduct(id: string): Promise<Product> {
    const cached = this.cache.get(id);

    if (cached) {
      console.log('cache hit for product ' + id);

      return JSON.parse(cached) as Product;
    }

    const product = await this.supplier.fetchProduct(id);

    // Normalise a missing product to null so the entry is always valid JSON.
    this.cache.set(id, JSON.stringify(product ?? null));

    if (!product) {
      throw new NotFoundException(`No product with id ${id}`);
    }

    return product;
  }
}
