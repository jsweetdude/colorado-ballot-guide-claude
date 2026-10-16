# Applies verified records and TRACER finance to candidate files.
#   python3 research/codex-borrow/apply-borrow.py
import json, re, datetime
TODAY = '2026-10-16'
D = 'src/data/candidates/'
def load(i): return json.load(open(f'{D}{i}.json'))
def save(i, c):
    with open(f'{D}{i}.json', 'w') as f: json.dump(c, f, indent=2, ensure_ascii=False); f.write('\n')
def add_source(c, url, title):
    if not any(s['url'] == url for s in c['sources']): c['sources'].append({'title': title, 'url': url, 'accessed': TODAY})
def nice(d):
    return datetime.date.fromisoformat(d).strftime('%B %-d, %Y')
def money(x): return '${:,.0f}'.format(x)

# Records
recs = json.load(open('research/codex-borrow/records-verified.json'))
added = replaced = 0
for r in recs:
    if r['verdict'] != 'add': continue
    c = load(r['candidate']); item = dict(r['record'])
    if r.get('via'): item['via'] = r['via']
    sup = r.get('supersedes')
    idx = next((i for i, x in enumerate(c['record']) if sup and (x['title'] == sup or x['title'].startswith(sup[:40]))), None)
    if idx is not None:
        old = c['record'][idx]['source_url']
        c['record'][idx] = item; replaced += 1
    else:
        c['record'].append(item); added += 1
    add_source(c, item['source_url'], item['title'])
    c['last_checked'] = TODAY
    save(r['candidate'], c)

# Finance
fin = json.load(open('research/codex-borrow/finance-verified.json'))
done = 0
for f in fin:
    c = load(f['candidate'])
    notes = f.get('notes') or ''
    if f['found']:
        parts = [f"Totals for the 2026 election cycle through {nice(f['as_of'])}, from the campaign's report to the Colorado Secretary of State."]
        m = re.search(r'Nonmonetary contributions \$([\d,]+\.\d\d)', notes)
        if m and float(m.group(1).replace(',', '')) > 0:
            parts.append(f"Donated goods and services worth {money(float(m.group(1).replace(',', '')))} are listed separately and not counted as money raised.")
        m = re.search(r'Loans received \$([\d,]+\.\d\d)', notes)
        if m and float(m.group(1).replace(',', '')) > 0:
            parts.append(f"Loans of {money(float(m.group(1).replace(',', '')))} are not counted as money raised but are included in cash on hand.")
        if (f.get('cash_on_hand') or 0) < 0:
            parts.append('The balance is negative: the campaign has spent more than it raised.')
        if 'manually ad' in notes:
            parts.append('The state database notes that this campaign\'s balances were manually adjusted.')
        if 'pre-filed' in notes or 'filed in advance' in notes:
            parts.append('The campaign filed its reports in advance, showing no activity.')
        c['finance'] = {'raised': f['raised'], 'spent': f['spent'], 'cash_on_hand': f['cash_on_hand'], 'as_of': f['as_of'],
                        'source_url': f['source_url'], 'source_name': 'Colorado Secretary of State (TRACER)', 'note': ' '.join(parts)}
    else:
        c['finance'] = {'raised': None, 'spent': None, 'cash_on_hand': None, 'as_of': TODAY,
                        'source_url': f['source_url'], 'source_name': 'Colorado Secretary of State (TRACER)',
                        'note': f'No campaign committee is registered with the Colorado Secretary of State as of {nice(TODAY)}, so there are no totals to report.'}
    add_source(c, f['source_url'], 'Colorado TRACER campaign finance: candidate detail')
    c['last_checked'] = TODAY
    save(f['candidate'], c); done += 1
print(f'records: {added} added, {replaced} replaced; finance: {done} candidates')
