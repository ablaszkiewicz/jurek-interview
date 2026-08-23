import { Injectable } from '@nestjs/common';

export type PullRequest = {
  id: number;
  title: string;
  author: string;
  repository: string;
};

const PULL_REQUESTS: PullRequest[] = [
  { id: 1, title: 'Add rate limiting to the public API', author: 'kasia', repository: 'core-api' },
  { id: 2, title: 'Fix flaky checkout integration test', author: 'marek', repository: 'core-api' },
  { id: 3, title: 'Bump Postgres driver to 16.2', author: 'ola', repository: 'infrastructure' },
  { id: 4, title: 'Drop the legacy session cookie fallback', author: 'jurek', repository: 'web' },
  { id: 5, title: 'Cache avatar URLs for 24h', author: 'kasia', repository: 'web' },
  { id: 6, title: 'Split the billing worker off the main queue', author: 'tomek', repository: 'workers' },
  { id: 7, title: 'Log slow queries above 200ms', author: 'marek', repository: 'core-api' },
  { id: 8, title: 'Migrate the settings page to the new form', author: 'ola', repository: 'web' },
  { id: 9, title: 'Retry webhook deliveries three times', author: 'jurek', repository: 'workers' },
  { id: 10, title: 'Remove the unused feature flag helpers', author: 'tomek', repository: 'core-api' },
];

@Injectable()
export class PullRequestsService {
  /**
   * Always takes five seconds. The delay is the point of the exercise - it is a stand-in for a
   * slow upstream call, and it is fixed rather than random so the wait is the same every time.
   */
  async getPullRequests(): Promise<PullRequest[]> {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    return PULL_REQUESTS;
  }
}
