# jurek-interview

Two independent tasks. Each one has its own backend and its own port; nothing is shared between
them. Everything is hardcoded - no `.env` files, no configuration.

```bash
mprocs
```

All panes autostart and install their own dependencies.

## Ports

Everything lives in a private `471xx` block rather than on 3000/5173, so nothing here ever fights
another project for a port. The block is unassigned by IANA and sits below the ephemeral range the
OS hands out to outgoing connections, so it stays free.

| service            | port    |
| ------------------ | ------- |
| task-prs backend   | `47101` |
| task-prs frontend  | `47102` |
| task-nasa backend  | `47103` |

## task-prs

A NestJS backend serving mock GitHub pull request data, and a React frontend that renders it as a
table.

```bash
cd task-prs/backend  && pnpm install && pnpm start   # http://localhost:47101
cd task-prs/frontend && pnpm install && pnpm dev     # http://localhost:47102
```

### The endpoint

```
GET /pull-requests
```

Returns 10 pull requests, each with `id`, `title`, `author`, `repository` and the flags
`is_from_my_team`, `is_draft`, `is_closed`, `ci_passed`, `is_approved`, `is_mine`. It always takes
3 seconds.

The 10 are a slice of a larger static pool. One of them is swapped for a different one every 5
seconds, so the list drifts between fetches.

## task-nasa

A NestJS backend only - no frontend. A main controller in front of a satellite service that
reports sun intensity for a given moment.

```bash
cd task-nasa/backend && pnpm install && pnpm start   # http://localhost:47103
```

### The endpoints

```
GET  /sun-intensity?timestamp=<ms>
POST /test-run/start
POST /test-run/stop
GET  /test-run/stats
```

`/sun-intensity` returns `{ timestamp, window_start, intensity }`. The satellite instrument takes
one reading every 5 seconds, so the answer is fixed per 5-second window, and the uplink takes
1-2 seconds to respond.

The `/test-run` routes bracket a measurement: `start` zeroes the counters, `stop` reads back how
many requests the backend received and how many calls actually went out to the satellite.

### The test script

Not a pane in mprocs - run it yourself once the backend is up:

```bash
node task-nasa/test-script/storm.mjs
```

It sends the start signal, then fires a burst of requests every second for 10 seconds, waits for
every response, sends the stop signal, and prints what it sent next to what the backend saw. No
dependencies.
