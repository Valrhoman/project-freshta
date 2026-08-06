---
name: Legacy ownerId backfill
overview: Give operators a safe one-off script to assign ownerId on products created before seller ownership existed, so those listings can appear under “Your listings.”
todos:
  - id: script
    content: Add scripts/backfill-product-ownerId.ts (dry-run default; --apply + --ownerId; verify user; idempotent updateMany)
    status: completed
  - id: npm-tsx
    content: Add tsx and npm backfill:ownerId script loading .env.local via --env-file
    status: completed
  - id: docs
    content: Document usage in README known limits
    status: completed
isProject: false
---

# Legacy ownerId backfill

## Goal

Give operators a safe one-off script to assign `ownerId` on products created before seller ownership existed, so those listings can appear under “Your listings.”

## Approach

Ship a dry-run-by-default CLI that only mutates when `--apply` and an explicit owner id are provided, verifies the target user exists, and updates orphan products idempotently.

## Implementation

### 1. Script

Add `scripts/backfill-product-ownerId.ts`: dry-run by default; apply only with `--apply` and an explicit `--ownerId` (or `BACKFILL_OWNER_ID`); verify the user exists; idempotent `updateMany` on orphans (missing / `null` / `""` ownerId).

### 2. npm wiring

Add `tsx` and an npm `backfill:ownerId` script that loads `.env.local` via Node `--env-file`.

### 3. Docs

Document usage in README known limits / scripts table.

## Out of scope

- Running Atlas `--apply` for the operator (manual step with a real user id)
- Product update / delete APIs

## Divergences

- Dry-run against Atlas found 5 orphan products (operator must run `--apply` with a real user id when ready).
