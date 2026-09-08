# ADR 0004: Testing chaotic systems through seeded mocks

- **Status:** Accepted
- **Date:** 2026-09-08
- **Deciders:** repository maintainers

## Context

The piece's core behaviors are random: the bystander checkbox toggle (p = 0.5),
hover-selection (p = 0.3), the strobe palette, cob teleportation, randomized
shake delays. Naive tests either flake (asserting statistical behavior) or
skip the interesting parts entirely (only testing static markup).

## Decision

- All randomness is centralized in `src/lib/chaos.ts`, whose primitives are
  unit-tested at **seeded boundaries** (`Math.random` mocked to 0 / 0.999999 /
  arbitrary values), including the empty-array `RangeError` contract.
- Component tests mock `Math.random` to exercise **both branches** of each
  chance behavior deterministically — e.g. the bystander checkbox test pins
  that mocking 0.1 toggles checkbox 0 _and_ bystander 5 (`floor(0.1 × 50)`),
  while mocking 0.9 toggles only checkbox 0.
- Render-phase purity is enforced (`react-hooks/purity` + code review): random
  values shown by the UI are produced in state initializers or event handlers,
  which are exactly the places tests can seed. This is why the purity rule is
  an asset to the art, not an obstacle.

## Consequences

- The full suite (26 tests) is deterministic: it never flakes, so it can gate
  CI without a tolerance budget.
- New chaos behavior has a defined path: add a primitive or a `chance(p)`
  call, seed it in tests, keep `Math.random()` out of render paths.
- Statistical properties (uniformity) are deliberately _not_ tested — the
  primitives are thin wrappers over `Math.random`; mocking the boundary pins
  the contract without re-testing the platform.
