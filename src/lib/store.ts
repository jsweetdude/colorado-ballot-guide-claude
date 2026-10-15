// Answers and ballot districts live only in this browser's localStorage.
// A share link carries answers in the URL fragment, which browsers never send
// to a server.
import type { Answers, Importance, Likert } from './match';

export interface Ballot {
  cd: number | null;
  sd: number | null;
  hd: number | null;
  county: string | null;
  source: 'address' | 'manual' | 'skipped' | 'shared';
}

const ANSWERS_KEY = 'cbg.answers.v1';
const BALLOT_KEY = 'cbg.ballot.v1';
const STEP_KEY = 'cbg.step.v1';

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}
function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode or storage blocked: the session still works in memory */
  }
}

export const loadAnswers = (): Answers => read<Answers>(ANSWERS_KEY) ?? {};
export const saveAnswers = (a: Answers) => write(ANSWERS_KEY, a);
export const loadBallot = (): Ballot | null => read<Ballot>(BALLOT_KEY);
export const saveBallot = (b: Ballot) => write(BALLOT_KEY, b);
export const loadStep = (): number => read<number>(STEP_KEY) ?? 0;
export const saveStep = (n: number) => write(STEP_KEY, n);

export function clearAnswers() {
  try {
    localStorage.removeItem(ANSWERS_KEY);
    localStorage.removeItem(STEP_KEY);
  } catch {
    /* nothing to clear */
  }
}

export function clearAll() {
  try {
    localStorage.removeItem(ANSWERS_KEY);
    localStorage.removeItem(BALLOT_KEY);
    localStorage.removeItem(STEP_KEY);
  } catch {
    /* nothing to clear */
  }
}

const IMP_CODE: Record<Importance, string> = { low: 'l', normal: 'n', high: 'h' };
const IMP_FROM: Record<string, Importance> = { l: 'low', n: 'normal', h: 'high' };

/** Two characters per statement, in statement order: answer (0 = skipped) and importance. */
export function encodeShare(answers: Answers, statementIds: string[], cd: number | null): string {
  const body = statementIds
    .map((id) => {
      const a = answers[id];
      return `${a?.value ?? 0}${IMP_CODE[a?.importance ?? 'normal']}`;
    })
    .join('');
  const params = new URLSearchParams({ v: '1', a: body });
  if (cd) params.set('cd', String(cd));
  return params.toString();
}

export function decodeShare(fragment: string, statementIds: string[]): { answers: Answers; cd: number | null } | null {
  const params = new URLSearchParams(fragment.replace(/^#/, ''));
  const body = params.get('a');
  if (params.get('v') !== '1' || !body || body.length !== statementIds.length * 2) return null;
  const answers: Answers = {};
  for (let i = 0; i < statementIds.length; i++) {
    const v = Number(body[i * 2]);
    const imp = IMP_FROM[body[i * 2 + 1]];
    if (!(v >= 0 && v <= 5) || !imp) return null;
    if (v > 0) answers[statementIds[i]] = { value: v as Likert, importance: imp };
  }
  const cdNum = Number(params.get('cd'));
  const cd = Number.isInteger(cdNum) && cdNum >= 1 && cdNum <= 8 ? cdNum : null;
  return { answers, cd };
}
