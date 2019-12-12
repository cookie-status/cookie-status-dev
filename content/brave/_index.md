+++
title = "Brave"
metatitle = "Brave :: Current status"
date = 2019-11-21T15:32:10+02:00
weight = 10
chapter = false
logo = "brave"
pre = "<b class=\"temp-brave\"></b>"
+++
## Current status

| Fact                          | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| **Mechanism**                 | Shields                                                      |
| **Originally deployed in**    | 0.55.18                                                      |
| **Latest update deployed in** | [v1.1.20](https://brave.com/latest/)                         |
| **User controls**             | Site-specific and global controls for: <ul><li>**Cross-site tracker blocking**</li><li>**Automatic connection upgrade to HTTPS**</li><li>**Script blocking**</li><li>**Cookie blocking**</li><li>**Device recognition blocking**</li> |

The Brave browser takes a very strong stance against cross-site tracking and third-party advertising. The browser proactively *monitors*, *modifies*, and *blocks* scripts and network resources that are deemed to compromise user privacy.

The browser employs a number of blocking methods, including:

* Block cookie access in third-party context
* Strip or spoof referrer headers in cross-site requests
* Neutralizes fingerprinting sources in third-party context (e.g. Canvas API, WebGL, Web Audio API)
* Blocks or modifies requests to known tracker sources, curated in multiple source lists including Brave's own, algorithmically derived tracker lists
* Removes known tracking query parameters from URLs (e.g. `gclid`, `fbclid`)
* Upgrades unsecure URLs to HTTPS when possible and non-disruptive

## Classification of "known trackers"

## Third-party cookies

## First-party cookies

## Other third-party storage

## Other first-party storage

## Referrer