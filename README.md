# jurek-interview

## task1

A NestJS backend serving mock GitHub pull request data, and a React frontend that displays it.

Everything is hardcoded - no `.env` files, no configuration.

### Running it

```bash
cd task1
mprocs
```

Both panes autostart and install their own dependencies. Then open
`http://localhost:5173`, wait 5 seconds, and the list appears.

### Or one at a time

```bash
cd task1/backend  && pnpm install && pnpm start   # http://localhost:3000
cd task1/frontend && pnpm install && pnpm dev     # http://localhost:5173
```

### The endpoint

```
GET /pull-requests
```

Returns 10 mock pull requests. It always takes 5 seconds.
