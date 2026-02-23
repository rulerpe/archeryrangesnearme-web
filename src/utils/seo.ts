type PageType = 'listing' | 'city' | 'state' | 'feature' | 'home';

export function makeTitle(type: PageType, params: Record<string, any>): string {
  switch (type) {
    case 'listing':
      return `${params.name} — Archery Range in ${params.city}, ${params.state}`;
    case 'city':
      return `Archery Ranges in ${params.city}, ${params.state} | ${params.count} Near You`;
    case 'state':
      return `Archery Ranges in ${params.state} | ${stateAbbr(params.state)} Ranges & Clubs`;
    case 'feature':
      return params.state
        ? `${params.featureLabel} Archery Ranges in ${params.state} | All Locations`
        : `${params.featureLabel} Archery Ranges | All Locations`;
    case 'home':
      return 'Archery Ranges Near Me | Find Local Ranges';
  }
}

export function makeDescription(type: PageType, params: Record<string, any>): string {
  switch (type) {
    case 'listing': {
      const facility = params.indoorOutdoor
        ? `${capitalize(params.indoorOutdoor)} archery range`
        : 'Archery range';
      return `${params.name} is an archery range in ${params.city}, ${params.state}. ${facility}. See hours, directions, pricing & services.`;
    }
    case 'city':
      return `Browse ${params.count} archery ranges in ${params.city}, ${params.state}. Compare hours, pricing, indoor/outdoor lanes, lessons & equipment rental.`;
    case 'state':
      return `Find ${params.count} archery ranges across ${params.state}. Browse by city — indoor, outdoor, 3D courses, lessons & pro shops.`;
    case 'feature':
      return params.state
        ? `Browse all ${params.featureLabel.toLowerCase()} archery ranges in ${params.state}. Filter by city, compare hours, pricing & services.`
        : `Browse all ${params.featureLabel.toLowerCase()} archery ranges across the US. Find locations, hours, pricing & services.`;
    case 'home':
      return 'Find archery ranges near you across the US. Search by state and city — compare indoor, outdoor, 3D courses, lessons & pro shops.';
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
