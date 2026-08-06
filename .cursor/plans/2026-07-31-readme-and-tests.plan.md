---
name: README and light test scaffold
overview: Document Freshta properly and introduce a small, learning-oriented test pyramid (unit / API / e2e) without Cypress or a full auth e2e suite yet.
todos:
  - id: readme
    content: Rewrite README.md (purpose, setup, stack, routes, scripts, limits, security, testing)
    status: completed
  - id: jest
    content: Add Jest + Testing Library via next/jest; toTitleCase unit + mocked GET /api/products; test scripts
    status: completed
  - id: playwright
    content: Add Playwright e2e/home.spec.ts and e2e/auth-gate.spec.ts; script test:e2e
    status: completed
  - id: agents-testing
    content: Document testing in AGENTS.md
    status: completed
  - id: playwright-deps
    content: Bake Chromium OS deps into .devcontainer/Dockerfile (playwright install-deps)
    status: completed
isProject: false
---

# README and light test scaffold

## Goal

Document Freshta properly and introduce a small, learning-oriented test pyramid (unit / API / e2e) without Cypress or a full auth e2e suite yet.

## Approach

Rewrite the README, add Jest for unit/API tests, and Playwright for thin e2e smokes that do not need a live Atlas user. Bake Playwright OS deps into the Dev Container so Chromium can launch.

Alternatives rejected: Cypress (duplicates Playwright e2e layer); full login e2e (needs dedicated test user + stable Atlas).

## Implementation

### 1. README

Rewrite `README.md` (purpose, setup, stack, routes, scripts, limits, security, testing).

### 2. Jest

Add Jest + Testing Library via `next/jest`: `toTitleCase` unit test + mocked `GET /api/products` API test; scripts `test` / `test:watch`.

### 3. Playwright

Add `e2e/home.spec.ts`, `e2e/auth-gate.spec.ts` (logged-out `/upload` → login); script `test:e2e`.

### 4. Agent notes

Document testing in `AGENTS.md`.

### 5. Dev Container

Bake Chromium OS deps into `.devcontainer/Dockerfile` (`playwright install-deps`), version-synced with `@playwright/test`.

## Out of scope

- Register/login happy-path e2e
- CI wiring
- Lighthouse / performance suite

## Divergences

- API route test needs `@jest-environment node` because jsdom lacks `Request`.
- Playwright browsers install via `npx playwright install chromium`; OS libs require Dev Container rebuild after Dockerfile `install-deps` (keep version pin in sync with `package.json`).
