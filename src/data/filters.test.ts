import { describe, it, expect } from 'vitest';
import { FEATURES, getFeatureLabel, filterByFeature } from './filters';

describe('FEATURES', () => {
  it('has indoor feature', () => {
    expect(FEATURES.find(f => f.slug === 'indoor')).toBeDefined();
  });
  it('has outdoor feature', () => {
    expect(FEATURES.find(f => f.slug === 'outdoor')).toBeDefined();
  });
  it('has exactly 9 features', () => {
    expect(FEATURES).toHaveLength(9);
  });
  it('every feature has slug, label, and filter function', () => {
    for (const f of FEATURES) {
      expect(f.slug).toBeTruthy();
      expect(f.label).toBeTruthy();
      expect(typeof f.filter).toBe('function');
    }
  });
});

describe('getFeatureLabel', () => {
  it('returns label for known slug', () => {
    expect(getFeatureLabel('indoor')).toBe('Indoor');
  });
  it('returns slug itself for unknown slug', () => {
    expect(getFeatureLabel('unknown-slug')).toBe('unknown-slug');
  });
});

describe('filterByFeature', () => {
  const base = {
    indoor_outdoor: 'indoor',
    offers_lessons: true,
    offers_rental: false,
    has_pro_shop: null,
    has_3d_course: true,
    has_leagues: false,
    has_tournaments: null,
    walk_in: true,
    has_birthday_parties: false,
    offers_repair: false,
    offers_arrow_building: null,
  } as any;

  it('filters indoor correctly', () => {
    expect(filterByFeature([base], 'indoor')).toHaveLength(1);
  });
  it('filters outdoor correctly - excludes indoor', () => {
    expect(filterByFeature([base], 'outdoor')).toHaveLength(0);
  });
  it('filters with-lessons correctly', () => {
    expect(filterByFeature([base], 'with-lessons')).toHaveLength(1);
  });
  it('excludes false boolean values', () => {
    expect(filterByFeature([base], 'with-rental')).toHaveLength(0);
  });
  it('excludes null boolean values', () => {
    expect(filterByFeature([base], 'with-pro-shop')).toHaveLength(0);
  });
  it('includes walk-in', () => {
    expect(filterByFeature([base], 'walk-in')).toHaveLength(1);
  });
  it('returns empty array for unknown feature slug', () => {
    expect(filterByFeature([base], 'nonexistent')).toHaveLength(0);
  });
});
