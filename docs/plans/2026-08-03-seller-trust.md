# Seller trust: gate product create and ownership

## Goal

Close the open `POST /api/products` write path, honor login `callbackUrl` so upload works after sign-in, and attach products to the authenticated seller so the upload page can show “your listings.”

## Plan

1. Gate `POST /api/products` with `auth()`; return 401 when unauthenticated; set `ownerId` from the session on create.
2. Add `ownerId` to the Product mongoose schema; filter upload-page listings by the current user.
3. Honor safe relative `callbackUrl` in `LoginForm`; fix `UploadForm` redirect from `/protected/upload` to `/upload`.
4. Extend Jest coverage for unauthorized vs authorized `POST`; update README known limits.
5. Index this plan in `docs/plans/README.md`.

## Outcome

Completed 2026-08-03.

- `POST /api/products` requires a session via `auth()` and returns 401 when missing; creates with `ownerId` from `session.user._id`.
- Product schema gained required indexed `ownerId`; upload page lists only the current seller’s products (empty state when none).
- Login honors relative `callbackUrl` (open-redirect safe); login page wraps `LoginForm` in `Suspense` for `useSearchParams`.
- `UploadForm` unauthenticated redirect aligned to `/upload`.
- Jest: unauthorized `POST` → 401; authenticated `POST` asserts `ownerId` on create. README routes/limits updated.
- Follow-up: legacy products without `ownerId` stay off “Your listings”; update/delete still deferred.
