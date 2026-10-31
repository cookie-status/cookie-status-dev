+++
title = "Brave"
metatitle = "Brave tracking protections"
date = 2019-11-21T15:32:10+02:00
weight = 10
logo = "brave"

aliases = ["/brave/current-status/", "/brave/shields/", "/brave/useful-resources/"]
+++
## Current status

| Detail                          | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| **Mechanism**                 | Shields                                                      |
| **Originally deployed in**    | 0.55.18                                                      |
| **User controls**             | Site-specific and global controls for: <ul><li>**Cross-site tracker blocking**</li><li>**Automatic connection upgrade to HTTPS**</li><li>**Script blocking**</li><li>**Cookie blocking**</li><li>**Device recognition blocking**</li> |

{{< figure src="/images/content/brave-blocking-general.jpg" title="Brave Shields default settings" class="left-align" >}}

## Classification of "known trackers"

Brave classifies tracking domains using input from multiple **lists**:

* [EasyList](https://easylist.to/easylist/easylist.txt)
* [EasyPrivacy](https://easylist.to/easylist/easyprivacy.txt)
* [uBlock Origin Unbreak](https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/unbreak.txt)
* [uBlock Origin Filters](https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt)
* [uBlock Origin Filters - Privacy](https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/privacy.txt)
* [Brave's own Unbreak list](https://raw.githubusercontent.com/brave/adblock-lists/master/brave-unbreak.txt)
* [Brave's own cryptominer list](https://raw.githubusercontent.com/brave/adblock-lists/master/coin-miners.txt)
* [Brave's fork of Disconnect.me](https://raw.githubusercontent.com/brave/adblock-lists/master/brave-disconnect.txt)

Brave matches each outgoing request from the web browser against these lists (using various methods for achieving [optimized performance](https://brave.com/improved-ad-blocker-performance/)), and if a match is made, the request is **blocked**.

**Note!** If the resource that should be blocked is **same-site** to the site the user is browsing, the request will **not** be blocked. Thus if the user is browsing `www.domain.com` and the browser sends a request to `blocked-tracker.domain.com` (which **is** in Brave's filter lists), the request will not be blocked.

{{% notice note %}}

**Example**: The user visits a site that tries to load the Google Analytics JavaScript library from `https://www.google-analytics.com/analytics.js`. This URL (and the entire domain, in fact), is listed in the [EasyPrivacy list](https://easylist.to/easylist/easyprivacy.txt). Thus Brave blocks the request, preventing the browser from downloading the library and executing the Google Analytics tracking code in the web browser.

{{% /notice %}}

By blocking requests upstream, it means that if the request initiated a resource download (such as a JavaScript library), this resource is never downloaded and thus the code is not executed in the user's browser. If the request initiated a pixel call (such as a GET for an image), it means the pixel call will be aborted before it is received by the endpoint.

{{< sources "classification-of-known-trackers" >}}

## Blocking of known trackers {#tracker-blocking}

With Shields at their default **Standard** level, Brave **blocks** third-party requests that match its [filter lists](#classification-of-known-trackers). This covers ads, trackers and cryptominers, and also known fingerprinting services: Brave says it blocks requests to fingerprint.com's domains and other known fingerprinting services.

Requests that are **same-site** with the page the user is browsing are not blocked (see the note [above](#classification-of-known-trackers)).

Some scripts are not blocked outright but **replaced** with a stripped-down version that keeps the page working, for example so that a site calling a missing analytics function doesn't break.

{{< sources "tracker-blocking" >}}

## Third-party cookies

**All** third-party cookies are blocked by default in subresource requests (e.g. CDN loads, pixel pings).

{{< figure src="/images/content/brave-cookie-block.jpg" title="Brave uses \"cross-site\" interchangeably with \"third-party\" in this case" class="left-align" >}}

In frames (e.g. `<iframe>`), access is **partitioned** and set to **site-length** expiration.

**Partitioned access** means that the `document.cookie` API will work in a cross-site `<iframe>`, but the storage will be unique between the site embedding the frame and the frame itself. Another site embedding the same frame would have a different storage profile.

**Site-length** expiration means that shortly after the last page of the site embedding the cross-site frame is closed, the partitioned storage is cleared. Brave waits about 30 seconds, so that sign-in flows that briefly leave the site keep working. This is different to how e.g. Safari works, where the storage is cleared only upon the browser being closed (this clears the storage also in Brave).

{{< sources "third-party-cookies" >}}

## First-party cookies

Cookies have a maximum expiration of about **6 months**. This applies to cookies set with JavaScript's `document.cookie` and with the `Set-Cookie` HTTP response header alike.

{{% notice note %}}

**Example**: The user visits a page that is running an A/B testing tool which stores the experiment details into a cookie named `__exp`, with an expiration of one year. Brave shortens the expiration to about 6 months. If the user returns after 7 months, the cookie is gone and the user may be assigned to a new, different group.

{{% /notice %}}

{{% notice info %}}
Earlier versions of this page said that cookies set with `document.cookie` expire in 7 days. That is no longer the case: in a test on 30 October 2026, a one-year cookie set with `document.cookie` was capped at the same 6 months as one set with `Set-Cookie`.
{{% /notice %}}

{{< sources "first-party-cookies" >}}

## Other third-party storage

**Partitioned** and **site-length** expiration for `localStorage` and `sessionStorage` APIs (see [Third-party cookies](#third-party-cookies) for more information).

{{% notice info %}}

Note that since Brave *blocks* resources found in their [classification lists](#classification-of-known-trackers), it has the downstream effect of blocking storage access from these vendors who now can't execute their JavaScript in the user's browser or respond to the blocked HTTP requests.

{{% /notice %}}

## Other first-party storage

No restrictions.

{{% notice info %}}

Note that since Brave *blocks* resources found in their [classification lists](#classification-of-known-trackers), it has the downstream effect of blocking storage access from these vendors who now can't execute their JavaScript in the user's browser, or respond to the blocked HTTP requests.

{{% /notice %}}

## CNAME cloaking

Brave Shields blocks network requests to domains in Brave's blocklists. With version 1.17.73, Brave now also resolves the DNS of any given domain and identifies if there are [**CNAME records**](https://medium.com/nextdns/cname-cloaking-the-dangerous-disguise-of-third-party-trackers-195205dc522a) pointing to domains that are in the [blocklists](/brave/#classification-of-known-trackers), and blocks these as a result, too.

{{% notice note %}}

**Example**: The web page sends a pixel request to `https://measure.example`. This domain is **not** in Brave's blocklist, so Brave would normally allow the network request to complete. However, `measure.example` is a CNAME record which actually points to `track.everything`, which **is** in Brave's blocklist. As the domain the CNAME points to is in Brave's blocklist, Brave blocks the initial request to `https://measure.example` as a consequence.

{{% /notice %}}

## Fingerprinting

Brave has lots of initiatives for [neutralizing fingerprinting surfaces](https://brave.com/brave-fingerprinting-and-privacy-budgets/). By default, it **randomizes** the values returned by APIs that are commonly used for fingerprinting, such as the [HTML canvas](https://github.com/brave/brave-browser/issues/5614). The random seed changes per site and per session, so the same device looks different on each site and after a restart. Highly identifying APIs are blocked, as are browser-language and font fingerprinting.

Known fingerprinting services are also [blocked outright](#tracker-blocking).

On macOS Brave, the version number in the User Agent string is frozen to `10_15_7` to fix compatibility issues with upgrading to macOS version 11+ (Big Sur). This has obvious privacy implications as well, as the platform version is no longer useful for fingerprinting purposes.

{{% notice info %}}
Sample User Agent string when running Brave 1.24.85 on macOS 11.3.1:<br/>
`"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"`
{{% /notice %}}

{{< sources "fingerprinting" >}}

## Referrer

For cross-origin subresource and navigational HTTP requests, Brave defaults to the `strict-origin-when-cross-origin` Referrer Policy. Brave prevents the policy from ever being more relaxed than this, so even if a policy of e.g. `unsafe-url` is used, cross-origin requests would still have the referrer set to just the origin of the referring page.

{{% notice note %}}

**Example**: When clicking a link from `https://domain.com/page` to `https://anotherdomain.com/another-page/`, the `referer` header is set to `https://domain.com`. Similarly, the `document.referrer` will be set to `https://domain.com` once the user lands on `anotherdomain.com`.

{{% /notice %}}

For same-site requests (both navigational and non-navigational), referrer has **normal** behavior.

{{< sources "referrer" >}}

## Other

Brave also **skips known bounce trackers** ("[debouncing](https://brave.com/privacy-updates/11-debouncing/)"). If a link goes through a known tracking domain on its way to the real destination, Brave navigates straight to the destination, so the tracking domain never sees the visit.

Brave [removes known tracker identifier parameters](https://github.com/brave/brave-core/blob/master/browser/net/brave_site_hacks_network_delegate_helper.cc#L29) from URL strings. On top-level navigation (e.g. landing on a page with such parameters in the URL), the parameters are stripped out in a 307 internal redirect. On non-navigational HTTP requests, the parameter is stripped from the request URL.

Here is the list of parameters that are stripped:

* `__hssc` (HubSpot)
* `__hstc` (HubSpot)
* `__hsfp` (HubSpot)
* `__s` (Drip)
* `_hsenc` (HubSpot)
* `_openstat` (OpenStat)
* `dclid` (Google)
* `fbclid` (Facebook)
* `gbraid` (Google)
* `gclid` (Google)
* `hsCtaTracking` (HubSpot)
* `igshid` (Instagram)
* `mc_eid` (Mailchimp)
* `ml_subscriber` (MailerLite)
* `ml_subscriber_hash` (MailerLite)
* `msclkid` (Microsoft)
* `oly_anon_id` (Olytics)
* `oly_enc_id` (Olytics)
* `rb_clickid`
* `s_cid` (Adobe)
* `twclid` (Twitter)
* `vero_conv` (Vero)
* `vero_id` (Vero)
* `wbraid` (Google)
* `wickedid` (Wicked)
* `yclid` (Yandex/Yahoo)

{{% notice note %}}

**Example**: If the user types `https://www.domain.com/?fbclid=1.2.3.4` in the omnibox and presses enter, Brave strips the parameter in an internal redirect. Similarly, if the browser makes a request to `https://www.domain.com/tracking-pixel.gif?mc_eid=23456`, Brave strips the parameter out of the request before it hits the target server.

{{% /notice %}}

