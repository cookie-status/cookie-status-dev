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

| Detail                          | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| **Mechanism**                 | Shields                                                      |
| **Originally deployed in**    | 0.55.18                                                      |
| **Latest update deployed in** | [v1.1.20](https://brave.com/latest/)                         |
| **Latest update includes**    | [Removed known user tracking parameters from query strings](https://github.com/brave/brave-browser/issues/4239) |
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

{{% notice note %}}

**Example**: The user visits a site that tries to load the Google Analytics JavaScript library from `https://www.google-analytics.com/analytics.js`. This URL (and the entire domain, in fact), is listed in the [EasyPrivacy list](https://easylist.to/easylist/easyprivacy.txt). Thus Brave blocks the request, preventing the browser from downloading the library and executing the Google Analytics tracking code in the web browser.

{{% /notice %}}

By blocking requests upstream, it means that if the request initiated a resource download (such as a JavaScript library), this resource is never downloaded and thus the code is not executed in the user's browser. If the request initiated a pixel call (such as a GET for an image), it means the pixel call will be aborted before it is received by the endpoint.

## Third-party cookies

**All** third-party cookies are blocked by default.

{{< figure src="/images/content/brave-cookie-block.jpg" title="Brave uses \"cross-site\" interchangeably with \"third-party\" in this case" class="left-align" >}}

## First-party cookies

For cookies set with JavaScript's `document.cookie`, expiration is set to a maximum of **7 days**.

{{% notice note %}}

**Example**: The user visits a page that is running an A/B testing tool which stores the experiment details into a cookie named `__exp`. This cookie is set with **JavaScript**. Even though setting the cookie works, and the user is assigned to an experiment group successfully, if the user takes more than **7 days** to revisit the site, the cookie will have been expired and the user would potentially get assigned to a new, different group upon their next visit.

{{% /notice %}}

For cookies set with the `Set-Cookie` HTTP response header, expiration is set to a maximum of **6 months**.

## Other third-party storage

No restrictions.

{{% notice info %}}

Note that since Brave *blocks* resources found in their [classification lists](#classification-of-known-trackers), it has the downstream effect of blocking storage access from these vendors who now can't execute their JavaScript in the user's browser, or respond to the blocked HTTP requests.

{{% /notice %}}

## Other first-party storage

No restrictions.

{{% notice info %}}

Note that since Brave *blocks* resources found in their [classification lists](#classification-of-known-trackers), it has the downstream effect of blocking storage access from these vendors who now can't execute their JavaScript in the user's browser, or respond to the blocked HTTP requests.

{{% /notice %}}

## Referrer

Cross-site referrers are **spoofed** in non-navigational HTTP requests. 

{{% notice note %}}

**Example**: If the page on `https://domain.com/page` requests a resource from `https://anotherdomain.com/image.jpg`, the `referer` header in the HTTP requests will be set to the **referred-to** origin (`https://anotherdomain.com/`) rather than the **referred-from** origin (`https://domain.com/`) as is the typical behavior.

{{% /notice %}}

For top-level navigation, cross-site referrers are **stripped** entirely.

{{% notice note %}}

**Example**: When clicking a link from `https://domain.com/page` to `https://anotherdomain.com/another-page/`, the `referer` header is removed from the request. Similarly, the `document.referrer` will return an empty string once the user lands on `anotherdomain.com`.

{{% /notice %}}

For same-site requests (both navigational and non-navigational), referrer has **normal** behavior.

## Other

Brave [removes known tracker identifier parameters](https://github.com/brave/brave-browser/issues/4239) from third-party request URL strings. 

{{% notice note %}}

**Example**: If the browser sends a request to a third-party resource using something like `?fbclid=abcd-1234-efgh-5678` in the request URL, it's possible that this parameter will be stripped from the outgoing request so that the service receiving the request will not be able to access the data.

{{% /notice %}}
