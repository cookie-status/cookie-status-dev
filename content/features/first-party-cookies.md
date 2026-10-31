---
title: Cookies in first-party context
feature: first-party-cookies
---
**First-party cookies** belong to the site in the address bar. They keep users signed in, remember shopping carts, and hold the identifiers that analytics tools use to recognize returning visitors.

Trackers can use them too. A tracker that can't use third-party cookies can add an identifier to the links it controls ([link decoration](/glossary/#link-decoration)) and have its script store that identifier in a first-party cookie on the destination site. To limit this, some browsers shorten the lifetime of first-party cookies, especially those set with JavaScript (`document.cookie`) rather than an HTTP `Set-Cookie` header.

All Chromium-based browsers cap every cookie at 400 days. Safari and Brave go further.
