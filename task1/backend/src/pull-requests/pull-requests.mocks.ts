export type PullRequest = {
  id: number;
  title: string;
  author: string;
  repository: string;
  is_from_my_team: boolean;
  is_draft: boolean;
  is_closed: boolean;
  ci_passed: boolean;
  is_approved: boolean;
  is_mine: boolean;
};

/**
 * The signed-in user. `is_mine` is true exactly when the author is this person, and because they
 * sit on the platform team `is_mine` always implies `is_from_my_team`.
 */
export const CURRENT_USER = 'jurek';

/**
 * The full static pool. Only a slice of it is served at any moment - see PullRequestsService.
 *
 * The combinations are deliberate rather than random: every mix of draft / closed / CI / approval
 * that the UI has to render shows up at least once, including the awkward ones (an approved PR
 * with red CI, a closed PR that was never reviewed, a draft that somehow got an approval).
 */
export const ALL_PULL_REQUESTS: PullRequest[] = [
  // --- Mine, open, ready to go ---------------------------------------------------------------
  { id: 1, title: 'Add rate limiting to the public API', author: 'jurek', repository: 'core-api', is_from_my_team: true, is_draft: false, is_closed: false, ci_passed: true, is_approved: true, is_mine: true },
  { id: 2, title: 'Retry webhook deliveries three times', author: 'jurek', repository: 'workers', is_from_my_team: true, is_draft: false, is_closed: false, ci_passed: true, is_approved: true, is_mine: true },
  { id: 3, title: 'Drop the legacy session cookie fallback', author: 'jurek', repository: 'web', is_from_my_team: true, is_draft: false, is_closed: false, ci_passed: true, is_approved: false, is_mine: true },
  { id: 4, title: 'Expose queue depth on the metrics endpoint', author: 'jurek', repository: 'core-api', is_from_my_team: true, is_draft: false, is_closed: false, ci_passed: true, is_approved: false, is_mine: true },

  // --- Mine, open, red CI --------------------------------------------------------------------
  { id: 5, title: 'Move avatar uploads to the new bucket', author: 'jurek', repository: 'core-api', is_from_my_team: true, is_draft: false, is_closed: false, ci_passed: false, is_approved: false, is_mine: true },
  { id: 6, title: 'Replace the hand-rolled retry helper', author: 'jurek', repository: 'workers', is_from_my_team: true, is_draft: false, is_closed: false, ci_passed: false, is_approved: true, is_mine: true },

  // --- Mine, drafts --------------------------------------------------------------------------
  { id: 7, title: 'Spike: server-driven navigation', author: 'jurek', repository: 'web', is_from_my_team: true, is_draft: true, is_closed: false, ci_passed: false, is_approved: false, is_mine: true },
  { id: 8, title: 'Draft: split the billing worker off the main queue', author: 'jurek', repository: 'workers', is_from_my_team: true, is_draft: true, is_closed: false, ci_passed: true, is_approved: false, is_mine: true },
  { id: 9, title: 'WIP: incremental schema diffing', author: 'jurek', repository: 'data-pipeline', is_from_my_team: true, is_draft: true, is_closed: false, ci_passed: true, is_approved: true, is_mine: true },

  // --- Mine, closed --------------------------------------------------------------------------
  { id: 10, title: 'Revert the aggressive avatar cache', author: 'jurek', repository: 'web', is_from_my_team: true, is_draft: false, is_closed: true, ci_passed: true, is_approved: true, is_mine: true },
  { id: 11, title: 'Try Bun for the worker runtime', author: 'jurek', repository: 'workers', is_from_my_team: true, is_draft: false, is_closed: true, ci_passed: false, is_approved: false, is_mine: true },
  { id: 12, title: 'Abandoned: rewrite the CSV importer', author: 'jurek', repository: 'data-pipeline', is_from_my_team: true, is_draft: true, is_closed: true, ci_passed: false, is_approved: false, is_mine: true },

  // --- My team, open, approved ---------------------------------------------------------------
  { id: 13, title: 'Fix flaky checkout integration test', author: 'marek', repository: 'core-api', is_from_my_team: true, is_draft: false, is_closed: false, ci_passed: true, is_approved: true, is_mine: false },
  { id: 14, title: 'Bump Postgres driver to 16.2', author: 'ola', repository: 'infrastructure', is_from_my_team: true, is_draft: false, is_closed: false, ci_passed: true, is_approved: true, is_mine: false },
  { id: 15, title: 'Cache avatar URLs for 24h', author: 'kasia', repository: 'web', is_from_my_team: true, is_draft: false, is_closed: false, ci_passed: true, is_approved: true, is_mine: false },
  { id: 16, title: 'Add a health check to the billing worker', author: 'bartek', repository: 'workers', is_from_my_team: true, is_draft: false, is_closed: false, ci_passed: true, is_approved: true, is_mine: false },

  // --- My team, open, waiting on review ------------------------------------------------------
  { id: 17, title: 'Log slow queries above 200ms', author: 'marek', repository: 'core-api', is_from_my_team: true, is_draft: false, is_closed: false, ci_passed: true, is_approved: false, is_mine: false },
  { id: 18, title: 'Migrate the settings page to the new form', author: 'ola', repository: 'web', is_from_my_team: true, is_draft: false, is_closed: false, ci_passed: true, is_approved: false, is_mine: false },
  { id: 19, title: 'Remove the unused feature flag helpers', author: 'kasia', repository: 'core-api', is_from_my_team: true, is_draft: false, is_closed: false, ci_passed: true, is_approved: false, is_mine: false },
  { id: 20, title: 'Pin the Node version in CI', author: 'bartek', repository: 'infrastructure', is_from_my_team: true, is_draft: false, is_closed: false, ci_passed: true, is_approved: false, is_mine: false },

  // --- My team, open, red CI -----------------------------------------------------------------
  { id: 21, title: 'Rework pagination on the audit log', author: 'marek', repository: 'core-api', is_from_my_team: true, is_draft: false, is_closed: false, ci_passed: false, is_approved: false, is_mine: false },
  { id: 22, title: 'Ship the new empty states', author: 'kasia', repository: 'web', is_from_my_team: true, is_draft: false, is_closed: false, ci_passed: false, is_approved: true, is_mine: false },
  { id: 23, title: 'Move cron jobs to the scheduler service', author: 'ola', repository: 'infrastructure', is_from_my_team: true, is_draft: false, is_closed: false, ci_passed: false, is_approved: false, is_mine: false },

  // --- My team, drafts -----------------------------------------------------------------------
  { id: 24, title: 'Draft: unify the error envelope', author: 'marek', repository: 'core-api', is_from_my_team: true, is_draft: true, is_closed: false, ci_passed: false, is_approved: false, is_mine: false },
  { id: 25, title: 'WIP: dark mode tokens', author: 'kasia', repository: 'design-system', is_from_my_team: true, is_draft: true, is_closed: false, ci_passed: true, is_approved: false, is_mine: false },
  { id: 26, title: 'Draft: terraform module for the read replica', author: 'ola', repository: 'infrastructure', is_from_my_team: true, is_draft: true, is_closed: false, ci_passed: true, is_approved: true, is_mine: false },
  { id: 27, title: 'Prototype: batch the outbound emails', author: 'bartek', repository: 'workers', is_from_my_team: true, is_draft: true, is_closed: false, ci_passed: false, is_approved: false, is_mine: false },

  // --- My team, closed -----------------------------------------------------------------------
  { id: 28, title: 'Roll back the query planner hint', author: 'marek', repository: 'core-api', is_from_my_team: true, is_draft: false, is_closed: true, ci_passed: true, is_approved: true, is_mine: false },
  { id: 29, title: 'Superseded by #31: tidy the auth guards', author: 'kasia', repository: 'core-api', is_from_my_team: true, is_draft: false, is_closed: true, ci_passed: true, is_approved: false, is_mine: false },
  { id: 30, title: 'Closed: experiment with edge rendering', author: 'ola', repository: 'web', is_from_my_team: true, is_draft: true, is_closed: true, ci_passed: false, is_approved: false, is_mine: false },
  { id: 31, title: 'Drop the deprecated /v1 endpoints', author: 'bartek', repository: 'core-api', is_from_my_team: true, is_draft: false, is_closed: true, ci_passed: false, is_approved: false, is_mine: false },

  // --- Other teams, open, approved -----------------------------------------------------------
  { id: 32, title: 'Add offline support to the mobile shell', author: 'tomek', repository: 'mobile', is_from_my_team: false, is_draft: false, is_closed: false, ci_passed: true, is_approved: true, is_mine: false },
  { id: 33, title: 'Document the webhook signature scheme', author: 'natalia', repository: 'docs', is_from_my_team: false, is_draft: false, is_closed: false, ci_passed: true, is_approved: true, is_mine: false },
  { id: 34, title: 'Introduce a Tooltip primitive', author: 'piotr', repository: 'design-system', is_from_my_team: false, is_draft: false, is_closed: false, ci_passed: true, is_approved: true, is_mine: false },
  { id: 35, title: 'Backfill the events partition for March', author: 'ania', repository: 'data-pipeline', is_from_my_team: false, is_draft: false, is_closed: false, ci_passed: true, is_approved: true, is_mine: false },

  // --- Other teams, open, waiting on review --------------------------------------------------
  { id: 36, title: 'Swap the push provider', author: 'tomek', repository: 'mobile', is_from_my_team: false, is_draft: false, is_closed: false, ci_passed: true, is_approved: false, is_mine: false },
  { id: 37, title: 'Rewrite the getting-started guide', author: 'natalia', repository: 'docs', is_from_my_team: false, is_draft: false, is_closed: false, ci_passed: true, is_approved: false, is_mine: false },
  { id: 38, title: 'Make the DataTable header sticky', author: 'piotr', repository: 'design-system', is_from_my_team: false, is_draft: false, is_closed: false, ci_passed: true, is_approved: false, is_mine: false },
  { id: 39, title: 'Deduplicate rows in the nightly rollup', author: 'ania', repository: 'data-pipeline', is_from_my_team: false, is_draft: false, is_closed: false, ci_passed: true, is_approved: false, is_mine: false },
  { id: 40, title: 'Add a staging autoscaling policy', author: 'wojtek', repository: 'infrastructure', is_from_my_team: false, is_draft: false, is_closed: false, ci_passed: true, is_approved: false, is_mine: false },

  // --- Other teams, open, red CI -------------------------------------------------------------
  { id: 41, title: 'Upgrade the mobile build toolchain', author: 'tomek', repository: 'mobile', is_from_my_team: false, is_draft: false, is_closed: false, ci_passed: false, is_approved: false, is_mine: false },
  { id: 42, title: 'Regenerate the API reference from OpenAPI', author: 'natalia', repository: 'docs', is_from_my_team: false, is_draft: false, is_closed: false, ci_passed: false, is_approved: true, is_mine: false },
  { id: 43, title: 'Drop the old Button variants', author: 'piotr', repository: 'design-system', is_from_my_team: false, is_draft: false, is_closed: false, ci_passed: false, is_approved: false, is_mine: false },
  { id: 44, title: 'Stream the export instead of buffering it', author: 'ania', repository: 'data-pipeline', is_from_my_team: false, is_draft: false, is_closed: false, ci_passed: false, is_approved: true, is_mine: false },
  { id: 45, title: 'Rotate the deploy keys', author: 'wojtek', repository: 'infrastructure', is_from_my_team: false, is_draft: false, is_closed: false, ci_passed: false, is_approved: false, is_mine: false },

  // --- Other teams, drafts -------------------------------------------------------------------
  { id: 46, title: 'Draft: biometric unlock', author: 'tomek', repository: 'mobile', is_from_my_team: false, is_draft: true, is_closed: false, ci_passed: false, is_approved: false, is_mine: false },
  { id: 47, title: 'WIP: changelog automation', author: 'natalia', repository: 'docs', is_from_my_team: false, is_draft: true, is_closed: false, ci_passed: true, is_approved: false, is_mine: false },
  { id: 48, title: 'Draft: motion guidelines', author: 'piotr', repository: 'design-system', is_from_my_team: false, is_draft: true, is_closed: false, ci_passed: true, is_approved: true, is_mine: false },
  { id: 49, title: 'Spike: DuckDB for local analytics', author: 'ania', repository: 'data-pipeline', is_from_my_team: false, is_draft: true, is_closed: false, ci_passed: false, is_approved: false, is_mine: false },
  { id: 50, title: 'Draft: move secrets to the vault agent', author: 'wojtek', repository: 'infrastructure', is_from_my_team: false, is_draft: true, is_closed: false, ci_passed: true, is_approved: false, is_mine: false },

  // --- Other teams, closed -------------------------------------------------------------------
  { id: 51, title: 'Closed: tablet layout experiment', author: 'tomek', repository: 'mobile', is_from_my_team: false, is_draft: false, is_closed: true, ci_passed: true, is_approved: true, is_mine: false },
  { id: 52, title: 'Stale: translate the docs to German', author: 'natalia', repository: 'docs', is_from_my_team: false, is_draft: false, is_closed: true, ci_passed: false, is_approved: false, is_mine: false },
  { id: 53, title: 'Rejected: bring back the accordion', author: 'piotr', repository: 'design-system', is_from_my_team: false, is_draft: false, is_closed: true, ci_passed: true, is_approved: false, is_mine: false },
  { id: 54, title: 'Closed draft: parquet output format', author: 'ania', repository: 'data-pipeline', is_from_my_team: false, is_draft: true, is_closed: true, ci_passed: false, is_approved: false, is_mine: false },
  { id: 55, title: 'Closed: multi-region failover', author: 'wojtek', repository: 'infrastructure', is_from_my_team: false, is_draft: false, is_closed: true, ci_passed: false, is_approved: true, is_mine: false },

  // --- Long titles and odd repositories, for layout testing -----------------------------------
  { id: 56, title: 'Replace the bespoke permission checks scattered across the controllers with a single policy layer so that adding a new role stops being a three-day job', author: 'zofia', repository: 'core-api', is_from_my_team: false, is_draft: false, is_closed: false, ci_passed: true, is_approved: false, is_mine: false },
  { id: 57, title: 'Fix typo', author: 'filip', repository: 'docs', is_from_my_team: false, is_draft: false, is_closed: false, ci_passed: true, is_approved: true, is_mine: false },
  { id: 58, title: 'Bump 47 dev dependencies', author: 'hania', repository: 'web', is_from_my_team: false, is_draft: false, is_closed: false, ci_passed: false, is_approved: false, is_mine: false },
  { id: 59, title: 'Add tracing spans around the payment provider calls', author: 'zofia', repository: 'core-api', is_from_my_team: false, is_draft: false, is_closed: false, ci_passed: true, is_approved: true, is_mine: false },
  { id: 60, title: 'Delete the dead A/B test scaffolding', author: 'filip', repository: 'web', is_from_my_team: false, is_draft: false, is_closed: true, ci_passed: true, is_approved: true, is_mine: false },

  // --- Remaining draft combinations, so every draft / closed / CI / approval mix is covered ----
  { id: 61, title: 'Draft: approved early, CI still red', author: 'jurek', repository: 'core-api', is_from_my_team: true, is_draft: true, is_closed: false, ci_passed: false, is_approved: true, is_mine: true },
  { id: 62, title: 'Closed draft: approved but never finished', author: 'kasia', repository: 'web', is_from_my_team: true, is_draft: true, is_closed: true, ci_passed: false, is_approved: true, is_mine: false },
  { id: 63, title: 'Closed draft: green CI, no reviewer ever showed up', author: 'tomek', repository: 'mobile', is_from_my_team: false, is_draft: true, is_closed: true, ci_passed: true, is_approved: false, is_mine: false },
  { id: 64, title: 'Closed draft: green and approved, superseded anyway', author: 'wojtek', repository: 'infrastructure', is_from_my_team: false, is_draft: true, is_closed: true, ci_passed: true, is_approved: true, is_mine: false },
];
