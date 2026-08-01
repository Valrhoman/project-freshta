# Upgrade React and Auth

## Goal

Upgrade React 18→19 and migrate next-auth v4→Auth.js v5 (Credentials + JWT) before README/tests, so later e2e targets a stable auth API.

## Plan

1. Bump `react` / `react-dom` and types to 19; lint + build smoke.
2. Replace `utils/helpers/authOptions.ts` with root `auth.ts` exporting `handlers`, `auth`, `signIn`, `signOut`.
3. Thin `[...nextauth]` route; `getServerSession` → `auth()` on `/upload`; update types and env (`AUTH_SECRET`, optional `AUTH_URL`).
4. No auth middleware this pass; keep page-level gate on `/upload`.
5. Defer README rewrite and Jest/Playwright to a follow-up plan.

Alternatives rejected: Cypress (not needed yet); Auth.js middleware (Edge + mongoose risk).

## Outcome

Completed 2026-07-31.

- React 19 shipped; fixed `SearchBar` `RefObject<HTMLInputElement | null>` for React 19 types.
- Auth.js via `next-auth@beta` (`5.0.0-beta.x`); Credentials + JWT in `auth.ts`.
- LoginForm success check updated (`error` is `undefined` on success in v5, not `null`).
- Sign-out uses `callbackUrl: '/account/login'`; omit `AUTH_URL` locally so redirects follow the browser origin (`trustHost`).
- Divergences / follow-ups: throwing in `authorize` hit a broken `/api/auth/error` page — switched to `return null` and `pages.error: '/account/login'`. Stale `.next` cache caused webpack `.call` crashes; clear `.next` if auth routes 500 oddly. Full `next build` still needs valid Atlas credentials for home prerender.
