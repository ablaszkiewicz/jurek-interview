#!/usr/bin/env node

/**
 * Request storm against the task-nasa backend.
 *
 *   node task-nasa/test-script/storm.mjs
 *
 * Ten ticks, one second apart, a burst of requests on every tick. It sends a start signal first
 * and a stop signal once every request has come back, then prints what it sent next to what the
 * backend saw. No dependencies - plain Node, plain fetch.
 *
 * Deliberately not part of mprocs: the backend is the thing that runs, this is the thing you point
 * at it when you want numbers.
 */

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:47103';

const TICKS = 10;
const TICK_MS = 1000;
const REQUESTS_PER_TICK = 20;

/** The satellite samples once every five seconds. Handy for reporting, not used to send anything. */
const WINDOW_MS = 5000;

async function main() {
  await assertBackendIsUp();

  console.log(`storming ${BASE_URL}`);
  console.log(`${TICKS} ticks x ${REQUESTS_PER_TICK} requests, one tick per ${TICK_MS}ms\n`);

  await signal('start');

  const inFlight = [];
  const results = [];
  const startedAt = performance.now();

  for (let tick = 0; tick < TICKS; tick++) {
    const firedAt = performance.now();

    for (let i = 0; i < REQUESTS_PER_TICK; i++) {
      inFlight.push(sendOne(results));
    }

    process.stdout.write(
      `tick ${String(tick + 1).padStart(2)}/${TICKS}  fired ${REQUESTS_PER_TICK}  ` +
        `(${results.length} back so far)\n`,
    );

    // The last tick has nothing to wait for - the drain below handles it.
    if (tick < TICKS - 1) {
      await sleep(Math.max(0, TICK_MS - (performance.now() - firedAt)));
    }
  }

  const firingDone = performance.now();
  console.log(`\nfiring done after ${ms(firingDone - startedAt)}, waiting for the stragglers...`);

  await Promise.all(inFlight);

  const drainedAt = performance.now();
  const serverStats = await signal('stop');

  report({
    results,
    firingMs: firingDone - startedAt,
    totalMs: drainedAt - startedAt,
    serverStats,
  });
}

async function sendOne(results) {
  const timestamp = Date.now();
  const startedAt = performance.now();

  try {
    const response = await fetch(`${BASE_URL}/sun-intensity?timestamp=${timestamp}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const body = await response.json();

    results.push({
      ok: true,
      latency: performance.now() - startedAt,
      windowStart: body.window_start,
      intensity: body.intensity,
    });
  } catch (error) {
    results.push({ ok: false, latency: performance.now() - startedAt, error: String(error) });
  }
}

function report({ results, firingMs, totalMs, serverStats }) {
  const ok = results.filter((result) => result.ok);
  const failed = results.filter((result) => !result.ok);
  const latencies = ok.map((result) => result.latency).sort((a, b) => a - b);

  const windows = new Map();
  for (const result of ok) {
    windows.set(result.windowStart, result.intensity);
  }

  line();
  console.log('RESULTS');
  line();
  console.log(`requests sent by this script   ${results.length}`);
  console.log(`  succeeded                    ${ok.length}`);
  console.log(`  failed                       ${failed.length}`);
  console.log(`requests seen by the backend   ${serverStats.requests_received}`);
  console.log(`satellite hits                 ${serverStats.satellite_hits}`);
  console.log(`distinct ${WINDOW_MS / 1000}s windows asked for   ${windows.size}`);
  console.log('');
  console.log(`firing window                  ${ms(firingMs)}`);
  console.log(`until the last response        ${ms(totalMs)}`);
  console.log(`backend-side run duration      ${ms(serverStats.duration_ms)}`);

  if (latencies.length > 0) {
    console.log('');
    console.log(`latency  min ${ms(latencies[0])}`);
    console.log(`         p50 ${ms(percentile(latencies, 0.5))}`);
    console.log(`         p95 ${ms(percentile(latencies, 0.95))}`);
    console.log(`         max ${ms(latencies[latencies.length - 1])}`);
  }

  if (windows.size > 0) {
    console.log('');
    console.log('readings');
    for (const [windowStart, intensity] of [...windows].sort((a, b) => a[0] - b[0])) {
      console.log(`  ${new Date(windowStart).toISOString()}  ${intensity} W/m2`);
    }
  }

  line();
  console.log(
    `${results.length} request(s) sent, ` +
      `${serverStats.satellite_hits} satellite hit(s), ` +
      `${windows.size} distinct reading(s).`,
  );
  line();
}

async function signal(which) {
  const response = await fetch(`${BASE_URL}/test-run/${which}`, { method: 'POST' });

  if (!response.ok) {
    throw new Error(`${which} signal failed: HTTP ${response.status}`);
  }

  return response.json();
}

async function assertBackendIsUp() {
  try {
    await fetch(`${BASE_URL}/test-run/stats`);
  } catch {
    console.error(`Nothing is listening on ${BASE_URL}.`);
    console.error('Start the backend first (mprocs, or pnpm start:dev in task-nasa/backend).');
    process.exit(1);
  }
}

function percentile(sorted, fraction) {
  return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * fraction))];
}

function sleep(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

function ms(value) {
  return `${(value / 1000).toFixed(2)}s`;
}

function line() {
  console.log('-'.repeat(56));
}

main();
