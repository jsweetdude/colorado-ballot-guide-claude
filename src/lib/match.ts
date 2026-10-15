// Matching, confidence and measure-lean math. Pure functions, no DOM, so the
// results page and the unit tests run exactly the same code. The About page
// documents these formulas; keep the two in step.

export type Likert = 1 | 2 | 3 | 4 | 5;
export type Importance = 'low' | 'normal' | 'high';
export interface Answer { value: Likert | null; importance: Importance }
export type Answers = Record<string, Answer | undefined>;

export type SourceType =
  | 'recorded_vote'
  | 'sponsored_bill'
  | 'questionnaire'
  | 'direct_statement'
  | 'interest_group_rating'
  | 'inferred';

export interface Position { statement: string; value: Likert; source_type: SourceType }
export interface MatchCandidate { id: string; positions: Position[] }

export const IMPORTANCE_WEIGHT: Record<Importance, number> = { low: 0.5, normal: 1, high: 2 };

// How much a source counts toward confidence. The candidate's own record or
// words are full weight; a third party's rating is partial; an inference is low.
export const SOURCE_QUALITY: Record<SourceType, number> = {
  recorded_vote: 1,
  sponsored_bill: 1,
  questionnaire: 1,
  direct_statement: 1,
  interest_group_rating: 0.6,
  inferred: 0.3,
};

export const SOURCE_LABEL: Record<SourceType, string> = {
  recorded_vote: 'Recorded vote',
  sponsored_bill: 'Sponsored bill',
  questionnaire: 'Questionnaire answer',
  direct_statement: 'Direct statement',
  interest_group_rating: 'Interest-group rating',
  inferred: 'Inferred',
};

export const MAX_STEPS = 4;

/** Thresholds, exported so the About page prints the real numbers. */
export const CONFIDENCE_RULES = {
  high: { coverage: 0.6, quality: 0.85, margin: 10, minOverlap: 5 },
  medium: { coverage: 1 / 3, quality: 0.6, margin: 4, minOverlap: 3 },
  /** A candidate is ranked only if known on at least this share of the visitor's answers. */
  rankableShare: 1 / 3,
  rankableMinimum: 2,
};

export interface StatementResult {
  statement: string;
  visitor: Likert;
  candidate: Likert;
  steps: number;
  weight: number;
  points: number;
  sourceType: SourceType;
}

export interface CandidateMatch {
  id: string;
  /** M: statements the visitor answered (not skipped). */
  answered: number;
  /** N: of those, statements where the candidate's position is known. */
  overlap: number;
  score: number;
  maxScore: number;
  /** 0 to 100, rounded; null when there is no overlap. */
  percent: number | null;
  coverage: number;
  quality: number | null;
  rankable: boolean;
  details: StatementResult[];
}

export type Confidence = 'High' | 'Medium' | 'Low';

export interface RankedCandidate extends CandidateMatch {
  rank: number | null;
  top: boolean;
  tie: boolean;
  margin: number | null;
  confidence: Confidence | null;
}

export function answeredStatements(answers: Answers): string[] {
  return Object.keys(answers).filter((id) => answers[id]?.value != null);
}

/**
 * score = sum over shared statements of weight x (4 - |steps apart|) / 4
 * percent = score / sum of weights on those statements
 */
export function matchCandidate(answers: Answers, candidate: MatchCandidate): CandidateMatch {
  const answered = answeredStatements(answers);
  const known = new Map(candidate.positions.map((p) => [p.statement, p]));
  const details: StatementResult[] = [];
  let score = 0;
  let maxScore = 0;
  for (const id of answered) {
    const a = answers[id]!;
    const p = known.get(id);
    if (!p || a.value == null) continue;
    const weight = IMPORTANCE_WEIGHT[a.importance] ?? 1;
    const steps = Math.abs(a.value - p.value);
    const points = (weight * (MAX_STEPS - steps)) / MAX_STEPS;
    score += points;
    maxScore += weight;
    details.push({ statement: id, visitor: a.value, candidate: p.value, steps, weight, points, sourceType: p.source_type });
  }
  const overlap = details.length;
  const m = answered.length;
  const quality = overlap ? details.reduce((s, d) => s + SOURCE_QUALITY[d.sourceType], 0) / overlap : null;
  const coverage = m ? overlap / m : 0;
  const rankable =
    overlap >= CONFIDENCE_RULES.rankableMinimum && overlap >= m * CONFIDENCE_RULES.rankableShare;
  return {
    id: candidate.id,
    answered: m,
    overlap,
    score,
    maxScore,
    percent: maxScore > 0 ? Math.round((score / maxScore) * 100) : null,
    coverage,
    quality,
    rankable,
    details,
  };
}

export function confidenceFor(m: CandidateMatch, margin: number | null): Confidence {
  const marginOk = (min: number) => margin == null || margin >= min;
  const q = m.quality ?? 0;
  const h = CONFIDENCE_RULES.high;
  if (m.coverage >= h.coverage && q >= h.quality && marginOk(h.margin) && m.overlap >= h.minOverlap) return 'High';
  const md = CONFIDENCE_RULES.medium;
  if (m.coverage >= md.coverage && q >= md.quality && marginOk(md.margin) && m.overlap >= md.minOverlap) return 'Medium';
  return 'Low';
}

/**
 * Ranks a race. Rankable candidates are sorted by percent (ties keep ballot
 * order). Margin is the distance to the nearest ranked neighbor, so a close
 * race lowers confidence for both candidates. Unranked candidates follow in
 * ballot order with rank and confidence null. When `relevant` is given, only
 * those statements count (used for attorney general, secretary of state and
 * treasurer, whose duties touch a subset of the interview).
 */
export function rankRace(answers: Answers, candidates: MatchCandidate[], relevant?: string[]): RankedCandidate[] {
  // For offices whose work touches only some statements, match on those alone.
  const scoped = relevant ? Object.fromEntries(Object.entries(answers).filter(([id]) => relevant.includes(id))) : answers;
  const matches = candidates.map((c, i) => ({ m: matchCandidate(scoped, c), order: i }));
  const ranked = matches
    .filter((x) => x.m.rankable)
    .sort((a, b) => (b.m.percent ?? 0) - (a.m.percent ?? 0) || a.order - b.order);
  const unranked = matches.filter((x) => !x.m.rankable);
  const exact = ranked.map((x) => (x.m.maxScore ? (x.m.score / x.m.maxScore) * 100 : 0));
  const topPct = ranked.length ? ranked[0].m.percent : null;
  const out: RankedCandidate[] = ranked.map((x, i) => {
    const neighbors: number[] = [];
    if (i > 0) neighbors.push(Math.abs(exact[i - 1] - exact[i]));
    if (i < ranked.length - 1) neighbors.push(Math.abs(exact[i] - exact[i + 1]));
    const margin = neighbors.length ? Math.min(...neighbors) : null;
    const top = x.m.percent === topPct;
    const tie = top && ranked.filter((y) => y.m.percent === topPct).length > 1;
    return { ...x.m, rank: i + 1, top, tie, margin, confidence: confidenceFor(x.m, margin) };
  });
  for (const x of unranked) out.push({ ...x.m, rank: null, top: false, tie: false, margin: null, confidence: null });
  return out;
}

export type Lean = 'yes' | 'no' | 'unclear';
export interface MeasureLink { id: string; agree_means: 'yes' | 'no' }
export interface LeanResult {
  lean: Lean;
  score: number;
  /** Statements that pushed the lean, for the explanation line. */
  drivers: { statement: string; direction: 'yes' | 'no' | 'neutral' }[];
}

/**
 * lean score = sum over linked, answered statements of
 *   weight x (answer - 3) x (+1 if agreeing means yes, -1 if it means no)
 * > 0 leans yes, < 0 leans no, 0 or nothing answered is unclear.
 */
export function measureLean(answers: Answers, measureId: string, statements: { id: string; measures: MeasureLink[] }[]): LeanResult {
  let score = 0;
  const drivers: LeanResult['drivers'] = [];
  for (const s of statements) {
    const link = s.measures.find((l) => l.id === measureId);
    if (!link) continue;
    const a = answers[s.id];
    if (!a || a.value == null) continue;
    const sign = link.agree_means === 'yes' ? 1 : -1;
    const contribution = (IMPORTANCE_WEIGHT[a.importance] ?? 1) * (a.value - 3) * sign;
    score += contribution;
    drivers.push({ statement: s.id, direction: contribution > 0 ? 'yes' : contribution < 0 ? 'no' : 'neutral' });
  }
  const lean: Lean = score > 0 ? 'yes' : score < 0 ? 'no' : 'unclear';
  return { lean, score, drivers };
}
