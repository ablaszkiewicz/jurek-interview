import { Controller, Get, Param } from '@nestjs/common';
import { Product } from '../supplier/supplier.service';
import { CatalogService } from './catalog.service';

@Controller('products')
export class CatalogController {
  constructor(private readonly catalog: CatalogService) {}

  @Get(':id')
  getProduct(@Param('id') id: string): Promise<Product> {
    return this.catalog.getProduct(id);
  }
}
