import { describe, expect, it } from 'vitest';
import { crossConvert } from '../src/utils/conversion';

describe('crossConvert', () => {
  it('converts using cross rate', () => {
    // 1 USD = 42.3342 UAH, 1 EUR = 49.1839 UAH
    const baseRate = 55.915; // GBP
    const targetRate = 1; // UAH
    const result = crossConvert(100, baseRate, targetRate);
    expect(result).toBeCloseTo(5591.5, 1);
  });
});
