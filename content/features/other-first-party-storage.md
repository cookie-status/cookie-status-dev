---
title: Other browser storage in first-party context
feature: other-first-party-storage
---
A site's own `localStorage`, IndexedDB and similar storage can hold the same kind of identifiers as first-party cookies, so the reasoning for [capping first-party cookies](/features/first-party-cookies/) applies here too.

In practice only Safari limits it in default browsing: it deletes all script-writable storage of a site the user hasn't interacted with in 7 days of browser use. Firefox deletes the storage of known trackers after 45 days without interaction.
