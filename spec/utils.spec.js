import { getRandomInt } from '../src/utils.js';

describe('getRandomInt', () => {
  it('should return an integer between 0 and max (inclusive)', () => {
    const max = 5;
    for (let i = 0; i < 100; i++) {
      const result = getRandomInt(max);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(max);
      expect(Number.isInteger(result)).toBe(true);
    }
  });
});
