+++
title = "Safari"
metatitle = "Safari :: Current status"
date = 2019-11-21T15:33:32+02:00
weight = 30
chapter = false
logo = "safari"
pre = "<b><i class=\"fab fa-safari\"></i> </b>"
+++
## Current status

| Detail                          | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| **Mechanism**                 | Intelligent Tracking Prevention 2.3                          |
| **Originally deployed in**    | [Safari 13](https://developer.apple.com/documentation/safari_release_notes/safari_13_release_notes) in **iOS 13**, **macOS Catalina, Mojave, and High Sierra** |
| **User controls**             | ITP **doesn't let users control** how it works. Users can simply toggle ITP off by unchecking "Prevent cross-site tracking" in Safari's Security preferences. |

{{< figure src="/images/content/safari-privacy-control.jpg" title="Privacy controls in Safari" class="left-align" >}}

For a comprehensive overview of all WebKit's tracking preventions, see [this document](https://webkit.org/tracking-prevention/).

## Classification of "known trackers"

Since introducing the **Privacy Report** in **Safari 14**, Safari has been using the [Tracker Radar](https://github.com/duckduckgo/tracker-radar) to classify origins as "known trackers". This is mainly used to provide content for the Privacy Report, and has no real functional value. However, Safari's [IP obfuscation](#other), released in Safari 15, utilizes these "known trackers" to determine in which requests the user's IP address should be obfuscated.

Other than the above, Safari classifies domains capable of cross-site tracking using an **algorithm** that runs on-device. Thus each Safari user has a potentially different list of domains that are blocked from having access to browser storage.

The algorithm is superficially described in [this blog post](https://webkit.org/blog/7675/intelligent-tracking-prevention/): 

> A machine learning model is used to classify which top privately-controlled domains have the ability to track the user cross-site, based on the collected statistics. Out of the various statistics collected, three vectors turned out to have strong signal for classification based on current tracking practices: **subresource under number of unique domains**, **sub frame under number of unique domains**, and **number of unique domains redirected to**. All data collection and classification happens on-device.

If a domain is classified by Safari as having cross-site tracking capabilities, it will have several restrictions placed upon it, listed below.

{{% notice note %}}

**Example**: A website loads an iframe from `www.iframe-domain.com`. This is the first time the user's browser has loaded content from this domain in a frame. ITP does not yet react to this, as it's a single occurrence. Later, the user visits multiple different websites, all loading data from the same domain into an iframe. At this point, ITP classifies the domain as having cross-site capabilities, and the restrictions listed on this page will be put into effect.

{{% /notice %}}

To monitor the list of domains classified by your Safari instance, or to test ITP in action, you can utilize the **ITP Debug Mode**, with instructions for use found behind [this link](https://www.simoahava.com/privacy/itp-debug-mode-in-safari/).

## Third-party cookies

Safari blocks **all** access to cookies in third-party context.

### Storage Access API

Safari introduced the [Storage Access API](https://webkit.org/blog/8124/introducing-storage-access-api/) in February 2018. With the Storage Access API, a website can ask the user's permission to access storage in an embedded cross-site resource which would otherwise have its cookie access restricted. 

To be able to use the Storage Access API, the embedded site must have been interacted with in first-party context (URL in address bar) in the last 30 days of Safari use. 

{{% notice note %}}
**Example**: The user is on `www.blog-site.com`, which loads a comment service in an `<iframe>` from `www.comment-service.com`. Since this is a cross-site resource load, ITP will not allow storage access due to the site not having prior cookies set (Safari's default cookie policy), and because the user hasn't interacted with the site in first-party context in the last 30 days of Safari use.
{{% /notice %}}

{{< figure src="/images/content/storage-access-api.jpg" title="Requesting storage access via the API" class="left-align" >}}

If the user *has* interacted with the embedded site in first-party context in the last 30 days of Safari use, and the site has cookies set, the site can call the Storage Access API upon a user interaction in the embed (such as a click or tap), after which Safari will prompt the user if they want to allow the embedded site to access its storage.

{{% notice note %}}
**Example**: The user visits `www.comment-service.com`, and logs into the service. The service sets a cookie in first-party context to save the user's login state. Then, the user browses to `www.blog-site.com`, which embeds `www.comment-service.com` in an `<iframe>`. In the `<iframe>`, the user clicks a button which initiates a login state check on `www.comment-service.com`. This time, `www.comment-service.com` uses the Storage Access API, and the user is prompted if they want to allow `www.comment-service.com` to access its first-party storage. If the user allows it, the embedded site will have access to its cookies, even though it is running in a third-party context.
{{% /notice %}}

If the user doesn't interact with the site again in first-party context in 30 days of Safari use, Safari will clear all storage from the embedded site, and prevent any new storage from being set. This will continue until the user interacts with the site in first-party context again.

{{% notice info %}}
Note that **successful use of the Storage Access API** (either clicking "Allow" on the prompt, or interacting with the embed *after* having clicked "Allow" previously) is interpreted as interaction in first-party context, which means the 30 day timer is reset in such scenarios! This allows the embed to keep accessing its first-party storage even if the user doesn't visit the embedded site in first-party context.
{{% /notice %}}

## First-party cookies

Safari deletes **all script-writable storage** on websites if the site has not been **interacted with** (click, tap, keyboard input) in first-party context in the last **7 days of browser use**. This includes cookies set with `document.cookie`.

{{% notice note %}}

**Example**: The user visits `www.domain.com`, where JavaScript is used to set a cookie that expires in 365 days. Over the next 100 days, the user uses the browser 6 times in total, but does not visit `www.domain.com` or interact with the site. If the user uses the browser one more time without interacting with `www.domain.com`, the cookie will be deleted even if its expiration date is not met.

{{% /notice %}}

If the referring domain is a known tracker, and if the URL has query parameters (`?key=value`) or fragments (`#somevalue`), cookies set with JavaScript's `document.cookie` API have a maximum expiration of **24 hours**.

{{% notice note %}}

**Example**: The user follows a link from `www.facebook.com` (a known tracking domain), and lands on the website. Facebook appends an `?fbclid=123123123123` parameter to the URL. Because the referring URL is on a classified domain, and because the landing page has a query parameter, ITP sets a maximum expiration of **24 hours** to any cookies set with JavaScript while on that landing page.

{{% /notice %}}

First-party cookies set with the `Set-Cookie` HTTP response header are not impacted by ITP, and have no restrictions placed on their expiration, unless they meet the criterion for [CNAME cloaking (see below)](#cname-cloaking)..

## Other third-party storage

`localStorage` is partitioned, so that access is keyed to the combination of the source and target domains. Thus `www.domain.com` has a different `localStorage` store in third-party context when accessed from `www.domain1.com` and from `www.domain2.com`. This partitioned store is also cleared between application launches.

`sessionStorage` is partitioned in a similar way ([source](https://github.com/firebase/firebase-js-sdk/issues/6716#issuecomment-1416793915)).

`IndexedDB` is restricted.

## Other first-party storage

All script-writable storage is deleted in **7 days of browser use** since last interaction with the site (click, tap, or text input). This includes these mechanisms:

* Cookies set with `document.cookie` (see [above](#first-party-cookies)).
* IndexedDB
* LocalStorage
* Media Keys
* SessionStorage
* Service Worker registrations and cache

## CNAME cloaking

If a subdomain has a CNAME alias to a cross-site origin, then any cookies set with `Set-Cookie` HTTP response headers will be restricted to a maximum 7 day expiration.

If a subdomain is set with A/AAAA records that resolve to an IP address where the **first half** of the address does **not** match the first half of the IP address for the website the user is currently browsing, then any cookies set with `Set-Cookie` HTTP repsonse headers will be restricted to a maximum 7 day expiration.

{{% notice note %}}
**Example:** A site on `https://domain.example` uses the subdomain `https://tracker.domain.example` to set cookies in order to avoid WebKit's restrictions on [script-writable first-party storage](#first-party-cookies). However, `https://tracker.domain.example/` has a CNAME alias to `https://domain.cloud.endpoint`, where the web server handling this logic resides. On desktop Safari (on Big Sur) and all major iOS and iPadOS browsers, any cookies set with HTTP responses from `https://tracker.domain.example` will now be restricted to an expiration of maximum 7 days.
{{% /notice %}}

{{% notice note %}}
**Example:** The user is browisng `https://domain.example` which resolves to an IP address of `100.100.100.100`. The website makes a request to `https://tracker.domain.example` which resolves to an IP address of `200.200.200.200`. On the Safari browser, any cookies set with HTTP responses from `https://tracker.domain.example` will be restricted to an expiration of maximum 7 days.
{{% /notice %}}

## Referrer

Safari downgrades `document.referrer` to **origin** in cross-site navigation.

Safari downgrades the referrer in cross-site request headers to **origin**. Thus if a page on `https://www.domain.com/page/page.html` tried to load an image from `https://images.imagecdn.com`, the `referer` header would show `https://www.domain.com` rather than the full referrer.

Furthermore, if the referring domain is a known tracker, and if the *referring page* has query parameters (`?key=value`) or fragments (`#somevalue`), the `document.referrer` property is downgraded to **effective top-level domain plus one part** (eTLD+1). Thus a request originating from `https://sub.classified.domain.com/page?userId=abcd1234` would end up as `https://domain.com` in the `document.referrer` property of the landing page.

> Note that the above restrictions only apply if the site tries to set a Referrer Policy of `unsafe-url` or `no-referrer-when-downgrade`. In other words, Safari effectively prevents the referrer policy from being relaxed so that anything beyond the origin is sent in cross-site requests.

Safari has the default Referrer Policy of `strict-origin-when-cross-origin`.

## Other

Safari also protects against **first-party bounce tracking**. Bounce tracking happens when instead of navigating the user directly to the target domain, the user is redirected through intermediate domains which can set cookies and build a profile of the user. Intelligent Tracking Prevention detects when domains are used solely for bounce tracking and clears all website data that might have been saved on them.

Similarly, Safari protects against **tracker collusion**, where multiple tracking domains in a redirect chain can feed information to each other to build a comprehensive profile of the user. If one domain in this chain is classified as having cross-site tracking capabilities, then all domains in the redirect chain will be classified as well.

With **Safari 14**, WebKit's [tracking preventions](https://webkit.org/tracking-prevention/) are extended to **all** browsers running on the iOS platform. There is no way for the browser or any app using the browser to toggle these protections off. Only the user can opt-out of cross-site tracking protections.

WebKit browsers also delete **all site data** (script-writable storage, all cookies) if the site domain has been classified by ITP and if there has been no meaningful interaction with the site in first-party context in the last 30 days. Granted access through Storage Access API resets the timer as well.

With **Safari 15**, the browser hides the user's actual IP address in requests sent to origins that are listed in DuckDuckGo's [Tracker Radar](https://github.com/duckduckgo/tracker-radar) list. 

On macOS Safari, the version number in the User Agent string is frozen to `10_15_7` to fix compatibility issues with upgrading to macOS version 11+ (Big Sur). This has obvious privacy implications as well, as the platform version is no longer useful for fingerprinting purposes.

{{% notice info %}}
Sample User Agent string when running Safari 14.1 on macOS 11.3.1:<br/>
`"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Safari/605.1.15"`
{{% /notice %}}
