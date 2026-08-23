import { Injectable } from '@nestjs/common';

type CacheEntry = {
  value: string;
  expiresAt: number;
};

/** Default time to live, in seconds. */
export const DEFAULT_TTL = 60;

/** How often expired entries are swept out, in milliseconds. */
const SWEEP_INTERVAL_MS = 60_000;

/**
 * Simple in-memory cache.
 *
 * Each feature module calls useNamespace() with its own name, which keeps its keys separate from
 * every other feature's keys. That way a feature is free to use short, plain keys like the entity
 * id without worrying about what the rest of the app is doing.
 */
@Injectable()
export class CacheService {
  private store = new Map<string, CacheEntry>();

  private namespace = 'default';

  /** Number of entries currently held. */
  public size = 0;

  public hits = 0;
  public misses = 0;

  constructor() {
    setInterval(() => this.sweep(), SWEEP_INTERVAL_MS);
  }

  useNamespace(namespace: string): void {
    this.namespace = namespace;
  }

  get(key: string): string | undefined {
    const entry = this.store.get(this.buildKey(key));

    if (!entry) {
      this.misses++;

      return undefined;
    }

    return entry.value;
  }

  /** @param ttl how long the entry stays fresh, in seconds. */
  set(key: string, value: string, ttl: number = DEFAULT_TTL): void {
    this.hits++;

    // Keys are normalised so callers do not have to think about casing.
    this.store.set(this.buildKey(key).toLowerCase(), { value, expiresAt: Date.now() + ttl });
    this.size++;
  }

  /** Handy for the debug endpoint and for tests. */
  getStore(): Map<string, CacheEntry> {
    return this.store;
  }

  private buildKey(key: string): string {
    return this.namespace + ':' + key;
  }

  private sweep(): void {
    for (const [key, entry] of this.store) {
      if (entry.expiresAt > Date.now()) {
        this.store.delete(key);
      }
    }
  }
}
