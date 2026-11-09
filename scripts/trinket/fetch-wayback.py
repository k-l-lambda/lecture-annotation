import json, re, html, gzip, subprocess, time, sys
P = ['-x', 'http://localhost:1091', '-m', '60', '-s']
def curl(url):
    return subprocess.run(['curl', *P, url], capture_output=True).stdout
ids = {}
for line in open('ids.txt'):
    page, tid = line.split()
    ids.setdefault(tid, []).append(page)
out = {}
for tid, pages in ids.items():
    rec = {'pages': pages, 'snapshot': None, 'name': None, 'code': None}
    for path in (f'trinket.io/embed/music/{tid}', f'trinket.io/music/{tid}'):
        rows = curl(f'https://web.archive.org/cdx/search/cdx?url={path}&fl=timestamp,statuscode&filter=statuscode:200&output=json').decode() or '[]'
        try: rows = json.loads(rows)[1:]
        except Exception: rows = []
        for ts, _ in reversed(rows):
            raw = curl(f'https://web.archive.org/web/{ts}id_/https://{path}')
            try: t = gzip.decompress(raw).decode('utf-8', 'replace')
            except Exception: t = raw.decode('utf-8', 'replace')
            m = re.search(r'trinketObject\s*=\s*(\{.*?\});\s*\n', t, re.S)
            if not m: continue
            o = json.loads(m.group(1))
            rec.update(snapshot=f'{ts} {path}', name=o.get('name'), code=json.loads(html.unescape(o['code'])))
            break
        if rec['code']: break
        time.sleep(0.5)
    out[tid] = rec
    print(tid, 'OK ' if rec['code'] else 'MISS', rec['snapshot'] or '', rec['name'] or '', pages, flush=True)
json.dump(out, open('trinkets.json', 'w'), ensure_ascii=False, indent=1)
print(sum(1 for r in out.values() if r['code']), '/', len(out), 'recovered')
