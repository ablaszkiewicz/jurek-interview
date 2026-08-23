import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SupplierService } from '../supplier/supplier.service';

export type Price = {
  product_id: string;
  currency: string;
  amount: number;
};

@Injectable()
export class PricingService {
  constructor(private readonly supplier: SupplierService) {}

  async getPrice(id: string, currency: string): Promise<Price> {
    const product = await this.supplier.fetchProduct(id);

    if (!product) {
      throw new NotFoundException(`No product with id ${id}`);
    }

    const rate = await this.supplier.fetchExchangeRate(currency);

    if (!rate) {
      throw new BadRequestException(`Unsupported currency ${currency}`);
    }

    return {
      product_id: product.id,
      currency,
      amount: Math.round(product.base_price * rate * 100) / 100,
    };
  }
}
