import Papa from 'papaparse';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import type { Range } from './types';

export function parseBoolean(value: string | undefined): boolean | null {
  if (value === 'True') return true;
  if (value === 'False') return false;
  return null;
}

export function parseNumber(value: string | undefined): number | null {
  if (!value || value.trim() === '') return null;
  const n = Number(value);
  return isNaN(n) ? null : n;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getStateSlug(state: string): string {
  return slugify(state);
}

export function getCitySlug(city: string): string {
  return slugify(city);
}

export function getRangeSlug(range: Pick<Range, 'name' | 'city' | 'state'>): string {
  return slugify(`${range.name} ${range.city} ${range.state}`);
}

let _ranges: Range[] | null = null;

export function parseRanges(): Range[] {
  if (_ranges) return _ranges;

  const csvPath = resolve(process.cwd(), 'src/data/ranges.csv');
  const raw = readFileSync(csvPath, 'utf-8');

  const { data } = Papa.parse<Record<string, string>>(raw, {
    header: true,
    skipEmptyLines: true,
  });

  _ranges = data.map((row) => ({
    name: row.name ?? '',
    place_id: row.place_id ?? '',
    full_address: row.full_address ?? '',
    city: row.city ?? '',
    state: row.state ?? '',
    zip_code: row.zip_code ?? '',
    latitude: parseNumber(row.latitude),
    longitude: parseNumber(row.longitude),
    phone: row.phone ?? '',
    website: row.website ?? '',
    google_rating: parseNumber(row.google_rating),
    review_count: parseNumber(row.review_count),
    category: row.category ?? '',
    working_hours: row.working_hours ?? '',
    business_status: row.business_status ?? '',
    verification_status: row.verification_status ?? '',
    indoor_outdoor: (row.indoor_outdoor || null) as Range['indoor_outdoor'],
    num_lanes: parseNumber(row.num_lanes),
    max_distance_yards: parseNumber(row.max_distance_yards),
    walk_in: parseBoolean(row.walk_in),
    membership_available: parseBoolean(row.membership_available),
    wheelchair_accessible: parseBoolean(row.wheelchair_accessible),
    offers_lessons: parseBoolean(row.offers_lessons),
    offers_rental: parseBoolean(row.offers_rental),
    offers_repair: parseBoolean(row.offers_repair),
    has_leagues: parseBoolean(row.has_leagues),
    has_tournaments: parseBoolean(row.has_tournaments),
    has_3d_course: parseBoolean(row.has_3d_course),
    has_birthday_parties: parseBoolean(row.has_birthday_parties),
    has_pro_shop: parseBoolean(row.has_pro_shop),
    bow_types: row.bow_types ?? '',
    brands_carried: row.brands_carried ?? '',
    offers_arrow_building: parseBoolean(row.offers_arrow_building),
    range_fee: row.range_fee ?? '',
    lesson_pricing: row.lesson_pricing ?? '',
    membership_pricing: row.membership_pricing ?? '',
    rental_pricing: row.rental_pricing ?? '',
    reservation_required: parseBoolean(row.reservation_required),
    age_restrictions: row.age_restrictions ?? '',
    whats_included: row.whats_included ?? '',
  }));

  return _ranges;
}

export function getRangesByState(): Map<string, Range[]> {
  const map = new Map<string, Range[]>();
  for (const range of parseRanges()) {
    const slug = getStateSlug(range.state);
    if (!map.has(slug)) map.set(slug, []);
    map.get(slug)!.push(range);
  }
  return map;
}

export function getRangesByCity(stateSlug: string): Map<string, Range[]> {
  const stateRanges = getRangesByState().get(stateSlug) ?? [];
  const map = new Map<string, Range[]>();
  for (const range of stateRanges) {
    const slug = getCitySlug(range.city);
    if (!map.has(slug)) map.set(slug, []);
    map.get(slug)!.push(range);
  }
  return map;
}
