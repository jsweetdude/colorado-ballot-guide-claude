// POST /api/districts  { "address": "200 E Colfax Ave, Denver, CO 80203" }
//
// Looks up the congressional, state Senate and state House districts and the
// county for a Colorado street address with the U.S. Census Geocoder (free, no
// key). The address arrives in the request body, never the URL, so it does not
// appear in request logs, and this function never logs or stores it.

const CENSUS = 'https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress';

function pick(geographies, test) {
  const key = Object.keys(geographies).find(test);
  return key && geographies[key]?.[0] ? geographies[key][0] : null;
}

function districtNumber(feature) {
  if (!feature) return null;
  const n = Number.parseInt(feature.BASENAME ?? feature.CD119 ?? feature.CD120 ?? '', 10);
  return Number.isFinite(n) ? n : null;
}

export function parseCensus(json) {
  const match = json?.result?.addressMatches?.[0];
  if (!match) return { found: false, reason: 'no-match' };
  const g = match.geographies ?? {};
  const state = pick(g, (k) => k === 'States');
  if (state && state.STATE !== '08') return { found: false, reason: 'not-colorado' };
  const cd = districtNumber(pick(g, (k) => /Congressional Districts/i.test(k)));
  const sd = districtNumber(pick(g, (k) => /Legislative Districts - Upper/i.test(k)));
  const hd = districtNumber(pick(g, (k) => /Legislative Districts - Lower/i.test(k)));
  const countyFeature = pick(g, (k) => k === 'Counties');
  const county = countyFeature?.BASENAME ?? null;
  return { found: true, matchedAddress: match.matchedAddress ?? null, districts: { cd, sd, hd, county } };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Use POST with a JSON body: {"address": "..."}' });
  }
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = null;
    }
  }
  const address = typeof body?.address === 'string' ? body.address.trim() : '';
  if (address.length < 5 || address.length > 200) {
    return res.status(400).json({ error: 'Enter a street address, city and ZIP code.' });
  }
  const url = new URL(CENSUS);
  url.searchParams.set('address', /\b(CO|Colorado)\b/i.test(address) ? address : `${address}, CO`);
  url.searchParams.set('benchmark', 'Public_AR_Current');
  url.searchParams.set('vintage', 'Current_Current');
  url.searchParams.set('format', 'json');
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(12000), headers: { Accept: 'application/json' } });
    if (!r.ok) return res.status(502).json({ error: 'The Census address service did not respond. Pick your districts below instead.' });
    const result = parseCensus(await r.json());
    if (!result.found) {
      const msg =
        result.reason === 'not-colorado'
          ? 'That address is not in Colorado.'
          : 'The Census service could not find that address. Check the spelling, or pick your districts below.';
      return res.status(200).json({ found: false, error: msg });
    }
    return res.status(200).json(result);
  } catch {
    return res.status(504).json({ error: 'The Census address service timed out. Try again, or pick your districts below.' });
  }
}
