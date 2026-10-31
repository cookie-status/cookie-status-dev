// Table view toggles. State lives on the page only: the site uses no browser storage.
document.querySelectorAll('.matrix-tools .toggle').forEach((button) => {
  const table = document.querySelector('.matrix');
  if (!table) return;
  button.addEventListener('click', () => {
    const on = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(on));
    table.classList.toggle(`is-${button.dataset.toggle}`, on);
  });
});

// Close the Browsers menu when clicking outside it or pressing Escape.
const menu = document.querySelector('.nav-browsers');
if (menu) {
  document.addEventListener('click', (e) => {
    if (menu.open && !menu.contains(e.target)) menu.open = false;
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
}

// Pagefind search UI, loaded only on the search page.
const search = document.getElementById('search');
if (search && window.PagefindUI) {
  const ui = new window.PagefindUI({ element: search, showSubResults: true, showImages: false, autofocus: true });
  const q = new URLSearchParams(location.search).get('q');
  if (q) ui.triggerSearch(q);
}

// History page: filter the timeline by browser. Without JavaScript every entry is shown.
const filter = document.querySelector('.history-filter');
if (filter) {
  filter.hidden = false;
  const buttons = filter.querySelectorAll('button');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.filter;
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
      document.querySelectorAll('.timeline .event').forEach((event) => {
        event.hidden = id !== '' && !event.dataset.browsers.split(' ').includes(id);
      });
      document.querySelectorAll('.history-year').forEach((year) => {
        year.hidden = !year.querySelector('.event:not([hidden])');
      });
      document.querySelector('.history-empty').hidden = !!document.querySelector('.event:not([hidden])');
    });
  });
}

// Partitioning demo on /learn/partitioning/. Behaviors follow the
// "Cookies in 3rd party context" row (data/status/*.yaml); keep them in sync.
const demo = document.querySelector('[data-pdemo]');
if (demo) {
  const MODES = {
    shared: 'Unpartitioned: the third party gets the same cookie on every site.',
    partitioned: 'Partitioned: the third party gets a separate cookie on each site.',
    ephemeral: 'Partitioned and temporary: a separate cookie on each site, deleted shortly after you leave the site.',
    blocked: 'Blocked: the third party loads, but gets no cookies.',
    request: 'Request blocked: the third party never loads at all.',
  };
  const BEHAVIOR = {
    brave: { tracker: 'request', widget: 'ephemeral' },
    chrome: { tracker: 'shared', widget: 'shared' },
    edge: { tracker: 'blocked', widget: 'shared' },
    firefox: { tracker: 'blocked', widget: 'partitioned' },
    safari: { tracker: 'blocked', widget: 'blocked' },
  };
  const state = { browser: 'chrome', party: 'tracker', jars: {}, seen: {}, cleared: {}, last: null, lines: [] };
  const controls = demo.querySelector('.pdemo-controls');
  const log = demo.querySelector('.pdemo-log');
  const modeText = demo.querySelector('.pdemo-mode');
  const uid = () => Math.random().toString(16).slice(2, 6);
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const mode = () => BEHAVIOR[state.browser][state.party];
  const host = () => (state.party === 'tracker' ? 'ads.tracker.example' : 'chat.widget.example');

  const render = () => {
    modeText.textContent = MODES[mode()];
    log.innerHTML = state.lines.length ? state.lines.join('\n')
      : '<span class="c"># visit a site to see what the third party receives</span>';
  };
  const reset = () => { state.jars = {}; state.seen = {}; state.cleared = {}; state.last = null; state.lines = []; render(); };

  const visit = (site) => {
    const m = mode();
    const out = [`<span class="p">$</span> open https://${site}/  <span class="c"># embeds ${host()}</span>`];
    if (m === 'ephemeral' && state.last && state.last !== site && state.jars[state.last]) {
      delete state.jars[state.last];
      state.cleared[state.last] = true;
    }
    if (m === 'request') {
      out.push('  <span class="k">request blocked</span>: nothing reaches the third party');
    } else if (m === 'blocked') {
      out.push('  cookie: <span class="k">(none)</span>  set-cookie ignored');
    } else {
      const key = m === 'shared' ? 'all' : site;
      const isNew = !state.jars[key];
      if (isNew) state.jars[key] = uid();
      const id = state.jars[key];
      const sites = (state.seen[id] = state.seen[id] || []);
      const others = sites.filter((s) => s !== site);
      if (!sites.includes(site)) sites.push(site);
      const jar = m === 'shared' ? 'shared jar' : `jar for ${site}`;
      let note = isNew ? 'new id' : 'returning id';
      if (isNew && state.cleared[site]) note = 'new id: the old one was deleted when you left';
      if (others.length) note = `<span class="k">same id as on ${others.join(', ')}: visits linked</span>`;
      out.push(`  cookie: uid=${id}  <span class="c"># ${jar}, ${note}</span>`);
    }
    state.last = site;
    state.lines.push(out.join('\n'));
    render();
  };

  const group = (attr) => demo.querySelectorAll(`[data-${attr}]`);
  ['browser', 'party'].forEach((attr) => {
    group(attr).forEach((button) => button.addEventListener('click', () => {
      group(attr).forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
      state[attr] = button.dataset[attr];
      reset();
    }));
  });
  demo.querySelectorAll('.pdemo-site').forEach((b) => b.addEventListener('click', () => visit(b.dataset.site)));
  demo.querySelector('.pdemo-reset').addEventListener('click', reset);
  controls.hidden = false;
  render();
}
