---
title: Other browser storage in third-party context
feature: other-third-party-storage
---
Cookies aren't the only way to store an identifier. Embedded content can also use `localStorage`, `sessionStorage`, IndexedDB, the Cache API, service workers and more. If any of these were shared across sites, a third party could use them in place of cookies.

All five browsers now **partition** this storage by top-level site by default: an iframe from `b.example` on `a.example` gets different storage from the same iframe on `c.example`. Some browsers also block it entirely for known trackers, or clear it when the user leaves the site.
