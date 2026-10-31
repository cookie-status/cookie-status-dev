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
