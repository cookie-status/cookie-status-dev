---
title: "Cookies, sites and context"
description: What cookies and other browser storage are, how origins and sites differ, what first-party and third-party context mean, and how cross-site tracking works.
weight: 10
toc: true
aliases: ["/introduction/tracking-protection/"]
---
Tracking protection is about **storage** and **context**: which site stores something in the browser, and on which sites it can read it back. This page covers the building blocks used throughout Cookie Status.

## Cookies

A **cookie** is a small piece of data, such as `uid=8f3a`, that the browser stores for a domain and sends back with later requests to it. The web is stateless, so cookies are how a site remembers a signed-in user, a shopping cart or a returning visitor.

A server sets a cookie with the `Set-Cookie` header in an HTTP response:

```http
HTTP/2 200
set-cookie: uid=8f3a; Max-Age=31536000; Path=/; Secure; HttpOnly; SameSite=Lax
```

A script on the page can set one with `document.cookie`:

```js
document.cookie = 'uid=8f3a; max-age=31536000; path=/'
```

On later requests to the same domain, the browser sends the cookie back in the `Cookie` header, and scripts on the page can read it from `document.cookie` (unless it was set with `HttpOnly`).

The attributes control where and how long the cookie is used:

| Attribute | What it does |
| --- | --- |
| `Domain` | Shares the cookie with subdomains. A cookie set on `example.com` with `Domain=example.com` is also sent to `shop.example.com`. A site can't set cookies for a different site. |
| `Path` | Limits the cookie to part of the site. |
| `Expires` / `Max-Age` | How long the cookie lives. Without them it's a *session cookie*, deleted when the browser decides the session is over. Browsers may [shorten](/features/first-party-cookies/) long lifetimes. |
| `Secure` | Only sent over HTTPS. |
| `HttpOnly` | Hidden from JavaScript. Only the server can read it. |
| `SameSite` | Whether the cookie is sent in requests from other sites: `Strict`, `Lax` or `None`. Chrome and Edge treat cookies without it as `Lax`. |
| `Partitioned` | Opts a third-party cookie in to [partitioning](/learn/partitioning/) ([CHIPS](/glossary/#chips)). |

## Other browser storage

Scripts can also store data in `localStorage`, `sessionStorage`, IndexedDB, the Cache API and service workers. These are scoped to an **origin** rather than a domain, and they're never sent to the server automatically. Together with `document.cookie`, they're what WebKit calls [script-writable storage](/glossary/#script-writable-storage): storage a script can write to, which also means a tracker's script can.

## Origins and sites

Two terms decide whether two URLs belong together:

* An **origin** is the scheme, host and port of a URL: `https://shop.example.com:443`. `https://example.com` and `https://shop.example.com` are different origins.
* A **site** is the scheme plus the *registrable domain*, also called [eTLD+1](/glossary/#etld1): the public suffix (such as `.com` or `.co.uk`) plus one more label. `https://example.com` and `https://shop.example.com` are the same site, `example.com`.

The list of public suffixes is the [Public Suffix List](https://publicsuffix.org/). It includes hosting domains such as `github.io`, so `alice.github.io` and `bob.github.io` are different sites.

| URL | Origin | Site (eTLD+1) |
| --- | --- | --- |
| `https://www.example.com/page` | `https://www.example.com` | `example.com` |
| `https://blog.shop.example.co.uk/` | `https://blog.shop.example.co.uk` | `example.co.uk` |
| `https://alice.github.io/` | `https://alice.github.io` | `alice.github.io` |

Most tracking protections are about **sites**, not origins: requests between subdomains of the same site are treated as first-party.

## First-party and third-party context

Cookies themselves aren't "first-party" or "third-party". What matters is the **context** they're used in, compared with the site in the address bar (the *top-level site*):

* **First-party context**: the cookie or storage belongs to the top-level site.
* **Third-party context**: it belongs to another site, for example an `<iframe>`, script, image or other request to another site that the page embeds or loads.

Say the user is on `https://www.example.com`:

| What happens | Context |
| --- | --- |
| The page loads an image from `images.example.com`. | First-party: same site. |
| A script on the page runs `document.cookie`. | First-party, even if the script file came from another site: scripts run as the page. |
| The page loads a script from `cdn.vendor.example`. The request carries `vendor.example`'s cookies. | Third-party. |
| The page embeds `https://booking.vendor.example` in an `<iframe>`, and the frame uses `document.cookie` or `localStorage`. | Third-party. |

The third row is the one that surprises people. A vendor's script loaded on your site runs in **your** first-party context: it can read and write your site's cookies, but not its own. The *request* that fetched the script, and any requests the script sends back to the vendor, are third-party.

## Cross-site tracking

**Cross-site tracking** links what a user does on different sites. The classic way uses a third-party cookie. [WebKit describes it like this](https://webkit.org/blog/7675/intelligent-tracking-prevention/):

> Imagine a user who first browses example-products.com for a new gadget and later browses example-recipies.com for dinner ideas. If both these sites load resources from example-tracker.com and example-tracker.com has a cookie stored in the user's browser, the owner of example-tracker.com has the ability to know that the user visited both the product website and the recipe website, what they did on those sites, what kind of web browser was used, et cetera.

Step by step:

```http
# on news.example, the page loads a pixel from tracker.example
GET https://tracker.example/pixel.gif
referer: https://news.example/
cookie: uid=8f3a

# later, on shop.example, the same pixel
GET https://tracker.example/pixel.gif
referer: https://shop.example/
cookie: uid=8f3a
```

The same `uid` arrives with both requests, so `tracker.example` knows the same browser visited both sites. Browsers counter this by [partitioning](/learn/partitioning/) or blocking third-party cookies, and trackers respond with other [techniques](/learn/tracking-techniques/).

The same mechanism also powers things users want, such as staying signed in to an embedded comment service or a single sign-on across a company's sites. That's why browsers' protections differ, and why many of them come with ways to get access back, such as the [Storage Access API](/glossary/#storage-access-api).
