# Legacy ownerId backfill

## Goal

Give operators a safe one-off script to assign `ownerId` on products created before seller ownership existed, so those listings can appear under “Your listings.”

## Plan

1. Add `scripts/backfill-product-ownerId.ts`: dry-run by default; apply only with `--apply` and an explicit `--ownerId` (or `BACKFILL_OWNER_ID`); verify the user exists; idempotent `updateMany` on orphans.
2. Add `tsx` and an npm `backfill:ownerId` script that loads `.env.local` via Node `--env-file`.
3. Document usage in README known limits; index this plan in `docs/plans/README.md`.

## Outcome

Completed 2026-08-06.

- Added `scripts/backfill-product-ownerId.ts`: dry-run by default; `--apply` requires `--ownerId` or `BACKFILL_OWNER_ID`; verifies user exists; idempotent `updateMany` on missing/`null`/`""` ownerId.
- Added `tsx` and `npm run backfill:ownerId` (loads `.env.local` via `--env-file`).
- Dry-run against Atlas found 5 orphan products (operator must run `--apply` with a real user id when ready).
- README known limits + scripts table updated; plan indexed in `docs/plans/README.md`.
