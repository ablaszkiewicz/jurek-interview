import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ALL_PULL_REQUESTS, PullRequest } from './pull-requests.mocks';

export type { PullRequest } from './pull-requests.mocks';

/** How many pull requests the endpoint serves at any given time. */
const SERVED_COUNT = 10;

/** How often one served pull request is swapped for one from the static pool. */
const ROTATION_INTERVAL_MS = 5000;

@Injectable()
export class PullRequestsService implements OnModuleInit, OnModuleDestroy {
  /**
   * The slice of the static pool that is currently served. It starts as a random draw and then
   * drifts: every tick one pull request leaves and a different one arrives, so a client that
   * refetches sees a list that moves without the whole thing being reshuffled.
   */
  private served: PullRequest[] = [];

  private rotation?: NodeJS.Timeout;

  onModuleInit(): void {
    this.served = pickRandom(ALL_PULL_REQUESTS, SERVED_COUNT);

    this.rotation = setInterval(() => this.rotate(), ROTATION_INTERVAL_MS);
    // Nothing should be kept alive just for the rotation.
    this.rotation.unref();
  }

  onModuleDestroy(): void {
    clearInterval(this.rotation);
  }

  /**
   * Always takes three seconds. The delay is the point of the exercise - it is a stand-in for a
   * slow upstream call, and it is fixed rather than random so the wait is the same every time.
   */
  async getPullRequests(): Promise<PullRequest[]> {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return this.served;
  }

  /** Drops one served pull request and pulls in one that is not being served yet. */
  private rotate(): void {
    const servedIds = new Set(this.served.map((pullRequest) => pullRequest.id));
    const candidates = ALL_PULL_REQUESTS.filter((pullRequest) => !servedIds.has(pullRequest.id));

    if (candidates.length === 0 || this.served.length === 0) {
      return;
    }

    const incoming = candidates[Math.floor(Math.random() * candidates.length)];
    const outgoingIndex = Math.floor(Math.random() * this.served.length);

    // Replace in place so the list keeps its order instead of jumping around on every tick.
    this.served = this.served.map((pullRequest, index) =>
      index === outgoingIndex ? incoming : pullRequest,
    );
  }
}

/** Fisher-Yates on a copy, then take the first `count`. */
function pickRandom(pullRequests: PullRequest[], count: number): PullRequest[] {
  const shuffled = [...pullRequests];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}
