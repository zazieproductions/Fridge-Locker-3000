# Contributing to Fridge Locker 3000

Thanks for wanting to touch the corn. This repository is unusual: it is a
**professional engineering wrapper around a deliberately unprofessional
artwork**. Both halves have rules.

## The one rule that matters

**Curate, don't sanitize** ([ADR 0001](docs/decisions/0001-curate-dont-sanitize.md)).
If a change makes the code better but the piece tamer — softer palette, fewer
animations, honest button labels, memoized chaos — it is a wrong change here.
Propose artistic changes in an ADR (a copy of
`docs/decisions/000NN-title.md`) so they can be considered as art, not
slipped in as cleanup.

## Before you open a PR

```bash
npm install        # Node ≥ 20.19
npm run validate   # typecheck + lint + format + tests + build — all must pass
```

CI runs exactly `npm run validate` on Node 20 and 22, plus a guard that fails
if `designarena`/`rrweb`/`arena:` strings ever appear in `dist/`. **Never
re-introduce platform telemetry, analytics, or third-party scripts** — this is
the repo's hard line ([ADR 0002](docs/decisions/0002-remove-platform-telemetry.md)).

## Conventions

- **Randomness** goes through [`src/lib/chaos.ts`](src/lib/chaos.ts) and is
  never called during render (enforced by `react-hooks/purity`). Test it with
  seeded `Math.random` mocks — see
  [ADR 0004](docs/decisions/0004-testing-chaotic-systems.md) and the existing
  component tests for the pattern.
- **Images** are imported only through
  [`src/assets/manifest.ts`](src/assets/manifest.ts); never hard-code URLs.
- **Formatting** is Prettier (`npm run format`); **linting** is type-aware
  ESLint. Both are cheap to run locally and enforced in CI.
- **Commits** are small and single-purpose; this repo's history is the
  canonical example (each curation step is separately reviewable/revertible).
- **Docs** live in [`docs/`](docs/); architectural decisions get ADRs;
  user-facing behavior changes belong in the README's Usage/Roadmap tables.

## Local dev extras

- Opt-in source-map tagging for the element picker:
  `SOURCE_TAGS=1 npm run dev` (see `tools/designarena/README.md`).
- Run just the tests in watch mode: `npm run test:watch`.

## Reporting issues

Include: browser, OS, whether reduced motion is enabled at the OS level
(the consent valve is the #1 "the piece broke" false positive), and console
output. Feature requests that would add a backend, analytics, or real
payments will be rejected on sight — see the README's "Deliberately not
planned" list.
