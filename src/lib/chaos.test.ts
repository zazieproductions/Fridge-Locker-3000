import { afterEach, describe, expect, it, vi } from 'vitest';
import { chance, pickRandom, randomIndex } from './chaos';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('randomIndex', () => {
  it('returns 0 when Math.random is 0', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    expect(randomIndex(10)).toBe(0);
  });

  it('returns length - 1 at the top of the range (never length)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.999999);
    expect(randomIndex(10)).toBe(9);
  });

  it('stays in bounds over many rolls', () => {
    for (let i = 0; i < 500; i++) {
      const idx = randomIndex(7);
      expect(idx).toBeGreaterThanOrEqual(0);
      expect(idx).toBeLessThan(7);
    }
  });
});

describe('pickRandom', () => {
  it('returns a member of the array', () => {
    const items = ['FREEZE', 'THAW', 'CRUSH', 'CRY'] as const;
    expect(items).toContain(pickRandom(items));
  });

  it('is uniform at the boundaries', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    expect(pickRandom(['a', 'b', 'c'])).toBe('a');
    vi.spyOn(Math, 'random').mockReturnValue(0.999999);
    expect(pickRandom(['a', 'b', 'c'])).toBe('c');
  });

  it('refuses the empty array', () => {
    expect(() => pickRandom([])).toThrow(RangeError);
  });
});

describe('chance', () => {
  it('is true below the probability', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1);
    expect(chance(0.5)).toBe(true);
  });

  it('is false above the probability', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9);
    expect(chance(0.5)).toBe(false);
  });

  it('never fires at probability 0', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    expect(chance(0)).toBe(false);
  });
});
