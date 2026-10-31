---
title: About
description: What Cookie Status covers, how its claims are checked, and how to contribute.
toc: true
---
Cookie Status compares the tracking protections that the major browsers apply **by default**. It started in November 2019 and is maintained by [Simo Ahava](https://www.simoahava.com/) and contributors.

## Scope

* **Default settings in normal browsing only.** Private and incognito windows, stricter modes and features the user has to turn on are not covered.
* **Desktop browsers**, with notes where a claim only applies to some versions or platforms. On iOS and iPadOS, every browser uses WebKit and gets Safari's protections.
* **Brave, Chrome, Edge, Firefox and Safari.**

## How claims are checked

Each cell of the comparison table lists its **sources** and the date it was last **checked**. A claim is checked in one of three ways:

* **A test in the browser**, following steps like those in [Test your own site](/learn/testing/). These show up as "Cookie Status test" in the sources.
* **The browser vendor's own documentation**, release notes or source code.
* **[privacytests.org](https://privacytests.org/)**, which tests default desktop browsers regularly and publishes its methods.

Claims without a checked date are older ones that haven't been re-checked yet. Changes over time are listed in the [history](/history/).

## Contributing

The site is open source on [GitHub](https://github.com/cookie-status/cookie-status-dev). The comparison table, browser summaries, feature pages and history are all generated from data files in `data/`, so most corrections are a small change to one YAML file:

* `data/status/<browser>.yaml` for what a browser does today.
* `data/history.yaml` for a dated change.

The build checks the data and fails with an error message if something doesn't fit. You can also [open an issue](https://github.com/cookie-status/cookie-status-dev/issues/new?labels=content).

## Privacy

This site sets no cookies, uses no browser storage, and makes no requests to third parties. Fonts are hosted on the site itself.
