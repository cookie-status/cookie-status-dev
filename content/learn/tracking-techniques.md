---
title: "Tracking techniques"
description: The techniques trackers use to follow people across sites, and how browsers respond to each.
weight: 40
toc: true
aliases: ["/introduction/summary-of-exploits/"]
---
Every technique on this page also has legitimate uses, which is why browsers can't simply switch them off. When a browser closes one route, trackers tend to move to the next, so the protections in the [comparison table](/) have grown roughly in the order of this page.

## Third-party cookies

The oldest technique: a tracker embedded on many sites sets a cookie with an identifier, and gets it back on every site that loads it. See [Cross-site tracking](/learn/basics/#cross-site-tracking) for how it works.

Ad tech companies also share identifiers with each other through [cookie syncing](/glossary/#cookie-matching--syncing): one tracker redirects to another with its identifier in the URL, so both can map their IDs for the same browser.

**How browsers respond:** Safari blocks third-party cookies, Firefox and Brave [partition](/learn/partitioning/) them, Edge blocks them for known trackers, and Chrome allows them. See [Cookies in third-party context](/features/third-party-cookies/).

## Link decoration

When third-party cookies don't work, a tracker can carry its identifier in the **URL** instead. A platform where the user is signed in adds an identifier to outgoing links:

```text
https://shop.example/product?fbclid=IwAR3x…
```

A script from the platform on the destination site reads the parameter and stores it in a **first-party cookie** on that site, where third-party cookie protections don't apply. Ad click IDs such as `gclid` and `msclkid` work the same way.

**How browsers respond:**

* **Brave** removes known tracking parameters from URLs.
* **Safari** limits cookies set by script on a page reached this way from a known tracker to 24 hours.
* Other browsers don't restrict it by default.

See [Cookies in first-party context](/features/first-party-cookies/) and [Other](/features/other/).

## Bounce tracking

Instead of linking straight to the destination, a link sends the user **through** a tracker's domain first, often too fast to notice:

```text
news.example → click → tracker.example/r?to=shop.example → shop.example
```

During the redirect, `tracker.example` is the top-level site, so it can read and write its own **first-party** cookies and see where the user came from and where they're going.

**How browsers respond:**

* **Safari** detects domains used for bounce tracking, including ones that add a delay to look like a normal page, and deletes their data.
* **Firefox** deletes the storage of known trackers that the user hasn't interacted with for 45 days.
* **Brave** skips known bounce trackers and goes straight to the destination ("debouncing").

## Fingerprinting

A **fingerprint** combines details the browser exposes, such as screen size, fonts, time zone, graphics hardware and how it draws to a `<canvas>`, into an identifier. It needs no storage, so cookie protections don't affect it, and the user can't delete it.

**How browsers respond:**

* **Brave** randomizes the values of commonly fingerprinted APIs per site and per session.
* **Firefox** and **Edge** block requests to known fingerprinting scripts, and Firefox also limits what the browser reveals about the device.
* Chromium-based browsers freeze some details of the User-Agent string.

See [Fingerprinting](/features/fingerprinting/).

## CNAME and IP cloaking

A site can point one of its own subdomains at a vendor's server, through a DNS **CNAME** record or simply an A record with the vendor's IP address:

```text
metrics.shop.example.  CNAME  shop-example.vendor.example.
```

Requests to `metrics.shop.example` look **first-party**: they get first-party cookies, including ones set with `Set-Cookie`, and they aren't matched by lists of third-party trackers.

The same setup is used for legitimate reasons, such as running your own [server-side tagging](/glossary/#server-side-tagging) on your own domain. The difference is who controls the server and the data.

**How browsers respond:**

* **Brave** looks up the CNAME record of each request and blocks it if it points to a known tracker.
* **Safari** limits cookies set by such subdomains to 7 days, both for CNAME records pointing to another site and for subdomains on an IP address that doesn't match the site's.

See [CNAME cloaking](/features/cname-cloaking/).

## Identity resolution

**Identity resolution** services build an *identity graph* that links identifiers such as hashed email addresses, phone numbers, IP addresses and device details, so they can recognize the same person on different sites and devices without a shared cookie. A site sends the identifiers it has, for example the hashed email of a signed-in user, to the service and gets back a shared ID.

**How browsers respond:** Safari 27 blocks cross-site requests to known identity resolution services. See [Blocking of known trackers](/features/tracker-blocking/).

## Referrer

The `Referer` header and `document.referrer` tell a site which page the user came from. A full URL can carry identifiers, search terms or other personal details in its path or query string.

**How browsers respond:** all browsers send only the origin of the referring page to other sites by default. Some don't let sites loosen this. See [Referrer](/features/referrer/).
