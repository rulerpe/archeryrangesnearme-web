import { describe, it, expect } from 'vitest';
import { makeTitle, makeDescription } from './seo';

describe('makeTitle', () => {
  it('generates listing title', () => {
    expect(makeTitle('listing', { name: 'Ace Archery', city: 'Austin', state: 'TX' }))
      .toBe('Ace Archery — Archery Range in Austin, TX');
  });
  it('generates city title', () => {
    expect(makeTitle('city', { city: 'Austin', state: 'TX', count: 5 }))
      .toBe('Archery Ranges in Austin, TX | 5 Near You');
  });
  it('generates state title with count', () => {
    expect(makeTitle('state', { state: 'Texas', count: 120 }))
      .toBe('Archery Ranges in Texas — 120 Locations');
  });
  it('pluralizes singular state count correctly', () => {
    expect(makeTitle('state', { state: 'District Of Columbia', count: 1 }))
      .toBe('Archery Ranges in District of Columbia — 1 Location');
  });
  it('generates feature+state title', () => {
    expect(makeTitle('feature', { featureTitle: 'Indoor Archery Ranges', state: 'Texas', count: 45 }))
      .toBe('Indoor Archery Ranges in Texas — 45 Locations');
  });
  it('generates global feature title (no state)', () => {
    expect(makeTitle('feature', { featureTitle: 'Indoor Archery Ranges', count: 1200 }))
      .toBe('Indoor Archery Ranges Near You — 1,200 Locations');
  });
  it('generates homepage title', () => {
    expect(makeTitle('home', { count: 2900 }))
      .toBe('Archery Range Near Me — 2,900+ Ranges in All 50 States');
  });
  it('generates New York state title with count', () => {
    expect(makeTitle('state', { state: 'New York', count: 50 }))
      .toBe('Archery Ranges in New York — 50 Locations');
  });
});

describe('makeDescription', () => {
  it('generates listing description containing name and location', () => {
    const d = makeDescription('listing', { name: 'Ace Archery', city: 'Austin', state: 'TX', indoorOutdoor: 'indoor' });
    expect(d).toContain('Ace Archery');
    expect(d).toContain('Austin, TX');
    expect(d).toContain('Indoor');
  });
  it('generates listing description without indoorOutdoor when null', () => {
    const d = makeDescription('listing', { name: 'Ace Archery', city: 'Austin', state: 'TX', indoorOutdoor: null });
    expect(d).toContain('Ace Archery');
    expect(d).toContain('Austin, TX');
  });
  it('generates city description with count and pluralizes', () => {
    const d = makeDescription('city', { city: 'Austin', state: 'TX', count: 7 });
    expect(d).toContain('7 archery ranges');
    expect(d).toContain('Austin');
  });
  it('singularizes city description for count of 1', () => {
    const d = makeDescription('city', { city: 'Smallville', state: 'IA', count: 1 });
    expect(d).toContain('1 archery range in Smallville');
    expect(d).not.toContain('1 archery ranges');
  });
  it('generates state description with count', () => {
    const d = makeDescription('state', { state: 'Texas', count: 120 });
    expect(d).toContain('120 archery ranges');
    expect(d).toContain('Texas');
  });
  it('lowercases "Of" in state names', () => {
    const d = makeDescription('state', { state: 'District Of Columbia', count: 5 });
    expect(d).toContain('District of Columbia');
    expect(d).not.toContain('District Of Columbia');
  });
  it('generates feature description with state', () => {
    const d = makeDescription('feature', { featureTitle: 'Indoor Archery Ranges', state: 'Texas', count: 45 });
    expect(d).toContain('Texas');
    expect(d).toContain('indoor archery ranges');
    expect(d).toContain('45 locations');
  });
  it('singularizes feature description for count of 1', () => {
    const d = makeDescription('feature', { featureTitle: 'Archery Lessons', state: 'Texas', count: 1 });
    expect(d).toContain('1 location');
    expect(d).not.toContain('1 locations');
  });
  it('generates global feature description without state', () => {
    const d = makeDescription('feature', { featureTitle: 'Indoor Archery Ranges', count: 1200 });
    expect(d).not.toContain('undefined');
    expect(d).toContain('indoor archery ranges');
    expect(d).toContain('1,200 locations');
  });
  it('generates homepage description', () => {
    const d = makeDescription('home', { count: 2900 });
    expect(d).toBeTruthy();
    expect(d).toContain('2,900+');
    expect(d.length).toBeGreaterThan(50);
  });
});
