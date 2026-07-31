# Freshta — agent notes

## Stack

- Next.js 15.5 App Router (`app/`), React 18, TypeScript, Tailwind CSS 3
- Auth: next-auth v4 (Credentials) — not Auth.js v5 yet
- DB: MongoDB via Mongoose (`utils/db.ts`, `utils/models/`)
- Images: Firebase Storage (`utils/imageStorage.ts`)

## Layout

- `app/` — routes and API route handlers
- `components/` — UI
- `utils/` — db, models, auth helpers, types

## Environment

Copy `.env.example` → `.env.local`. Required vars:

- `DB_USER`, `DB_PASSWORD`, `DB_CLUSTER`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `APP_URL`
- `NEXT_PUBLIC_FIREBASE_*` (client Firebase config)

Never commit `.env` / `.env.local`. Prefer no spaces around `=`.

## Security

- Do not log passwords, tokens, or secrets
- Firebase web config is public by design; Storage/Auth rules must be locked down in the Firebase console
- Rotate `NEXTAUTH_SECRET` and the MongoDB Atlas password if they may have been exposed (shared clones, old logs, etc.)

## Conventions

- Prefer App Router patterns (`next/navigation`, Route Handlers, Metadata API)
- Keep changes focused; avoid drive-by refactors
