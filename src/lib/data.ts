// Build-time data access for Astro pages. Data files are validated by
// scripts/validate-data.mjs before every build.
import statementsJson from '../data/statements.json';
import racesJson from '../data/races.json';
import type { Likert, SourceType } from './match';

export interface Sourced { text: string; source_url: string }
export interface Position {
  statement: string;
  value: Likert;
  source_type: SourceType;
  source_url: string;
  source_title: string;
  date: string;
  quote: string;
  note?: string;
  via?: string;
}
export interface Candidate {
  id: string;
  name: string;
  race: string;
  party: string;
  incumbent: boolean;
  profile: 'full' | 'short';
  website: string | null;
  running_mate?: { name: string; summary: Sourced[] };
  summary: Sourced[];
  experience: Sourced[];
  education_focus?: Sourced[];
  record: { kind: 'recorded_vote' | 'sponsored_bill' | 'decision'; title: string; date: string | null; detail: string; source_url: string; via?: string }[];
  positions: Position[];
  endorsements: { name: string; source_url: string }[];
  finance: null | { raised: number | null; spent: number | null; cash_on_hand: number | null; as_of: string; source_url: string; source_name: string; note?: string };
  sources: { title: string; url: string; accessed: string }[];
  last_checked: string;
  research_notes?: string;
  verification?: { checked: string; positions_verified: number; positions_unverifiable: number; detail?: Record<string, string> };
}
export interface Party { name: string; detail: string; source_url: string }
export interface Measure {
  id: string;
  label: string;
  title: string;
  changes: string;
  origin: string;
  threshold: '55 percent' | 'majority';
  ballot_title: string;
  yes_means: string;
  no_means: string;
  summary: string[];
  arguments_for: string[];
  arguments_against: string[];
  fiscal_impact: string[];
  blue_book_pages: string;
  behind_it: { proponents: Party[]; opponents: Party[]; notes: string };
  applies_to?: string;
  counties?: string[];
  counties_source_url?: string;
  sources: { title: string; url: string; accessed: string }[];
  last_checked: string;
}
export interface Statement {
  id: string;
  axis: 'economic' | 'social' | 'governance';
  topic: string;
  text: string;
  measures: { id: string; agree_means: 'yes' | 'no' }[];
  coding_guide: string;
}
export interface RosterEntry { id: string; name: string; party: string; incumbent: boolean; profile: 'full' | 'short'; running_mate?: string }
export interface Race {
  id: string;
  office: string;
  short: string;
  scope: 'statewide' | 'congressional';
  district?: number;
  tier: 'A' | 'B';
  about: string;
  candidates: RosterEntry[];
}

export const statements = statementsJson as Statement[];
export const racesFile = racesJson as unknown as { source: string; order_source: string; certified: string; last_checked: string; note: string; races: Race[] };
export const races = racesFile.races;

const candidateModules = import.meta.glob<Candidate>('../data/candidates/*.json', { eager: true, import: 'default' });
export const candidates: Candidate[] = Object.values(candidateModules);
export const candidateById = new Map(candidates.map((c) => [c.id, c]));

const measureModules = import.meta.glob<Measure>('../data/measures/*.json', { eager: true, import: 'default' });
const MEASURE_ORDER = [
  'amendment-81', 'amendment-82', 'amendment-83', 'amendment-84', 'amendment-85', 'amendment-86', 'amendment-87',
  'proposition-nn', 'proposition-132', 'proposition-133', 'proposition-134', 'proposition-135', 'proposition-136', 'proposition-137',
];
const allMeasures = Object.values(measureModules);
export const measures: Measure[] = MEASURE_ORDER.map((id) => allMeasures.find((m) => m.id === id)).filter((m): m is Measure => !!m);
export const localMeasures: Measure[] = allMeasures.filter((m) => !MEASURE_ORDER.includes(m.id));
export const measureById = new Map(allMeasures.map((m) => [m.id, m]));

export const statementById = new Map(statements.map((s) => [s.id, s]));
export const raceById = new Map(races.map((r) => [r.id, r]));

export function candidatesFor(race: Race): Candidate[] {
  return race.candidates.map((r) => candidateById.get(r.id)).filter((c): c is Candidate => !!c);
}

export function statementsForMeasure(id: string): (Statement & { agree_means: 'yes' | 'no' })[] {
  return statements.flatMap((s) => s.measures.filter((m) => m.id === id).map((m) => ({ ...s, agree_means: m.agree_means })));
}

/** Compact data the results page needs in the browser. */
export function clientData() {
  return {
    statements: statements.map((s) => ({ id: s.id, text: s.text, measures: s.measures })),
    races: races.map((r) => ({
      id: r.id,
      office: r.office,
      short: r.short,
      scope: r.scope,
      district: r.district ?? null,
      tier: r.tier,
      candidates: candidatesFor(r).map((c) => ({
        id: c.id,
        name: c.name,
        party: c.party,
        incumbent: c.incumbent,
        runningMate: c.running_mate?.name ?? null,
        positions: c.positions.map((p) => ({ statement: p.statement, value: p.value, source_type: p.source_type })),
      })),
    })),
    measures: [...measures, ...localMeasures].map((m) => ({ id: m.id, label: m.label, counties: m.counties ?? null })),
  };
}
