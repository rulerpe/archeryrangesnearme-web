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
  it('generates state title with abbreviation', () => {
    expect(makeTitle('state', { state: 'Texas', count: 120 }))
      .toBe('Archery Ranges in Texas | TX Ranges & Clubs');
  });
  it('generates feature+state title', () => {
    expect(makeTitle('feature', { featureLabel: 'Indoor', state: 'Texas' }))
      .toBe('Indoor Archery Ranges in Texas | All Locations');
  });
  it('generates global feature title (no state)', () => {
    expect(makeTitle('feature', { featureLabel: 'Indoor' }))
      .toBe('Indoor Archery Ranges | All Locations');
  });
  it('generates homepage title', () => {
    expect(makeTitle('home', {}))
      .toBe('Archery Ranges Near Me | Find Local Ranges');
  });
  it('generates New York abbreviation correctly', () => {
    expect(makeTitle('state', { state: 'New York', count: 50 }))
      .toBe('Archery Ranges in New York | NY Ranges & Clubs');
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
  it('generates city description with count', () => {
    const d = makeDescription('city', { city: 'Austin', state: 'TX', count: 7 });
    expect(d).toContain('7');
    expect(d).toContain('Austin');
    expect(d).toContain('TX');
  });
  it('generates state description with count', () => {
    const d = makeDescription('state', { state: 'Texas', count: 120 });
    expect(d).toContain('120');
    expect(d).toContain('Texas');
  });
  it('generates feature description with state', () => {
    const d = makeDescription('feature', { featureLabel: 'Indoor', state: 'Texas' });
    expect(d).toContain('Texas');
    expect(d).toContain('indoor');
  });
  it('generates global feature description without state', () => {
    const d = makeDescription('feature', { featureLabel: 'Indoor' });
    expect(d).not.toContain('undefined');
    expect(d).toContain('indoor');
  });
  it('generates homepage description', () => {
    const d = makeDescription('home', {});
    expect(d).toBeTruthy();
    expect(d.length).toBeGreaterThan(50);
  });
});
