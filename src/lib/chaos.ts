/**
 * chaos.ts — shared randomness utilities for the piece's chaos systems.
 *
 * The randomness is intentional (see docs/creative-methodology.md); it lives
 * here so every "the UI does something unpredictable" moment is inspectable,
 * consistent, and unit-testable instead of being scattered inline
 * `Math.random()` calls.
 */

/**
 * Uniform random integer in `[0, length)`. All "pick a random victim"
 * logic (bystander checkbox, rave color, cob teleport) goes through here.
 */
export function randomIndex(length: number): number {
  return Math.floor(Math.random() * length);
}

/**
 * Return a uniformly random member of a non-empty array.
 * Throws on an empty array rather than returning `undefined` — a rave blob
 * with no color is a bug, not a design choice.
 */
export function pickRandom<T>(items: readonly T[]): T {
  if (items.length === 0) {
    throw new RangeError('pickRandom: requires a non-empty array');
  }
  // The length guard above makes the index provably in-bounds.
  return items[randomIndex(items.length)]!;
}

/** True with probability `probability` (a 0..1 float). */
export function chance(probability: number): boolean {
  return Math.random() < probability;
}
