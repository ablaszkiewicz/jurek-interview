import { Injectable } from '@nestjs/common';

export type Product = {
  id: string;
  name: string;
  /** Price in the supplier's own currency, PLN. */
  base_price: number;
  in_stock: boolean;
};

const PRODUCTS: Product[] = [
  { id: '1', name: 'Thermal mug', base_price: 79.0, in_stock: true },
  { id: '2', name: 'Desk lamp', base_price: 149.5, in_stock: true },
  { id: '3', name: 'Mechanical keyboard', base_price: 429.0, in_stock: false },
  { id: '12', name: 'Notebook stand', base_price: 119.0, in_stock: true },
  { id: '123', name: 'USB-C hub', base_price: 249.0, in_stock: true },
];

const RATES: Record<string, number> = {
  PLN: 1,
  EUR: 0.23,
  USD: 0.25,
  GBP: 0.2,
};

const MIN_LATENCY_MS = 300;
const MAX_LATENCY_MS = 800;

/**
 * Stand-in for the supplier's HTTP API. Everything here is slow and rate-limited in real life, so
 * treat every call as expensive.
 */
@Injectable()
export class SupplierService {
  async fetchProduct(id: string): Promise<Product | undefined> {
    await this.roundTrip();

    return PRODUCTS.find((product) => product.id === id);
  }

  async fetchExchangeRate(currency: string): Promise<number | undefined> {
    await this.roundTrip();

    return RATES[currency];
  }

  private roundTrip(): Promise<void> {
    const latency = MIN_LATENCY_MS + Math.random() * (MAX_LATENCY_MS - MIN_LATENCY_MS);

    return new Promise((resolve) => setTimeout(resolve, latency));
  }
}
