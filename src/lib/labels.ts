export const AXIS_LABEL: Record<string, string> = {
  economic: 'Economic',
  social: 'Social',
  governance: 'Governance',
};

export const LIKERT_LABEL: Record<number, string> = {
  1: 'Strongly disagree',
  2: 'Disagree',
  3: 'Neither agree nor disagree',
  4: 'Agree',
  5: 'Strongly agree',
};

export const IMPORTANCE_LABEL: Record<string, string> = { low: 'Low', normal: 'Normal', high: 'High' };

/** "amendment-87" -> "Amendment 87", "proposition-nn" -> "Proposition NN", "issue-7a" -> "Ballot Issue 7A" */
export function measureLabel(id: string): string {
  const [kind, num] = id.split('-');
  if (kind === 'issue') return `Ballot Issue ${num.toUpperCase()}`;
  return `${kind[0].toUpperCase()}${kind.slice(1)} ${num.toUpperCase()}`;
}

export function partyShort(party: string): string {
  const map: Record<string, string> = {
    'Democratic Party': 'Democratic',
    'Republican Party': 'Republican',
    'Libertarian Party': 'Libertarian',
    'American Constitution Party': 'American Constitution',
    'Approval Voting Party': 'Approval Voting',
    'Forward Party': 'Forward',
    'Unity Party': 'Unity',
    'Center Party': 'Center',
    Unaffiliated: 'Unaffiliated',
  };
  return map[party] ?? party;
}
