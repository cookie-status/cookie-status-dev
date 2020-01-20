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
| **Latest update**             | [Documented 10 Dec 2019](https://webkit.org/blog/9661/preventing-tracking-prevention-tracking/) |
| **Latest update includes** | <ul><li>***All* cross-site request referrer headers are downgraded to origin**</li><li>**Cookie access blocked from *all* third-party requests where the domain has not received user interaction in first-party context**</li></ul> |
| **User controls**             | ITP **doesn't let users control** how it works. Users can simply toggle ITP off by unchecking "Prevent cross-site tracking" in Safari's Security preferences. |

{{< figure src="/images/content/safari-privacy-control.jpg" title="Privacy controls in Safari" class="left-align" >}}

## Classification of "known trackers"

Safari classifies domains capable of cross-site tracking using an **algorithm** that runs on-device. Thus each Safari user has a potentially different list of domains that are blocked from having access to browser storage.

The algorithm is superficially described in [this blog post](https://webkit.org/blog/7675/intelligent-tracking-prevention/): 

> A machine learning model is used to classify which top privately-controlled domains have the ability to track the user cross-site, based on the collected statistics. Out of the various statistics collected, three vectors turned out to have strong signal for classification based on current tracking practices: **subresource under number of unique domains**, **sub frame under number of unique domains**, and **number of unique domains redirected to**. All data collection and classification happens on-device.

If a domain is classified by Safari as having cross-site tracking capabilities, it will have several restrictions placed upon it, listed below.

{{% notice note %}}

**Example**: A website loads an iframe from `www.iframe-domain.com`. This is the first time the user's browser has loaded content from this domain in a frame. ITP does not yet react to this, as it's a single occurrence. Later, the user visits multiple different websites, all loading data from the same domain into an iframe. At this point, ITP classifies the domain as having cross-site capabilities, and the restrictions listed on this page will be put into effect.

{{% /notice %}}

To monitor the list of domains classified by your Safari instance, or to test ITP in action, you can utilize the **ITP Debug Mode**, with instructions for use found behind [this link](https://webkit.org/blog/9521/intelligent-tracking-prevention-2-3/).

## Third-party cookies

Safari has a number of different approaches to blocking third-party cookie access.

First, there's Safari's **default cookie policy**, which has been active since as early as 2003. The default policy prevents a third-party domain from setting cookies **if that domain hasn't already been "seeded" with a cookie in first-party context**.

{{% notice note %}}

**Example**: The user visits a website which sends a request to `www.third-party-domain.com`, which subsequently attempts to set a cookie in the HTTP response. Safari blocks this, as the user's browser has no cookies set on `www.third-party-domain.com` yet. If the user were to visit `www.third-party-comain.com` in first-party context (actually typing the URL in the browser omnibox), by setting a cookie in first-party context would relax this default cookie policy for this particular domain in future third-party requests.

{{% /notice %}}

Second, Safari blocks all third-party cookies if the user has not **interacted with the site in first-party context first**.

Finally, if the domain is classified as having **cross-site tracking capabilities**, third-party cookie access is blocked.

If the browser wants to access cookies on domains classified by ITP, it needs to utilize the [Storage Access API](https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API#Safari_implementation_differences) to prompt the user whether it is OK to share data with the third-party domain.

## First-party cookies

For first-party cookies set with JavaScript's `document.cookie` API, maximum expiration is set to **7 days**.

If the referring domain is a known tracker, and if the URL has query parameters (`?key=value`) or fragments (`#somevalue`), cookies set with JavaScript's `document.cookie` API have a maximum expiration of **24 hours**.

{{% notice note %}}

**Example**: The user follows a link from `www.facebook.com` (a known tracking domain), and lands on the website. Facebook appends an `?fbclid=123123123123` parameter to the URL. Because the referring URL is on a classified domain, and because the landing page has a query parameter, ITP sets a maximum expiration of **24 hours** to any cookies set with JavaScript while on that landing page.

{{% /notice %}}

First-party cookies set with the `Set-Cookie` HTTP response header are not impacted by ITP, and have no restrictions placed on their expiration.

## Other third-party storage

`localStorage` is partitioned, so that access is keyed to the combination of the source and target domains. Thus `www.domain.com` has a different `localStorage` store in third-party context when accessed from `www.domain1.com` and from `www.domain2.com`. This partitioned store is also cleared between application launches.

`IndexedDB` is restricted.

`sessionStorage` has no restrictions.

## Other first-party storage

If the referring domain is a known tracker, and if the URL has query parameters (`?key=value`) or fragments (`#somevalue`), then **all** non-cookie website storage in first-party context is restricted to maximum **7 days** lifetime since the last user interaction (click, tap, or text input) with the site.

{{% notice note %}}

**Example**: The user clicks a link on `www.known-tracker.com` (a classified domain), and the landing page URL is appended with the fragment `#abcd1234`. ITP sets the maximum lifetime of all non-cookie website storage (e.g. `localStorage`) to **7 days**, and the timer starts from the first interaction with the site. If the user doesn't interact with the site again for 7 days, all non-cookie storage is deleted.

{{% /notice %}}

If there is **no user interaction** with the first-party site, this type of storage is expired within few seconds.

## Referrer

Safari downgrades referrers for **all** non-navigational cross-site requests to their **origin**. Thus if a page on `https://www.domain.com/page/page.html` tried to load an image from `https://images.imagecdn.com`, the `referer` header would show `https://www.domain.com` rather than the full referrer.

Furthermore, if the referring domain is a known tracker, and if the *referring page* has query parameters (`?key=value`) or fragments (`#somevalue`), the `document.referrer` property is downgraded to **effective top-level domain plus one part** (eTLD+1). Thus a request originating from `https://sub.classified.domain.com/page?userId=abcd1234` would end up as `https://domain.com` in the `document.referrer` property of the landing page.

For navigational requests, `no-referrer-when-downgrade` applies.
