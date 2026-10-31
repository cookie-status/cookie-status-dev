// Looks for recent privacy-related changes in browser release notes and blogs,
// and writes a Markdown summary for review. Run by .github/workflows/watch.yml.
//
//   node scripts/watch-changes.mjs [--days 8] [--seen seen.txt] [--out report.md]
//
// --seen is a file of URLs already reported (one per line or anywhere in the
// text); items linking to them are skipped. Nothing is written to --out when
// there is nothing new. Needs Node 18+ (built-in fetch), no dependencies.

import { readFileSync, writeFileSync } from 'node:fs';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1]]] : acc), []),
);
const DAYS = Number(args.days || process.env.WATCH_DAYS || 8);
const SINCE = new Date(Date.now() - DAYS * 864e5);
const SEEN = args.seen ? readFileSync(args.seen, 'utf8') : '';
const OUT = args.out || 'watch-report.md';

// Topics the site covers. Kept narrow on purpose: every match is read by a person.
const KEYWORDS = /\b(cookies?|partition\w*|third[- ]party (cookies?|storage|context|trackers?)|storage access|tracking|trackers?|fingerprint\w*|referr?er|privacy|CHIPS|bounce|CNAME|ITP|ephemeral|shields|user[- ]agent (string|reduction)|client hints|link decoration|query param\w*|identity resolution|IP (protection|address)|shared storage|topics API|attribution reporting)\b/i;
// Out of scope for the site (see /about/), or boilerplate on the pages read.
const IGNORE = /Global Privacy Control|Sec-GPC|Local Network Access|Website Privacy Notice|Cookies necessary for this site|Privacy Policy|All rights reserved/i;

const UA = { 'user-agent': 'cookiestatus-watcher (+https://github.com/cookie-status/cookie-status-dev)' };

const get = async (url, type = 'text') => {
  const res = await fetch(url, { headers: UA, redirect: 'follow' });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return type === 'json' ? res.json() : res.text();
};

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ldquo: '“', rdquo: '”', lsquo: '‘', rsquo: '’', mdash: '—', ndash: '–', hellip: '…' };
const decode = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
  .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);
const text = (html) => decode(html.replace(/<(script|style)[\s\S]*?<\/\1>/gi, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const clip = (s, n = 280) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);
const cdata = (s) => s.replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, '$1');
const tag = (xml, name) => { const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i')); return m ? cdata(m[1]) : ''; };
const recent = (date) => date instanceof Date && !Number.isNaN(date) && date >= SINCE;
const seen = (url) => url && SEEN.includes(url);

// Paragraphs and list items of an HTML fragment that mention a keyword.
const matches = (html, limit = 6) => {
  const blocks = [...html.matchAll(/<(li|p|h[2-4])[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) => text(m[2]));
  return [...new Set(blocks.filter((b) => b.length > 20 && KEYWORDS.test(b) && !IGNORE.test(b)))].slice(0, limit).map((b) => clip(b));
};

// Items of an RSS feed published since SINCE whose title or body mention a keyword.
const rss = async (url) => {
  const xml = await get(url);
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map(([, item]) => {
    const body = tag(item, 'content:encoded') || tag(item, 'description');
    return { title: text(tag(item, 'title')), url: text(tag(item, 'link')), date: new Date(text(tag(item, 'pubDate'))), body };
  }).filter((i) => recent(i.date))
    .map((i) => ({ ...i, notes: matches(i.body) }))
    .filter((i) => i.notes.length || (KEYWORDS.test(i.title) && !IGNORE.test(i.title)));
};

const SOURCES = {
  // Safari: release posts ("WebKit Features in Safari …") and privacy posts.
  'WebKit blog': () => rss('https://webkit.org/feed/'),

  // Chrome: the developer blog, plus Chrome Status entries updated recently.
  'Chrome for Developers blog': () => rss('https://developer.chrome.com/static/blog/feed.xml'),
  'Chrome Status': async () => {
    const found = new Map();
    for (const q of ['cookie', 'partition', 'storage access', 'tracking', 'fingerprinting', 'referrer', 'privacy', 'user-agent']) {
      const raw = await get(`https://chromestatus.com/api/v0/features?q=${encodeURIComponent(q)}&num=100`);
      const { features = [] } = JSON.parse(raw.replace(/^\)\]\}'\s*/, ''));
      for (const f of features) {
        const date = new Date(`${f.updated?.when?.slice(0, 19).replace(' ', 'T')}Z`);
        if (!recent(date) || found.has(f.id)) continue;
        if (!KEYWORDS.test(`${f.name} ${f.summary}`) || IGNORE.test(`${f.name} ${f.summary}`)) continue;
        found.set(f.id, { title: f.name, url: `https://chromestatus.com/feature/${f.id}`, date, notes: [clip(f.summary || '')] });
      }
    }
    return [...found.values()];
  },

  // Firefox: release notes of major versions released in the window.
  'Firefox release notes': async () => {
    const releases = await get('https://product-details.mozilla.org/1.0/firefox_history_major_releases.json', 'json');
    const items = [];
    for (const [version, day] of Object.entries(releases)) {
      const date = new Date(`${day}T00:00:00Z`);
      if (!recent(date)) continue;
      const url = `https://www.firefox.com/en-US/firefox/${version}/releasenotes/`;
      const notes = matches(await get(url), 10);
      if (notes.length) items.push({ title: `Firefox ${version}`, url, date, notes });
    }
    return items;
  },

  // Edge: stable channel release notes, one section per version.
  'Edge release notes': async () => {
    const page = 'https://learn.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel';
    const html = await get(page);
    const heads = [...html.matchAll(/<h2[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/gi)];
    const items = [];
    heads.forEach((h, i) => {
      const title = text(h[2]);
      const m = title.match(/^Version ([\d.]+): (\w+ \d{1,2}, \d{4})/);
      if (!m) return;
      const date = new Date(`${m[2]} UTC`);
      if (!recent(date)) return;
      const notes = matches(html.slice(h.index, heads[i + 1]?.index ?? html.length), 8);
      if (notes.length) items.push({ title: `Edge ${m[1]}`, url: `${page}#${h[1]}`, date, notes });
    });
    return items;
  },

  // Brave: release notes on brave.com/latest, one section per version.
  'Brave release notes': async () => {
    const page = 'https://brave.com/latest/';
    const full = await get(page);
    const html = full.slice(0, full.search(/<footer/i) > 0 ? full.search(/<footer/i) : full.length);
    // Desktop sections only: the site covers desktop browsers.
    const heads = [...html.matchAll(/<h3(?:[^>]*id="([^"]*)")?[^>]*>([\s\S]*?)<\/h3>/gi)].map((h) => [h[0], h[2], h[1] || '', h.index]);
    const items = [];
    heads.forEach((h, i) => {
      const m = text(h[1]).match(/^Release Notes v?([\d.]+) \((\w+ \d{1,2}, \d{4})\)/);
      if (!m || !h[2].startsWith('desktop-')) return;
      const date = new Date(`${m[2]} UTC`);
      if (!recent(date)) return;
      const next = heads.slice(i + 1).find((n) => /^Release Notes/.test(text(n[1])));
      const notes = matches(html.slice(h[3], next?.[3] ?? html.length), 8);
      if (notes.length) items.push({ title: `Brave ${m[1]}`, url: `${page}#${h[2]}`, date, notes });
    });
    return items;
  },
};

const sections = [];
const failures = [];
for (const [name, load] of Object.entries(SOURCES)) {
  try {
    const items = (await load()).filter((i) => !seen(i.url)).sort((a, b) => b.date - a.date);
    if (items.length) sections.push({ name, items });
    console.log(`${name}: ${items.length}`);
  } catch (err) {
    failures.push(`${name}: ${err.message}`);
    console.log(`${name}: failed (${err.message})`);
  }
}

if (!sections.length && !failures.length) {
  console.log('Nothing new.');
  process.exit(0);
}

const day = (d) => d.toISOString().slice(0, 10);
const lines = [
  `Possible changes to default tracking protections from the last ${DAYS} days, found by keyword. Most won't need a change to the site.`,
  '',
  'For each item: check whether it changes **default** behavior in normal browsing, then update `data/status/<browser>.yaml` and add an entry to `data/history.yaml`, or tick it off as not relevant.',
  '',
];
for (const { name, items } of sections) {
  lines.push(`## ${name}`, '');
  for (const i of items) {
    lines.push(`- [ ] **[${i.title}](${i.url})** (${day(i.date)})`);
    for (const n of i.notes) lines.push(`  - ${n.replace(/\n/g, ' ')}`);
  }
  lines.push('');
}
if (failures.length) {
  lines.push('## Sources that could not be checked', '', ...failures.map((f) => `- ${f}`), '');
}
writeFileSync(OUT, lines.join('\n'));
console.log(`Wrote ${OUT}`);
