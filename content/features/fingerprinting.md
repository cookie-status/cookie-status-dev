---
title: Fingerprinting
feature: fingerprinting
---
**Fingerprinting** identifies a browser by combining many small details it reveals: screen size, installed fonts, time zone, graphics hardware, how it draws text on a `<canvas>`, and so on. None of them is unique alone, but together they often are. Unlike a cookie, a fingerprint can't be deleted by the user.

Browsers counter it in three ways:

* **Blocking** known fingerprinting scripts (see [Blocking of known trackers](/features/tracker-blocking/)).
* **Reducing** what they reveal, for example by freezing version numbers in the User-Agent string.
* **Randomizing** values, so that each site sees a slightly different device.
