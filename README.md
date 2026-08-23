# jurek-interview

## task1

A NestJS backend serving mock GitHub pull request data, and a React frontend that displays it.

Everything is hardcoded - no `.env` files, no configuration.

### Backend

```bash
cd task1/backend
pnpm install
pnpm start
```

Runs on `http://localhost:3000`. One endpoint:

```
GET /pull-requests
```

Returns 10 mock pull requests. The endpoint always takes 5 seconds.

### Frontend

```bash
cd task1/frontend
pnpm install
pnpm dev
```

Runs on `http://localhost:5173`. Open it, wait 5 seconds, the list appears.
