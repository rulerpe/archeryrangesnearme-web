import type { Range } from './types';

export interface Feature {
  slug: string;
  label: string;
  filter: (r: Range) => boolean;
}

export const FEATURES: Feature[] = [
  { slug: 'indoor',           label: 'Indoor',           filter: r => r.indoor_outdoor === 'indoor' },
  { slug: 'outdoor',          label: 'Outdoor',          filter: r => r.indoor_outdoor === 'outdoor' },
  { slug: 'with-lessons',     label: 'Lessons',          filter: r => r.offers_lessons === true },
  { slug: 'with-rental',      label: 'Equipment Rental', filter: r => r.offers_rental === true },
  { slug: 'with-pro-shop',    label: 'Pro Shop',         filter: r => r.has_pro_shop === true },
  { slug: 'with-3d-course',   label: '3D Course',        filter: r => r.has_3d_course === true },
  { slug: 'with-leagues',     label: 'Leagues',          filter: r => r.has_leagues === true },
  { slug: 'with-tournaments', label: 'Tournaments',      filter: r => r.has_tournaments === true },
  { slug: 'walk-in',          label: 'Walk-in Welcome',  filter: r => r.walk_in === true },
];

export function getFeatureLabel(slug: string): string {
  return FEATURES.find(f => f.slug === slug)?.label ?? slug;
}

export function filterByFeature(ranges: Range[], featureSlug: string): Range[] {
  const feature = FEATURES.find(f => f.slug === featureSlug);
  if (!feature) return [];
  return ranges.filter(feature.filter);
}
