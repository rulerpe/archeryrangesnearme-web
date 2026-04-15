type PageType = 'listing' | 'city' | 'state' | 'feature' | 'home';

function fmt(n: number | string): string {
  return typeof n === 'number' ? n.toLocaleString() : n;
}

function locations(n: number): string {
  return n === 1 ? '1 Location' : `${fmt(n)} Locations`;
}

function rangesPhrase(n: number): string {
  return n === 1 ? '1 archery range' : `${fmt(n)} archery ranges`;
}

function fixStateName(s: string): string {
  return s.replace(/\bOf\b/g, 'of');
}

export function makeTitle(type: PageType, params: Record<string, any>): string {
  switch (type) {
    case 'listing':
      return `${params.name} — Archery Range in ${params.city}, ${fixStateName(params.state)}`;
    case 'city':
      return `Archery Ranges in ${params.city}, ${fixStateName(params.state)} | ${fmt(params.count)} Near You`;
    case 'state':
      return `Archery Ranges in ${fixStateName(params.state)} — ${locations(params.count)}`;
    case 'feature': {
      const phrase = params.featureTitle ?? params.featureLabel;
      return params.state
        ? `${phrase} in ${fixStateName(params.state)} — ${locations(params.count)}`
        : `${phrase} Near You — ${locations(params.count)}`;
    }
    case 'home':
      return `Archery Range Near Me — ${fmt(params.count)}+ Ranges in All 50 States`;
  }
}

export function makeDescription(type: PageType, params: Record<string, any>): string {
  switch (type) {
    case 'listing': {
      const facility = params.indoorOutdoor
        ? `${capitalize(params.indoorOutdoor)} archery range`
        : 'Archery range';
      return `${params.name} is an archery range in ${params.city}, ${fixStateName(params.state)}. ${facility}. See hours, directions, pricing & services.`;
    }
    case 'city':
      return `Browse ${rangesPhrase(params.count)} in ${params.city}, ${fixStateName(params.state)}. Compare hours, pricing, indoor/outdoor lanes, lessons & equipment rental.`;
    case 'state':
      return `Find ${rangesPhrase(params.count)} across ${fixStateName(params.state)}. Browse by city — indoor, outdoor, 3D courses, lessons & pro shops.`;
    case 'feature': {
      const phrase = (params.featureTitle ?? params.featureLabel ?? '').toLowerCase();
      const loc = params.count === 1 ? '1 location' : `${fmt(params.count)} locations`;
      return params.state
        ? `Find ${phrase} in ${fixStateName(params.state)}. Browse ${loc} — compare hours, pricing & services.`
        : `Find ${phrase} near you. Browse ${loc} across all 50 states — compare hours, pricing & services.`;
    }
    case 'home':
      return `Find an archery range near you in seconds — browse ${fmt(params.count)}+ U.S. ranges with hours, directions, pricing, indoor/outdoor lanes, 3D courses, lessons & pro shops.`;
  }
}

const STATE_ABBRS: Record<string, string> = {
  Alabama: 'AL', Alaska: 'AK', Arizona: 'AZ', Arkansas: 'AR', California: 'CA',
  Colorado: 'CO', Connecticut: 'CT', Delaware: 'DE', Florida: 'FL', Georgia: 'GA',
  Hawaii: 'HI', Idaho: 'ID', Illinois: 'IL', Indiana: 'IN', Iowa: 'IA',
  Kansas: 'KS', Kentucky: 'KY', Louisiana: 'LA', Maine: 'ME', Maryland: 'MD',
  Massachusetts: 'MA', Michigan: 'MI', Minnesota: 'MN', Mississippi: 'MS',
  Missouri: 'MO', Montana: 'MT', Nebraska: 'NE', Nevada: 'NV', 'New Hampshire': 'NH',
  'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC',
  'North Dakota': 'ND', Ohio: 'OH', Oklahoma: 'OK', Oregon: 'OR', Pennsylvania: 'PA',
  'Rhode Island': 'RI', 'South Carolina': 'SC', 'South Dakota': 'SD', Tennessee: 'TN',
  Texas: 'TX', Utah: 'UT', Vermont: 'VT', Virginia: 'VA', Washington: 'WA',
  'West Virginia': 'WV', Wisconsin: 'WI', Wyoming: 'WY',
};

function stateAbbr(state: string): string {
  return STATE_ABBRS[state] ?? state.substring(0, 2).toUpperCase();
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
