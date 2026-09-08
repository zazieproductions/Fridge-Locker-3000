# ADR 0001: Curate, don't sanitize

- **Status:** Accepted
- **Date:** 2026-09-08
- **Deciders:** repository maintainers

## Context

The repository is an AI-generated DesignArena tournament export whose design
deliberately violates mainstream UI conventions: 10 Hz strobing, screen shake,
dishonest affordances, Comic Sans, `alert()` dialogs, chaos logic that breaks
user control. A professionalization pass was requested. The obvious risk:
"professional" passes sand off exactly what makes a piece worth keeping.

## Decision

Professionalization applies to the **engineering substrate only**:

- dependency hygiene, asset pipeline, type strictness, tests, CI, docs,
  tooling boundaries, tracker removal;

and explicitly **not** to the **aesthetic surface**:

- every visual decision, animation, chaos behavior, joke, and affordance is
  preserved as-shipped, with comments added only to mark intent.

A two-way test was applied to every candidate change: _does this make the
code more trustworthy without making the piece tamer?_ Changes that failed
the second half (e.g. replacing `alert()` with toasts, adding
`aria-label` honesty to "UNLOCK (IMPOSSIBLE)", memoizing the re-scatter)
were rejected.

## Consequences

- Some lint-level oddities survive deliberately and are marked with comments
  ("Do not useMemo") so they are not "fixed" by drive-by cleanups.
- `prefers-reduced-motion` support was added as the piece's single consent
  valve — it changes nothing for users who have not requested reduced motion.
- Future contributors must treat aesthetic changes as artistic proposals,
  documented in ADRs ([creative-methodology.md](../creative-methodology.md)).
