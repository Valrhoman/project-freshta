# Freshta

Local fresh-produce marketplace: browse featured products, register/login with credentials, and (when signed in) upload items with images.

## Stack

- **Next.js 15** App Router, **React 19**, TypeScript, Tailwind CSS 3
- **Auth.js** (next-auth v5 beta) — Credentials + JWT (`auth.ts`)
- **MongoDB Atlas** via Mongoose (`mongodb+srv`)
- **Firebase Storage** for product images

## Prerequisites

- Node.js ≥ 18.18 (devcontainer uses Node 20)
- A MongoDB Atlas cluster (`mongodb+srv` host)
- A Firebase project with Storage enabled

## Setup

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local` (see [`.env.example`](.env.example)).

Required:

- `AUTH_SECRET` — generate with `npx auth secret` or `openssl rand -base64 32`
- `DB_USER`, `DB_PASSWORD`, `DB_CLUSTER` (Atlas SRV host, e.g. `cluster0.xxxxx.mongodb.net`)
- `NEXT_PUBLIC_FIREBASE_*`

`AUTH_URL` is optional. Prefer omitting it locally so Auth.js follows the browser origin (`trustHost` in `auth.ts`).

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To pin a port: `npm run dev -- -p 3001`.

Optional: open the repo in a [dev container](.devcontainer/) (`npm install` runs on create; port 3000 is forwarded).

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and serve |
| `npm run lint` | ESLint |
| `npm test` | Jest unit / API tests |
| `npm run test:watch` | Jest in watch mode |
| `npm run test:e2e` | Playwright end-to-end smokes |

## Routes and APIs

**Pages**

| Path | Notes |
|------|--------|
| `/` | Home — hero, featured products |
| `/account/login` | Sign in |
| `/account/register` | Create account |
| `/upload` | Post a product (session required; redirects to login) |

**APIs**

| Path | Notes |
|------|--------|
| `POST /api/auth/signup` | Register user |
| `/api/auth/[...nextauth]` | Auth.js handlers |
| `GET` / `POST /api/products` | List / create products (`POST` requires a session; sets `ownerId`) |

## Architecture (brief)

- `app/` — App Router pages and route handlers
- `auth.ts` — Auth.js config (`handlers`, `auth`, `signIn`, `signOut`)
- `components/` — UI
- `utils/` — DB, models, helpers, types

More agent/env detail: [`AGENTS.md`](AGENTS.md).

## Testing

- **Unit / API (Jest):** `npm test` — no real MongoDB; DB calls are mocked in examples
- **E2E (Playwright):** `npm run test:e2e` — first time: `npx playwright install chromium`. Chromium OS libraries are installed in [`.devcontainer/Dockerfile`](.devcontainer/Dockerfile); rebuild the Dev Container if e2e fails with missing shared libraries (e.g. `libglib-2.0`)

Examples:

- Unit: `utils/helpers/toTitleCase.test.ts`
- API: `app/api/products/route.test.ts` (mocked mongoose)
- E2E: `e2e/home.spec.ts`, `e2e/auth-gate.spec.ts` (logged-out `/upload` → login)

Full register/login e2e needs a dedicated test user and stable Atlas — deferred for now.
## Known limits

- No product update/delete APIs yet
- Shop, cart, How It Works, Blog, Contact, and `/myAccount` nav targets are mostly stubs
- Products created before ownership was added have no `ownerId` and will not appear under “Your listings”
- Leftover scaffold: `GET /api/hello`

## Security

- Never commit `.env` / `.env.local`
- Firebase web config is public by design; lock down Storage rules in the Firebase console
- Rotate `AUTH_SECRET` and DB credentials if they may have been exposed
