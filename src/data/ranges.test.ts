import { describe, it, expect } from 'vitest';
import { parseBoolean, parseNumber, getRangeSlug, getStateSlug, getCitySlug } from './ranges';

describe('parseBoolean', () => {
  it('returns true for "True"', () => {
    expect(parseBoolean('True')).toBe(true);
  });
  it('returns false for "False"', () => {
    expect(parseBoolean('False')).toBe(false);
  });
  it('returns null for empty string', () => {
    expect(parseBoolean('')).toBeNull();
  });
  it('returns null for undefined', () => {
    expect(parseBoolean(undefined)).toBeNull();
  });
});

describe('parseNumber', () => {
  it('parses integer strings', () => {
    expect(parseNumber('42')).toBe(42);
  });
  it('parses float strings', () => {
    expect(parseNumber('3.14')).toBeCloseTo(3.14);
  });
  it('returns null for empty string', () => {
    expect(parseNumber('')).toBeNull();
  });
  it('returns null for non-numeric', () => {
    expect(parseNumber('abc')).toBeNull();
  });
  it('returns null for undefined', () => {
    expect(parseNumber(undefined)).toBeNull();
  });
});

describe('getStateSlug', () => {
  it('lowercases and replaces spaces with hyphens', () => {
    expect(getStateSlug('New York')).toBe('new-york');
  });
  it('handles single word states', () => {
    expect(getStateSlug('Texas')).toBe('texas');
  });
  it('handles states with multiple spaces', () => {
    expect(getStateSlug('North Carolina')).toBe('north-carolina');
  });
});

describe('getCitySlug', () => {
  it('lowercases and replaces spaces', () => {
    expect(getCitySlug('Los Angeles')).toBe('los-angeles');
  });
  it('removes periods', () => {
    expect(getCitySlug('St. Paul')).toBe('st-paul');
  });
  it('handles apostrophes', () => {
    expect(getCitySlug("O'Brien")).toBe('obrien');
  });
});

describe('getRangeSlug', () => {
  it('produces name-city-state slug', () => {
    expect(getRangeSlug({ name: 'Ace Archery', city: 'Austin', state: 'Texas' } as any)).toBe('ace-archery-austin-texas');
  });
  it('removes special characters', () => {
    expect(getRangeSlug({ name: "Jim's Archery", city: 'Dallas', state: 'Texas' } as any)).toBe('jims-archery-dallas-texas');
  });
  it('collapses multiple hyphens', () => {
    expect(getRangeSlug({ name: 'A & B Archery', city: 'Austin', state: 'Texas' } as any)).toBe('a-b-archery-austin-texas');
  });
});
