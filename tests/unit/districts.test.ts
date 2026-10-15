import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
// @ts-expect-error plain JS serverless function
import { parseCensus } from '../../api/districts.js';

const capitol = JSON.parse(readFileSync(new URL('../fixtures/census-capitol.json', import.meta.url), 'utf8'));

describe('parseCensus', () => {
  it('reads districts and county from a real Census Geocoder response (Colorado State Capitol)', () => {
    const r = parseCensus(capitol);
    expect(r.found).toBe(true);
    expect(r.districts).toEqual({ cd: 1, sd: 31, hd: 6, county: 'Denver' });
  });

  it('reports no match', () => {
    expect(parseCensus({ result: { addressMatches: [] } })).toEqual({ found: false, reason: 'no-match' });
  });

  it('rejects addresses outside Colorado', () => {
    const wy = structuredClone(capitol);
    wy.result.addressMatches[0].geographies.States[0].STATE = '56';
    expect(parseCensus(wy).reason).toBe('not-colorado');
  });
});
