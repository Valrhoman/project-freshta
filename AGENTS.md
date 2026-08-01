# Freshta — agent notes

## Stack

- Next.js 15.5 App Router (`app/`), React 19, TypeScript, Tailwind CSS 3
- Auth: Auth.js / next-auth v5 beta (Credentials + JWT) — config in root `auth.ts`
- DB: MongoDB Atlas via Mongoose (`utils/db.ts` builds `mongodb+srv://…`; `utils/models/`)
- Images: Firebase Storage (`utils/imageStorage.ts`)

## Layout

- `app/` — routes and API route handlers
- `auth.ts` — Auth.js config (`handlers`, `auth`, `signIn`, `signOut`)
- `components/` — UI
- `utils/` — db, models, auth helpers, types

## Environment

Copy `.env.example` → `.env.local`. Required vars:

- `DB_USER`, `DB_PASSWORD`, `DB_CLUSTER`, `AUTH_SECRET`
- `NEXT_PUBLIC_FIREBASE_*` (client Firebase config)
- `AUTH_URL` is optional; if set it must match the origin you browse. Prefer omitting it locally (`trustHost` in `auth.ts`) so a different Next port (e.g. 3001) still works.

Never commit `.env` / `.env.local`. Prefer no spaces around `=`.

Do not invent `APP_URL` usage — it is not read by the app today.

## Security

- Do not log passwords, tokens, or secrets
- Firebase web config is public by design; Storage/Auth rules must be locked down in the Firebase console
- Rotate `AUTH_SECRET` and the MongoDB Atlas password if they may have been exposed (shared clones, old logs, etc.)

## Conventions

- Prefer App Router patterns (`next/navigation`, Route Handlers, Metadata API)
- Use `auth()` from `@/auth` for server-side session checks (not `getServerSession`)
- Keep changes focused; avoid drive-by refactors
- After a Cursor plan is finished, keep Goal/Plan/Outcome under [`docs/plans/`](docs/plans/) per [`.cursor/rules/plan-docs.mdc`](.cursor/rules/plan-docs.mdc). Do not rely on `.cursor/plans/` surviving Dev Container rebuilds.

## Testing

- **Jest** (`npm test`) — unit and API tests co-located as `*.test.ts(x)`; config in `jest.config.js`. Mock MongoDB/Firebase in unit runs; never point tests at production secrets.
- **Playwright** (`npm run test:e2e`) — specs in `e2e/`. First-time browsers: `npx playwright install chromium`. Chromium OS libs are baked into `.devcontainer/Dockerfile` (`playwright install-deps`); rebuild the container if launch fails on missing `.so` files.
- Ignore `e2e/` from Jest via `testPathIgnorePatterns` so Playwright specs are not picked up by Jest.
- Prefer e2e smokes that do not require a live Atlas user (see `e2e/auth-gate.spec.ts`).
