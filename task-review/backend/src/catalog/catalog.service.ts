import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, SupplierService } from '../supplier/supplier.service';

@Injectable()
export class CatalogService {
  constructor(private readonly supplier: SupplierService) {}

  async getProduct(id: string): Promise<Product> {
    const product = await this.supplier.fetchProduct(id);

    if (!product) {
      throw new NotFoundException(`No product with id ${id}`);
    }

    return product;
  }
}
