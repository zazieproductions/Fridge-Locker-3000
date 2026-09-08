# ADR 0002: Remove DesignArena platform telemetry and dev tooling from production

- **Status:** Accepted
- **Date:** 2026-09-08
- **Deciders:** repository maintainers

## Context

The DesignArena export injected three scripts into `index.html`:

1. an **rrweb session recorder** — captured DOM mutations, clicks, scrolls,
   keydowns and cursor paths into `sessionStorage`, then posted full session
   recordings to the tournament parent frame on `arena:flush`;
2. a **page-view beacon** — POSTed a `localStorage`-persisted viewer UUID plus
   generation metadata (tournament ID, generating model ID) and referrer
   domain to `https://www.designarena.ai/api/agon/page-views` on every load;
3. an **element-picker dev overlay** — bundled into the production payload.

The export's `.gitignore` even listed the source-tags plugin as ignored while
the file was git-tracked, and `vite.config.ts` pulled it in via a silent
`try { await import(...) } catch {}` — always on, in dev _and_ production.

None of these scripts are part of the artwork.

## Decision

- Scripts 1 and 2 (telemetry) are **removed** and archived verbatim under
  `tools/designarena/telemetry-legacy/` with a DO-NOT-SHIP notice. They are
  kept for provenance and audit, never referenced by the app.
- Script 3 (picker) is **removed from the bundle** and made opt-in: its
  compile-time counterpart moved to
  `tools/designarena/vite-plugin-source-tags.ts`, wired only when
  `SOURCE_TAGS=1`. Its Babel dependencies were promoted from incidental
  transitive packages to declared, typed devDependencies.
- CI enforces the decision: `ci.yml` greps `dist/` for
  `designarena|rrweb|arena:` and fails the build on any match.

## Consequences

- `index.html` went from 13.69 kB (≈80 % injected scripts) to 0.72 kB of pure
  markup. The page makes zero network requests beyond its own assets.
- The original export's generation metadata (tournament ID, model ID) is
  documented in prose ([designarena-platform.md](../designarena-platform.md))
  instead of leaked at runtime.
- Anyone re-enabling telemetry — even accidentally via a merge — fails CI.
