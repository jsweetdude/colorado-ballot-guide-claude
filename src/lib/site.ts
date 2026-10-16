export const SITE = {
  name: 'Colorado Ballot Guide',
  description:
    'A free, nonpartisan guide to Colorado’s November 3, 2026 ballot. Answer a short interview and see how every candidate and measure lines up with your views, with sources.',
  repo: 'https://github.com/jsweetdude/colorado-ballot-guide-claude',
  issues: 'https://github.com/jsweetdude/colorado-ballot-guide-claude/issues',
};

export const DATA_LAST_CHECKED = '2026-10-16';
export const DATA_LAST_CHECKED_LABEL = 'October 16, 2026';

export const DATES = {
  registerBy: { iso: '2026-10-26', label: 'Monday, October 26' },
  electionDay: { iso: '2026-11-03', label: 'Tuesday, November 3' },
};

export const LINKS = {
  govote: 'https://www.govotecolorado.gov/',
  register: 'https://www.sos.state.co.us/voter/pages/pub/olvr/verifyNewVoter.xhtml',
  voterLookup: 'https://www.sos.state.co.us/voter/pages/pub/olvr/findVoterReg.xhtml',
  bluebook: 'https://leg.colorado.gov/bluebook',
  bluebookPdf: 'https://content.leg.colorado.gov/sites/default/files/2026-blue-book-en-accessible.pdf',
  vote411: 'https://www.vote411.org/ballot',
  sosCandidates: 'https://www.coloradosos.gov/pubs/elections/vote/generalCandidates.html',
  judicial: 'https://judicialperformance.colorado.gov/',
  frprd: 'https://www.frprdistrict.com/',
};

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
