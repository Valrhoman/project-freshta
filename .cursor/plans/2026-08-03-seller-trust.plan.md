---
name: Seller trust
overview: Close the open POST /api/products write path, honor login callbackUrl so upload works after sign-in, and attach products to the authenticated seller so the upload page can show “your listings.”
todos:
  - id: gate-post
    content: Gate POST /api/products with auth(); 401 when unauthenticated; set ownerId from session on create
    status: completed
  - id: schema-filter
    content: Add ownerId to Product schema; filter upload-page listings by current user
    status: completed
  - id: login-callback
    content: Honor safe relative callbackUrl in LoginForm; fix UploadForm redirect to /upload
    status: completed
  - id: tests-readme
    content: Extend Jest for unauthorized vs authorized POST; update README known limits
    status: completed
isProject: false
---

# Seller trust: gate product create and ownership

## Goal

Close the open `POST /api/products` write path, honor login `callbackUrl` so upload works after sign-in, and attach products to the authenticated seller so the upload page can show “your listings.”

## Approach

Require a session on product create, persist `ownerId` on the Product model, and scope the upload page list to the current user. Fix login redirect so post-sign-in lands back on upload safely.

## Implementation

### 1. API gate

Gate `POST /api/products` with `auth()`; return 401 when unauthenticated; set `ownerId` from the session on create.

### 2. Schema and listings

Add `ownerId` to the Product mongoose schema; filter upload-page listings by the current user.

### 3. Login / upload redirects

Honor safe relative `callbackUrl` in `LoginForm`; fix `UploadForm` redirect from `/protected/upload` to `/upload`.

### 4. Tests and docs

Extend Jest coverage for unauthorized vs authorized `POST`; update README known limits.

## Out of scope

- Product update / delete APIs
- Backfill of legacy products without `ownerId`

## Divergences

- Login page wraps `LoginForm` in `Suspense` for `useSearchParams`.
- Follow-up noted: legacy products without `ownerId` stay off “Your listings”; update/delete still deferred (later plans).
