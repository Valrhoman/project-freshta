# Freshta — agent notes

## Stack

- Next.js 15.5 App Router (`app/`), React 19, TypeScript, Tailwind CSS 3
- Auth: Auth.js / next-auth v5 (Credentials + JWT) — config in root `auth.ts`
- DB: MongoDB via Mongoose (`utils/db.ts`, `utils/models/`)
- Images: Firebase Storage (`utils/imageStorage.ts`)

## Layout

- `app/` — routes and API route handlers
- `auth.ts` — Auth.js config (`handlers`, `auth`, `signIn`, `signOut`)
- `components/` — UI
- `utils/` — db, models, auth helpers, types

## Environment

Copy `.env.example` → `.env.local`. Required vars:

- `DB_USER`, `DB_PASSWORD`, `DB_CLUSTER`, `AUTH_SECRET`, `APP_URL`
- `NEXT_PUBLIC_FIREBASE_*` (client Firebase config)
- `AUTH_URL` is optional; if set it must match the origin you browse. Prefer omitting it locally (`trustHost` in `auth.ts`) so a different Next port (e.g. 3001) still works.

Never commit `.env` / `.env.local`. Prefer no spaces around `=`.

## Security

- Do not log passwords, tokens, or secrets
- Firebase web config is public by design; Storage/Auth rules must be locked down in the Firebase console
- Rotate `AUTH_SECRET` and the MongoDB Atlas password if they may have been exposed (shared clones, old logs, etc.)

## Conventions

- Prefer App Router patterns (`next/navigation`, Route Handlers, Metadata API)
- Use `auth()` from `@/auth` for server-side session checks (not `getServerSession`)
- Keep changes focused; avoid drive-by refactors
