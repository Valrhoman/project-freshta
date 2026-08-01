# README and light test scaffold

## Goal

Document Freshta properly and introduce a small, learning-oriented test pyramid (unit / API / e2e) without Cypress or a full auth e2e suite yet.

## Plan

1. Rewrite `README.md` (purpose, setup, stack, routes, scripts, limits, security, testing).
2. Add Jest + Testing Library via `next/jest`: `toTitleCase` unit test + mocked `GET /api/products` API test; scripts `test` / `test:watch`.
3. Add Playwright: `e2e/home.spec.ts`, `e2e/auth-gate.spec.ts` (logged-out `/upload` → login); script `test:e2e`.
4. Document testing in `AGENTS.md`.
5. Bake Chromium OS deps into `.devcontainer/Dockerfile` (`playwright install-deps`), version-synced with `@playwright/test`.

Alternatives rejected: Cypress (duplicates Playwright e2e layer); full login e2e (needs dedicated test user + stable Atlas).

## Outcome

Completed 2026-07-31.

- README, Jest (4 tests green), Playwright specs, and `AGENTS.md` Testing section shipped.
- API route test needs `@jest-environment node` because jsdom lacks `Request`.
- Playwright browsers install via `npx playwright install chromium`; OS libs require Dev Container rebuild after Dockerfile `install-deps` (keep version pin in sync with `package.json`).
- Deferred: register/login happy-path e2e, CI wiring, Lighthouse/performance suite.
