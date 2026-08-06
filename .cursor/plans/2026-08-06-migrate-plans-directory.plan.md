---
name: Migrate plans directory
overview: Retire docs/plans/ in favor of committed .cursor/plans/ using the Cursor plan MD format (frontmatter todos + Goal/Approach/Implementation/Out of scope), add a Divergences section, and date-prefix filenames.
todos:
  - id: update-rule
    content: Rewrite .cursor/rules/plan-docs.mdc for .cursor/plans path, template, Divergences, naming, README
    status: completed
  - id: migrate-plans
    content: Rewrite 4 docs/plans files + seller_product_mutate into dated .plan.md format under .cursor/plans; add README
    status: completed
  - id: cleanup-refs
    content: Delete docs/plans/; update AGENTS.md Conventions
    status: completed
isProject: false
---

# Migrate plan docs to `.cursor/plans`

## Goal

Retire `docs/plans/` and make committed `.cursor/plans/` the canonical plan history, using Cursor’s plan MD shape (frontmatter todos + Goal / Approach / Implementation / Out of scope), a dedicated Divergences section, and `YYYY-MM-DD-slug.plan.md` filenames.

## Approach

Rewrite policy and existing plan files in place under `.cursor/plans/`; do not keep a dual-directory setup. Cursor’s “Save to workspace” may still create `name_hash.plan.md` — rename promptly to the date-prefixed form (same day as plan creation). Completion is tracked via todo `status`; unplanned work goes in `## Divergences`. Keep a README index. Workspace is bind-mounted, so once files live here and are tracked, the old “plans may not survive rebuilds” warning is obsolete.

Locked decisions:

- Canonical dir: `.cursor/plans/` only
- Filename: `YYYY-MM-DD-short-kebab-slug.plan.md`
- Format: frontmatter (`name`, `overview`, `todos`, `isProject`) + body sections below; drop old `## Plan` / `## Outcome`
- Unplanned work: `## Divergences`
- Completion signal: todo statuses only
- Index: `.cursor/plans/README.md`

## Target plan template

```md
---
name: Short title
overview: One–two sentence summary.
todos:
  - id: example
    content: Concrete task
    status: pending   # → completed | cancelled when done
isProject: false
---

# Title

## Goal
...

## Approach
...
(optional mermaid)

## Implementation
### 1. ...
...

## Out of scope
...

## Divergences
(Fill during/after execution)
- None | or bullets for unplanned decisions, errors, follow-ups that weren’t in the original plan
```

## Implementation

### 1. Policy: [`.cursor/rules/plan-docs.mdc`](.cursor/rules/plan-docs.mdc)

- Path → `.cursor/plans/YYYY-MM-DD-short-slug.plan.md`
- Structure → template above (frontmatter + Divergences; no Goal/Plan/Outcome trio)
- Index → `.cursor/plans/README.md`
- Note: after “Save to workspace”, rename off the hash form if needed; never delete old plan files; still commit plans (not gitignored)

### 2. Migrate existing files

| From (`docs/plans/`) | To (`.cursor/plans/`) |
|---|---|
| `2026-07-31-upgrade-react-auth.md` | `2026-07-31-upgrade-react-auth.plan.md` |
| `2026-07-31-readme-and-tests.md` | `2026-07-31-readme-and-tests.plan.md` |
| `2026-08-03-seller-trust.md` | `2026-08-03-seller-trust.plan.md` |
| `2026-08-06-ownerid-backfill.md` | `2026-08-06-ownerid-backfill.plan.md` |

Per file, rewrite (not just move):

- Add YAML frontmatter; turn each Plan step into a todo with `status: completed` (deferred Outcome bullets → `cancelled` or Out of scope).
- `## Plan` → `## Approach` (+ short `## Implementation` when file-level detail exists).
- Expected Outcome bullets implied by completed todos; unexpected/deferred bits → `## Divergences`.
- Strip self-references to indexing `docs/plans/README.md`.

Also rename `.cursor/plans/seller_product_mutate_5af5f697.plan.md` → `2026-08-06-seller-product-mutate.plan.md`, remove its “add docs/plans/…” todo, and drop `docs/plans` links.

Write `.cursor/plans/README.md` linking all five (plus rule pointer).

### 3. Cleanup: [`AGENTS.md`](AGENTS.md) and `docs/plans/`

Update AGENTS Conventions to point at `.cursor/plans/`; drop the rebuild warning. Delete the entire `docs/plans/` tree.

## Out of scope

- Changing how Cursor’s Plan UI stores ephemeral plans outside the workspace
- Committing or pushing (left to the operator)
- Implementing the seller product mutate work itself

## Divergences

- Empty `docs/` directory removed after `docs/plans/` (not only the `plans` subfolder).
- This plan file itself was only under Cursor’s home `.cursor/plans/` (`migrate_plans_directory_7e089b45.plan.md`) and was recreated in the workspace as `2026-08-06-migrate-plans-directory.plan.md` after the hash-named copy became unretrievable.
