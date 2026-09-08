# ADR 0003: Build-time asset guarantees via a typed manifest

- **Status:** Accepted
- **Date:** 2026-09-08
- **Deciders:** repository maintainers

## Context

The original export referenced five root-absolute asset paths that did not
exist in the repository (`/fridge-person.png`, `/corn-fractal.png`,
`/blues-metal-guitar.png`, `/ugly-bg.png`, `/vite.svg`). Every image in the UI
was a broken `<img>`, the body background silently failed to load, and only
`ugly-bg.png` produced a build warning — the `<img src>` failures were
completely invisible to tooling because they are runtime string references.

## Decision

- The three content images were **created** (AI-generated to match the piece's
  aesthetic, resized to 800×800, compressed to JPEG — 8.3 MB of full-res PNG
  became ~670 KB) and the background tile + favicon were **hand-authored as
  SVG** for seamless tiling and crispness at any scale.
- All component assets are imported exclusively through
  `src/assets/manifest.ts`. Vite resolves those imports at build time: a
  missing file is now a **compile error**, not a silently broken `<img>`.
- Root-absolute string URLs (`src="/foo.png"`) are banned from `src/`;
  the convention is enforced in review (and grep-able).

## Consequences

- Every asset is fingerprinted and cache-busted automatically.
- `public/` is reserved for files needed before bundling (currently only
  `favicon.svg`).
- Asset semantics and provenance are documented in `src/assets/README.md`.
- Regenerating art must update `manifest.ts` and the README table together.
