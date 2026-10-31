---
title: "What this means for you"
description: How browsers' tracking protections affect web development, analytics, advertising and experimentation, and what to do about it.
weight: 50
toc: true
aliases: ["/introduction/impact/"]
---
The methods used for cross-site tracking are often the same ones used for everyday features, so tracking protections affect much more than ad tech. This page sums up the practical effects for different roles. The [comparison table](/) has the details for each browser.

## Web development

### Embedded content and third-party cookies

If your site embeds content from another site, or your service is embedded on other sites (sign-in, comments, chat, payments, video), assume that **third-party cookies won't work** in at least Safari, Firefox and Brave:

* **For state that only needs to work on one site at a time**, such as a chat widget remembering its conversation on that site, set the cookie with the `Partitioned` attribute ([CHIPS](/glossary/#chips)). It works in Chrome, Edge, Firefox and Safari 26.2+, and Brave partitions third-party cookies anyway.
* **For state shared across sites**, such as being signed in to the embedded service, use the [Storage Access API](/glossary/#storage-access-api) from inside the frame, after the user interacts with it.
* **Other storage** (`localStorage`, IndexedDB) in third-party frames is [partitioned](/learn/partitioning/) in all five browsers, so it can't be used to work around this.

```http
set-cookie: chat_session=abc; Secure; SameSite=None; Partitioned; Path=/
```

### Your own cookies

* Set important cookies from your **server** with `Set-Cookie` rather than with JavaScript. Safari deletes script-set cookies and other script-writable storage after 7 days of browser use without interaction on your site.
* Use `Secure`, `HttpOnly` where scripts don't need the cookie, and an explicit `SameSite`.
* Don't expect any cookie to live longer than **400 days** in Chrome and Edge, or about **6 months** in Brave.
* Serve those cookies from servers on your own domain and infrastructure. In Safari, cookies set by a subdomain that points to another company's servers through a CNAME record, or that has an IP address unlike the main site's, are [capped at 7 days](/features/cname-cloaking/).

### Referrers

Other sites only see your origin, not the full URL, by default. Don't put anything sensitive in URLs anyway: some browsers let a page loosen the policy, and URLs end up in logs and analytics.

## Analytics

Most web analytics tools recognize returning visitors with an identifier in a **first-party cookie**. Tracking protections affect this in several ways:

* **Shorter visitor lifetimes in Safari.** If the analytics script sets its cookie with JavaScript, Safari deletes it after 7 days of browser use without interaction on your site, and after 24 hours on landing pages reached through a [decorated link](/glossary/#link-decoration) from a known tracker. Returning visitors then show up as **new users**, and attribution windows shrink.
* **Server-set cookies last longer**, as long as they come from your own servers. Moving identifier cookies to an HTTP response from your own domain, for example with [server-side tagging](/glossary/#server-side-tagging), preserves them in Safari, unless the server sits behind a CNAME to another company or on an IP address unlike your site's.
* **Blocked analytics in Brave.** Brave blocks requests to many analytics vendors outright, so their data has gaps for Brave users. Brave also removes some click IDs from landing page URLs.
* **Less detailed referrers.** Other sites send only their origin, so analytics sees `https://www.example.com/` as the source, not the exact page.

## Advertising

* **Third-party cookies** still work in Chrome and, for domains not on its tracker lists, in Edge. Elsewhere they're partitioned or blocked, which limits retargeting, frequency capping, view-through attribution and cookie syncing.
* **Click IDs** such as `gclid` and `fbclid` survive in most browsers, but Brave strips known ones, and Safari limits script-set cookies on pages reached through them from known trackers to 24 hours.
* **Identity resolution** services that link hashed emails and other identifiers are blocked in cross-site requests in Safari 27.
* **Privacy-preserving measurement:** Safari's [Private Click Measurement](https://webkit.org/blog/11529/introducing-private-click-measurement-pcm/) is on by default. Chrome's Privacy Sandbox APIs, such as Attribution Reporting and Topics, are being retired.

## Experimentation and personalization

A/B testing and personalization tools need to show a returning visitor the **same variant**. They have the same problems as analytics:

* If the tool stores the assignment with JavaScript, Safari users who return after 7 days of browser use without visiting may be assigned again, which mixes variants and adds noise to results.
* Assigning variants on the **server** and storing them in a server-set cookie avoids this.
* Tools that load from a third-party domain on a tracker list may be blocked in Brave, so those users never see a variant.
