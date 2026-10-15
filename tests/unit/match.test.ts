import { describe, expect, it } from 'vitest';
import {
  CONFIDENCE_RULES,
  confidenceFor,
  matchCandidate,
  measureLean,
  rankRace,
  type Answers,
  type MatchCandidate,
  type Position,
} from '../../src/lib/match';
import { decodeShare, encodeShare } from '../../src/lib/store';

const pos = (statement: string, value: Position['value'], source_type: Position['source_type'] = 'direct_statement'): Position => ({
  statement,
  value,
  source_type,
});

const ids = ['s1', 's2', 's3', 's4', 's5', 's6'];
const allAnswered = (value: 1 | 2 | 3 | 4 | 5): Answers =>
  Object.fromEntries(ids.map((id) => [id, { value, importance: 'normal' as const }]));

describe('matchCandidate', () => {
  it('scores identical answers as 100 percent', () => {
    const c: MatchCandidate = { id: 'a', positions: ids.map((id) => pos(id, 5)) };
    const m = matchCandidate(allAnswered(5), c);
    expect(m.percent).toBe(100);
    expect(m.overlap).toBe(6);
    expect(m.answered).toBe(6);
  });

  it('scores opposite ends of the scale as 0 percent', () => {
    const c: MatchCandidate = { id: 'a', positions: ids.map((id) => pos(id, 1)) };
    expect(matchCandidate(allAnswered(5), c).percent).toBe(0);
  });

  it('gives (4 - steps) / 4 credit per statement', () => {
    const answers: Answers = { s1: { value: 5, importance: 'normal' }, s2: { value: 3, importance: 'normal' } };
    const c: MatchCandidate = { id: 'a', positions: [pos('s1', 4), pos('s2', 1)] };
    const m = matchCandidate(answers, c);
    // s1: 1 step -> 0.75; s2: 2 steps -> 0.5; total 1.25 of 2
    expect(m.score).toBeCloseTo(1.25);
    expect(m.maxScore).toBe(2);
    expect(m.percent).toBe(63);
  });

  it('weights by importance: low 0.5, normal 1, high 2', () => {
    const answers: Answers = {
      s1: { value: 5, importance: 'high' },
      s2: { value: 5, importance: 'low' },
    };
    const c: MatchCandidate = { id: 'a', positions: [pos('s1', 5), pos('s2', 1)] };
    const m = matchCandidate(answers, c);
    expect(m.score).toBe(2);
    expect(m.maxScore).toBe(2.5);
    expect(m.percent).toBe(80);
  });

  it('ignores skipped statements and statements the candidate has no position on', () => {
    const answers: Answers = {
      s1: { value: 5, importance: 'normal' },
      s2: { value: null, importance: 'normal' },
      s3: { value: 2, importance: 'normal' },
    };
    const c: MatchCandidate = { id: 'a', positions: [pos('s1', 5), pos('s2', 1)] };
    const m = matchCandidate(answers, c);
    expect(m.answered).toBe(2);
    expect(m.overlap).toBe(1);
    expect(m.percent).toBe(100);
  });

  it('returns null percent with no overlap', () => {
    const m = matchCandidate({ s1: { value: 4, importance: 'normal' } }, { id: 'a', positions: [] });
    expect(m.percent).toBeNull();
    expect(m.rankable).toBe(false);
  });

  it('is rankable only when known on at least a third of answered statements', () => {
    const answers = allAnswered(4); // M = 6, so N must be >= 2
    expect(matchCandidate(answers, { id: 'a', positions: [pos('s1', 4)] }).rankable).toBe(false);
    expect(matchCandidate(answers, { id: 'a', positions: [pos('s1', 4), pos('s2', 4)] }).rankable).toBe(true);
    const many: Answers = Object.fromEntries(
      Array.from({ length: 24 }, (_, i) => [`x${i}`, { value: 3 as const, importance: 'normal' as const }]),
    );
    const seven = Array.from({ length: 7 }, (_, i) => pos(`x${i}`, 3));
    const eight = Array.from({ length: 8 }, (_, i) => pos(`x${i}`, 3));
    expect(matchCandidate(many, { id: 'a', positions: seven }).rankable).toBe(false);
    expect(matchCandidate(many, { id: 'a', positions: eight }).rankable).toBe(true);
  });

  it('averages source quality over shared statements', () => {
    const c: MatchCandidate = {
      id: 'a',
      positions: [pos('s1', 4, 'recorded_vote'), pos('s2', 4, 'inferred')],
    };
    expect(matchCandidate(allAnswered(4), c).quality).toBeCloseTo(0.65);
  });
});

describe('confidenceFor', () => {
  const base = matchCandidate(allAnswered(4), { id: 'a', positions: ids.map((id) => pos(id, 4, 'recorded_vote')) });

  it('is High with full coverage, strong sources and a clear margin', () => {
    expect(confidenceFor(base, 20)).toBe('High');
    expect(confidenceFor(base, null)).toBe('High');
  });

  it('drops to Medium when the margin is under the High threshold', () => {
    expect(confidenceFor(base, CONFIDENCE_RULES.high.margin - 1)).toBe('Medium');
  });

  it('drops to Low when the margin is under the Medium threshold', () => {
    expect(confidenceFor(base, CONFIDENCE_RULES.medium.margin - 1)).toBe('Low');
  });

  it('is Low when sources are mostly inferred', () => {
    const inferred = matchCandidate(allAnswered(4), { id: 'a', positions: ids.map((id) => pos(id, 4, 'inferred')) });
    expect(confidenceFor(inferred, 30)).toBe('Low');
  });

  it('is at most Medium with fewer than five shared statements', () => {
    const four = matchCandidate(
      { s1: { value: 4, importance: 'normal' }, s2: { value: 4, importance: 'normal' }, s3: { value: 4, importance: 'normal' }, s4: { value: 4, importance: 'normal' } },
      { id: 'a', positions: ['s1', 's2', 's3', 's4'].map((id) => pos(id, 4)) },
    );
    expect(confidenceFor(four, 50)).toBe('Medium');
  });
});

describe('rankRace', () => {
  const answers = allAnswered(5);
  const close: MatchCandidate = { id: 'close', positions: ids.map((id) => pos(id, 5)) };
  const far: MatchCandidate = { id: 'far', positions: ids.map((id) => pos(id, 1)) };
  const thin: MatchCandidate = { id: 'thin', positions: [pos('s1', 5)] };

  it('sorts rankable candidates by match and lists thin ones after, unranked', () => {
    const r = rankRace(answers, [thin, far, close]);
    expect(r.map((c) => c.id)).toEqual(['close', 'far', 'thin']);
    expect(r[0].top).toBe(true);
    expect(r[0].rank).toBe(1);
    expect(r[1].top).toBe(false);
    expect(r[2].rank).toBeNull();
    expect(r[2].confidence).toBeNull();
  });

  it('computes the margin to the nearest ranked neighbor', () => {
    const r = rankRace(answers, [close, far]);
    expect(r[0].margin).toBe(100);
    expect(r[1].margin).toBe(100);
  });

  it('marks ties at the top', () => {
    const twin: MatchCandidate = { id: 'twin', positions: ids.map((id) => pos(id, 5)) };
    const r = rankRace(answers, [close, twin]);
    expect(r[0].top && r[1].top).toBe(true);
    expect(r[0].tie).toBe(true);
    expect(r[0].confidence).toBe('Low'); // zero margin
  });
});

describe('measureLean', () => {
  const statements = [
    { id: 'tax', measures: [{ id: 'm1', agree_means: 'yes' as const }, { id: 'm2', agree_means: 'no' as const }] },
    { id: 'cap', measures: [{ id: 'm2', agree_means: 'yes' as const }] },
  ];

  it('leans yes when the visitor agrees with a yes-linked statement', () => {
    expect(measureLean({ tax: { value: 5, importance: 'normal' } }, 'm1', statements).lean).toBe('yes');
  });

  it('leans no when the visitor disagrees with a yes-linked statement', () => {
    expect(measureLean({ tax: { value: 2, importance: 'normal' } }, 'm1', statements).lean).toBe('no');
  });

  it('is unclear when skipped or neutral', () => {
    expect(measureLean({}, 'm1', statements).lean).toBe('unclear');
    expect(measureLean({ tax: { value: 3, importance: 'high' } }, 'm1', statements).lean).toBe('unclear');
    expect(measureLean({ tax: { value: null, importance: 'high' } }, 'm1', statements).lean).toBe('unclear');
  });

  it('combines several statements, including reversed ones', () => {
    // agree with tax (pushes m2 toward no), strongly agree with cap at high importance (pushes yes)
    const r = measureLean(
      { tax: { value: 4, importance: 'normal' }, cap: { value: 5, importance: 'high' } },
      'm2',
      statements,
    );
    expect(r.score).toBe(-1 + 4);
    expect(r.lean).toBe('yes');
  });

  it('is unclear when linked statements cancel out', () => {
    const r = measureLean({ tax: { value: 4, importance: 'normal' }, cap: { value: 4, importance: 'normal' } }, 'm2', statements);
    expect(r.lean).toBe('unclear');
  });
});

describe('share links', () => {
  it('round-trips answers, importance, skips and the congressional district', () => {
    const answers: Answers = {
      s1: { value: 5, importance: 'high' },
      s3: { value: 1, importance: 'low' },
      s4: { value: 3, importance: 'normal' },
    };
    const frag = encodeShare(answers, ids, 7);
    const back = decodeShare(`#${frag}`, ids)!;
    expect(back.cd).toBe(7);
    expect(back.answers).toEqual(answers);
  });

  it('rejects a link made for a different statement list', () => {
    const frag = encodeShare({}, ids, null);
    expect(decodeShare(frag, [...ids, 's7'])).toBeNull();
  });

  it('rejects malformed input', () => {
    expect(decodeShare('v=1&a=zz', ['s1'])).toBeNull();
    expect(decodeShare('v=2&a=5n', ['s1'])).toBeNull();
  });
});

describe('office-specific statements', () => {
  it('matches only on the statements relevant to the office', () => {
    const answers: Answers = {
      s1: { value: 5, importance: 'normal' },
      s2: { value: 5, importance: 'normal' },
      s3: { value: 1, importance: 'normal' },
      s4: { value: 1, importance: 'normal' },
    };
    const c: MatchCandidate = { id: 'a', positions: [pos('s1', 5), pos('s2', 5), pos('s3', 5)] };
    const all = rankRace(answers, [c]);
    const scoped = rankRace(answers, [c], ['s1', 's2']);
    expect(all[0].answered).toBe(4);
    expect(all[0].percent).toBe(67);
    expect(scoped[0].answered).toBe(2);
    expect(scoped[0].percent).toBe(100);
    expect(scoped[0].rankable).toBe(true);
  });
});
