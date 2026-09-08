# Creative methodology

This document is the curatorial contract for Fridge Locker 3000: what the piece
is doing on purpose, which accidents were promoted to features, and the rules
any future contributor must follow so the work survives its own maintenance.

## Provenance

The piece was generated end-to-end by **Gemini 3 Pro** during a
[DesignArena](https://designarena.ai) tournament round, and exported from the
platform as a complete Vite + React + Tailwind application (commit
`543a0cd "Export from DesignArena (agon_webapps)"`). Nothing about the _design_
was hand-authored by a human. Everything about the _engineering_ around it —
assets, tooling boundaries, tests, docs, and the removal of platform
telemetry — is the human curation layer documented in this repository.

This split is the interesting part. AI-generated web art is usually evaluated
in the five seconds after generation; treating one as a production repository
asks a different question: **what does it take to own this code?**

## The rules of the piece

These are load-bearing. Breaking them does not make the code worse; it makes
the _artwork_ a different, tamer thing.

1. **Saturation over taste.** Every color decision is maximal. Palette
   corrections are strictly forbidden — the magenta scrollbar against the
   green-on-yellow thumb is not a bug.
2. **Motion is the medium.** Eight simultaneous keyframe systems, 10 Hz color
   strobing, marquees top and bottom. The `prefers-reduced-motion` valve
   (below) is the only permitted muting mechanism.
3. **Dishonest affordances are content.** "UNLOCK (IMPOSSIBLE)",
   "BUY NOW" (nothing can be bought), fifty checkboxes (none matter), the doom
   dropdown ("THIS CHANGES NOTHING"). The UI lies, and then tells you it lied.
4. **Chaos is not randomness-the-planning-failure; it is randomness-the-subject.**
   Bystander checkboxes, hover-selection, uncontrolled cob mutation with no
   reset: each models a small betrayal of user control. They live in
   `src/lib/chaos.ts` so they can be listed, tested, and defended.
5. **The fourth wall stays broken in code, not in docs.** Comments in source
   explain the weirdness where it lives ("Do not useMemo", "There is no reset
   button") so future engineers don't mistake intent for accident.
6. **No jargon laundering.** The piece is garbage-core. The docs call it
   garbage-core. Sophistication belongs in the engineering, not the vocabulary.

## Accidents promoted to features

| What looked like a bug                         | Why it stays                                                                                                             |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Checkbox tilts re-scattered on every re-render | Became explicit: tilts live in state and re-roll in the toggle handler. Same visible behavior, now intentional and pure. |
| `alert()` dialogs for protocol buttons         | The jarring system dialog _is_ the punchline of `ERROR: TOO MUCH CORN`. Not replaced with toasts.                        |
| The unlock button does not unlock              | Correct per specification. "UNLOCK (IMPOSSIBLE)" is the most honest label in the piece.                                  |
| Comic Sans                                     | See rule 1.                                                                                                              |

## Consent valve

The single physiological concession: when the OS requests reduced motion, CSS
collapses animation durations and the storm stops. The default experience is
untouched — the valve defaults _off_ because an experience you must opt out of
is part of what the piece is about, while an experience you **cannot** opt out
of is just a usability bug.

## What curation means here

The engineering pass that produced this repository followed one prime
directive: **curate, don't sanitize** (see
[ADR 0001](decisions/0001-curate-dont-sanitize.md)). Concretely:

- removed: platform telemetry, dev tooling in production, dead dependencies,
  missing assets, untyped boundaries;
- preserved verbatim: every visual decision, every chaos behavior, every joke,
  the original design's exact DOM and class structure;
- added: only what lets the above survive — tests that pin the chaos,
  boundaries that make it greppable, and documentation that makes the intent
  impossible to mistake for debt.

If a change makes the code better but the piece tamer, it is a wrong change.
Propose it in an ADR so it can be admired and rejected in writing.
