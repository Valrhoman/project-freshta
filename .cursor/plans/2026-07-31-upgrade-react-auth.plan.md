---
name: Upgrade React and Auth
overview: Upgrade React 18→19 and migrate next-auth v4→Auth.js v5 (Credentials + JWT) before README/tests, so later e2e targets a stable auth API.
todos:
  - id: bump-react
    content: Bump react / react-dom and types to 19; lint + build smoke
    status: completed
  - id: auth-js
    content: Replace utils/helpers/authOptions.ts with root auth.ts (handlers, auth, signIn, signOut)
    status: completed
  - id: wire-app
    content: Thin [...nextauth] route; getServerSession → auth() on /upload; update types and env
    status: completed
  - id: skip-middleware
    content: No auth middleware this pass; keep page-level gate on /upload
    status: completed
  - id: defer-readme-tests
    content: Defer README rewrite and Jest/Playwright to a follow-up plan
    status: completed
isProject: false
---

# Upgrade React and Auth

## Goal

Upgrade React 18→19 and migrate next-auth v4→Auth.js v5 (Credentials + JWT) before README/tests, so later e2e targets a stable auth API.

## Approach

Bump React first, then replace next-auth v4 with Auth.js v5 Credentials + JWT at the root `auth.ts` export surface. Keep page-level gating on `/upload`; do not add Edge middleware. Defer README and test scaffold to a follow-up.

Alternatives rejected: Cypress (not needed yet); Auth.js middleware (Edge + mongoose risk).

## Implementation

### 1. React 19

Bump `react` / `react-dom` and types to 19; lint + build smoke.

### 2. Auth.js

Replace `utils/helpers/authOptions.ts` with root `auth.ts` exporting `handlers`, `auth`, `signIn`, `signOut`.

### 3. App wiring

Thin `[...nextauth]` route; `getServerSession` → `auth()` on `/upload`; update types and env (`AUTH_SECRET`, optional `AUTH_URL`).

### 4. Scope limits

No auth middleware this pass; keep page-level gate on `/upload`.

## Out of scope

- README rewrite
- Jest / Playwright scaffold
- Auth.js middleware

## Divergences

- Fixed `SearchBar` `RefObject<HTMLInputElement | null>` for React 19 types.
- Auth.js via `next-auth@beta` (`5.0.0-beta.x`).
- LoginForm success check updated (`error` is `undefined` on success in v5, not `null`).
- Sign-out uses `callbackUrl: '/account/login'`; omit `AUTH_URL` locally so redirects follow the browser origin (`trustHost`).
- Throwing in `authorize` hit a broken `/api/auth/error` page — switched to `return null` and `pages.error: '/account/login'`.
- Stale `.next` cache caused webpack `.call` crashes; clear `.next` if auth routes 500 oddly.
- Full `next build` still needs valid Atlas credentials for home prerender.
