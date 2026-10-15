// Data schema for the guide. `npm run build` runs validate-data.mjs first, so
// a file that breaks these rules stops the deploy.
import { z } from 'zod';

const url = z.string().regex(/^https?:\/\/\S+$/, 'must be an http(s) URL');
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'must be YYYY-MM-DD');
const sourced = z.object({ text: z.string().min(1), source_url: url }).strict();

export const SOURCE_TYPES = [
  'recorded_vote',
  'sponsored_bill',
  'questionnaire',
  'direct_statement',
  'interest_group_rating',
  'inferred',
];

export const statementSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    axis: z.enum(['economic', 'social', 'governance']),
    topic: z.string().min(1),
    text: z.string().min(10),
    measures: z.array(z.object({ id: z.string(), agree_means: z.enum(['yes', 'no']) }).strict()),
    coding_guide: z.string().min(10),
  })
  .strict();

const rosterCandidate = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    name: z.string().min(1),
    party: z.string().min(1),
    incumbent: z.boolean(),
    profile: z.enum(['full', 'short']),
    running_mate: z.string().optional(),
  })
  .strict();

export const racesSchema = z
  .object({
    source: url,
    order_source: url,
    certified: date,
    last_checked: date,
    note: z.string(),
    races: z.array(
      z
        .object({
          id: z.string().regex(/^[a-z0-9-]+$/),
          office: z.string(),
          short: z.string(),
          scope: z.enum(['statewide', 'congressional']),
          district: z.number().int().min(1).max(8).optional(),
          tier: z.enum(['A', 'B']),
          about: z.string(),
          candidates: z.array(rosterCandidate).min(1),
        })
        .strict(),
    ),
  })
  .strict();

export const positionSchema = z
  .object({
    statement: z.string(),
    value: z.number().int().min(1).max(5),
    source_type: z.enum(SOURCE_TYPES),
    source_url: url,
    source_title: z.string().min(1),
    date: date,
    quote: z.string().min(10),
    note: z.string().optional(),
    via: z.string().optional(),
  })
  .strict()
  .refine((p) => !['inferred', 'interest_group_rating'].includes(p.source_type) || (p.value >= 2 && p.value <= 4), {
    message: 'inferred and interest-group positions must be coded 2 to 4',
  });

export const candidateSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    name: z.string().min(1),
    race: z.string(),
    party: z.string(),
    incumbent: z.boolean(),
    profile: z.enum(['full', 'short']),
    website: url.nullable(),
    running_mate: z.object({ name: z.string(), summary: z.array(sourced) }).strict().optional(),
    summary: z.array(sourced).min(1),
    experience: z.array(sourced),
    education_focus: z.array(sourced).optional(),
    record: z.array(
      z
        .object({
          kind: z.enum(['recorded_vote', 'sponsored_bill', 'decision']),
          title: z.string().min(1),
          date: date.nullable(),
          detail: z.string(),
          source_url: url,
          via: z.string().optional(),
        })
        .strict(),
    ),
    positions: z.array(positionSchema),
    endorsements: z.array(z.object({ name: z.string().min(1), source_url: url }).strict()),
    finance: z
      .object({
        raised: z.number().int().nullable(),
        spent: z.number().int().nullable(),
        cash_on_hand: z.number().int().nullable(),
        as_of: date,
        source_url: url,
        source_name: z.string(),
        note: z.string().optional(),
      })
      .strict()
      .nullable(),
    sources: z.array(z.object({ title: z.string(), url, accessed: date }).strict()).min(1),
    last_checked: date,
    research_notes: z.string().optional(),
    verification: z
      .object({
        checked: date,
        positions_verified: z.number().int(),
        positions_unverifiable: z.number().int(),
        detail: z.record(z.string(), z.enum(['found', 'not-found', 'unreachable', 'not-checked'])).optional(),
      })
      .strict()
      .optional(),
  })
  .strict();

const party = z.object({ name: z.string().min(1), detail: z.string(), source_url: url }).strict();

export const measureSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    label: z.string(),
    title: z.string(),
    changes: z.enum(['constitution', 'statute', 'constitution and statute']),
    origin: z.string(),
    threshold: z.enum(['55 percent', 'majority']),
    ballot_title: z.string().min(10),
    yes_means: z.string(),
    no_means: z.string(),
    summary: z.array(z.string().min(1)).min(1),
    arguments_for: z.array(z.string().min(1)),
    arguments_against: z.array(z.string().min(1)),
    fiscal_impact: z.array(z.string().min(1)),
    blue_book_pages: z.string(),
    behind_it: z.object({ proponents: z.array(party), opponents: z.array(party), notes: z.string() }).strict(),
    applies_to: z.string().optional(),
    counties: z.array(z.string()).optional(),
    counties_source_url: url.optional(),
    sources: z.array(z.object({ title: z.string(), url, accessed: date }).strict()).min(1),
    last_checked: date,
    research_notes: z.string().optional(),
  })
  .strict();
