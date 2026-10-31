---
title: Classification of "known trackers"
feature: classification-of-known-trackers
---
Many protections only apply to domains that a browser has decided are **trackers**. How a browser makes that decision matters as much as what it does afterwards: the same vendor can be a "known tracker" in one browser and an ordinary third party in another.

Browsers use two broad approaches:

* **Lists.** Firefox and Edge use the [Disconnect.me](https://disconnect.me/trackerprotection) lists, which sort tracking domains into categories such as Advertising, Analytics, Social, Fingerprinting and Cryptomining. Brave uses ad-blocking filter lists such as EasyList and EasyPrivacy. Lists are public and predictable, but they need maintaining and react slowly to new domains.
* **On-device classification.** Safari's Intelligent Tracking Prevention watches which domains show up as third parties on many different sites, or redirect the user through many sites, and classifies them on the device. Each Safari user can end up with a slightly different set of classified domains.

Chrome doesn't classify trackers for its default protections.
