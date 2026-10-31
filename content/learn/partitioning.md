---
title: "Partitioning"
description: How browsers keep a third party's cookies and storage separate for each site, shown with an interactive demo.
weight: 20
toc: true
---
**Partitioning** keeps the cookies and other storage of an embedded third party separate for each top-level site, the site in the address bar. A third party embedded on `news.example` gets one storage area, and the same third party on `shop.example` gets another. It can still remember things *within* a site, such as a signed-in chat widget, but it can't use storage to recognize the same browser *across* sites.

It sits between the two older options:

* **Unpartitioned** (shared): the third party gets the same cookies everywhere, so it can follow the user from site to site.
* **Blocked**: the third party gets no cookies at all, which also breaks legitimate embeds.

## Try it

Pick a browser and a kind of third party: one on the browsers' tracker lists, or an ordinary widget that isn't, then visit the sites in any order. The log shows the cookie the third party receives on each visit, and whether it can link the visits together. The behavior matches each browser's default settings as described in the [comparison table](/features/third-party-cookies/).

{{< partition-demo >}}

## Who partitions what

* **Cookies:** Firefox and Brave partition third-party cookies by default (Firefox blocks them outright for known trackers, Brave blocks the trackers' requests). Chrome shares them unless the cookie opts in to partitioning with the `Partitioned` attribute ([CHIPS](/glossary/#chips)), and so does Edge, except for known trackers, whose cookies it blocks. Safari blocks third-party cookies, but supports partitioned ones through CHIPS.
* **Other storage:** all five browsers partition `localStorage`, IndexedDB and similar storage in third-party frames. See [Other browser storage in third-party context](/features/other-third-party-storage/).
* **Network state:** Chromium-based browsers also partition the HTTP cache, so cached files can't be used to recognize a browser across sites.

## Getting unpartitioned access back

Embedded content that genuinely needs its own cookies, such as a sign-in widget, can ask for them with the [Storage Access API](/glossary/#storage-access-api). The browser may grant access automatically, after a click, or after asking the user. Safari also still grants access after the user interacts with the third party in a pop-up opened by the site ([details](/safari/#third-party-cookies)).
