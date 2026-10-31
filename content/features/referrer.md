---
title: Referrer
feature: referrer
---
When the browser follows a link or loads a resource, it tells the destination which page the request came from: the **referrer**, sent in the `Referer` header and exposed to scripts as `document.referrer`. A full referrer can leak search terms, user IDs or other details in the URL to another site.

All browsers now default to the `strict-origin-when-cross-origin` policy: other sites only see the origin of the referring page (`https://www.example.com/`), not its path or query string. Sites can set a different policy. Browsers differ in whether they allow sites to **loosen** it, for example with `unsafe-url`.
