---
title: "Current status"
date: 2019-11-21T15:47:52+02:00
draft: false
weight: 10
logo: "safari"
---
## Quick facts

| Fact                          | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| **Mechanism**                 | Intelligent Tracking Prevention 2.3                          |
| **Originally deployed in**    | [Safari 13](https://developer.apple.com/documentation/safari_release_notes/safari_13_release_notes) in **iOS 13**, **macOS Catalina, Mojave, and High Sierra** |
| **Latest update**             | [Documented 10 Dec 2019](https://webkit.org/blog/9661/preventing-tracking-prevention-tracking/) |
| **Latest update deployed in** | **iOS and iPadOS 13.3**, and Safari **13.0.3** on **macOS Catalina, Mojave, and High Sierra** |
| **User controls**             | ITP **doesn't let users control** how it works. Users can simply toggle ITP off by unchecking "Prevent cross-site tracking" in Safari's Security preferences. |

**Intelligent Tracking Prevention** is the tracking protection mechanism used in the Safari browser, running on the **WebKit** browser engine.

ITP is unique in that it has a purely **algorithmic** approach to classifying domains that have the potential for cross-site tracking.

Due to how ITP impacts both third-party storage access *and* first-party storage access, and due to [Safari's market share](https://gs.statcounter.com/browser-market-share/) especially in mobile devices, ITP can be considered a big disruption on **AdTech** and other industries that rely on data collection from browser users.

{{% notice info %}}
Note that even though ITP is deployed in WebKit, other browsers that run on WebKit (e.g. Chrome on iOS) do not have ITP toggled on.
{{% /notice %}}

ITP offers an **ITP Debug Mode** in Safari, which logs debug messages about the domains ITP has classified, and the domains for which storage has been purged. 

## Classification of "known trackers"

## Third-party cookies

## First-party cookies

## Other third-party storage

## Other first-party storage

## Referrer
