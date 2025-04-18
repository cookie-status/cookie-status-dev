+++
title = "Firefox"
metatitle = "Firefox :: Current status"
date = 2019-11-21T15:33:28+02:00
weight = 25
chapter = false
logo = "firefox"
pre = "<b><i class=\"fab fa-firefox\"></i> </b>"
+++
## Current status

| Detail                          | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| **Mechanism**                 | Enhanced Tracking Protection (ETP)                                    |
| **Originally deployed in**    | [69.0](https://www.mozilla.org/en-US/firefox/69.0/releasenotes/)                                                     |
| **Latest update deployed in** | [June 14, 2022](https://blog.mozilla.org/en/products/firefox/firefox-rolls-out-total-cookie-protection-by-default-to-all-users-worldwide/) |
| **Latest update includes** | Total Cookie Protection rolled out to all users. |
| **User controls**             | <ul><li>**Choose between Standard, Strict, and Custom levels**</li><li>**In Custom level, select which types of trackers and scripts to block**</li><li>**Add exceptions to the domains blocked by Enhanced Tracking Protection**</li><ul> |

{{< figure src="/images/content/etp-modes.jpg" title="Enhanced Tracking Protection levels" class="left-align" >}}

## Classification of "known trackers"

Firefox uses the [Disconnect.me](https://disconnect.me/trackerprotection) lists to establish the domains that fall under ETP measures.

Firefox utilizes the following Disconnect.me categories in ETP:

* **Advertising** - third-party cookies blocked
* **Analytics** - third-party cookies blocked
* **Cryptomining** - all third-party requests blocked
* **Fingerprinting** - third-party requests blocked [conditionally](#other)
* **Social** - third-party cookies blocked

{{% notice note %}}

**Example**: If the browser sends a request to `www.facebook.com` (a known tracker), no cookies would be sent with the request.

{{% /notice %}}

Tracking Content blocking (enabled in **Private windows** by default) will not just strip cookies but actually **block** all resource requests to domains listed in Disconnect.me.

Firefox deletes all stored site data (incl. cookies, browser storage) if the site is a known tracker and hasn't been interacted with in the last 30 days.

## Third-party cookies

Third-party cookies are blocked for classified domains.

With [Total Cookie Protection](https://blog.mozilla.org/en/products/firefox/firefox-rolls-out-total-cookie-protection-by-default-to-all-users-worldwide/), Firefox **partitions** storage between the site and the third-party embedded on the site.

{{% notice note %}}
**Example**: If `siteA.com` tries to load a resource from `siteB.com`, the latter will have access (assuming it is not on the list of known trackers) to its cookies. However, these cookies are stored in a special **partition** keyed between `siteA.com` and `siteB.com`. If a second site, such as `siteC.com` loads a resource from `siteB.com`, the cookies the latter will have access to will not be the same as those available when embedded via `siteA.com`.
{{% /notice %}}

There are some edge cases where a partitioned third-party is granted unpartitioned access to its embedder. These involve pop-up windows and redirects, and you can read more about them [here](https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/State_Partitioning#storage_access_heuristics).

## First-party cookies

All storage is cleared (more or less) daily from origins that are known trackers and that haven't received a top-level user interaction (including scroll) within the last 45 days. More details can be found [here](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Privacy/Redirect_tracking_protection).

{{% notice info %}}

Note that domains in the Cryptomining category have all incoming requests blocked by Firefox, and thus scripts loaded from these domains will not be able to interact with first-party cookies. Similarly, domains that are both in the Fingerprinting and some other tracking category have incoming requests blocked and the downstream impact is the same.

{{% /notice %}}

## Other third-party storage

For classified domains, `localStorage` and `IndexedDB` are restricted.

{{% notice note %}}

**Example**: JavaScript running in an iframe, which loads content from a known tracking domain, tries to write to `localStorage` within that iframe. Firefox blocks this activity, because `localStorage` is disabled in third-party context if the domain is classified as a known tracking domain.

{{% /notice %}}

`sessionStorage` is not restricted.

With Total Cookie Protection, all browser storage is **partitioned** in third-party context. See the example [above](#third-party-cookies) for more information.

## Other first-party storage

All storage is cleared (more or less) daily from origins that are known trackers and that haven't received a top-level user interaction (including scroll) within the last 45 days. More details can be found [here](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Privacy/Redirect_tracking_protection).

{{% notice info %}}

Note that domains in the Cryptomining category have all incoming requests blocked by Firefox, and thus scripts loaded from these domains will not be able to interact with other first-party storage. Similarly, domains that are both in the Fingerprinting and some other tracking category have incoming requests blocked and the downstream impact is the same.

{{% /notice %}}

## CNAME cloaking

No protections against CNAME cloaking.

## Referrer

The default referrer policy is `strict-origin-when-cross-origin`. More relaxed policies are not permitted.

If the referring URL has a tracking parameter (e.g. `fbclid`), the `document.referrer` string is truncated to eTLD+1.

{{% notice note %}}
**Example**: If the user browses from `https://www.my.domain/purchase-page?fbclid=12345` to `https://www.my.domain/home-page/`, the `document.referrer` string will show just `https://my.domain/`.
{{% /notice %}}

## Other

If the domain is in the Fingerprinting category of Disconnect.me **and** in one of the tracking categories (Advertising, Analytics, or Social), all third-party **requests** to the domain are blocked.

On macOS Firefox, the version number in the User Agent string is frozen to `10.15` to fix compatibility issues with upgrading to macOS version 11+ (Big Sur). This has obvious privacy implications as well, as the platform version is no longer useful for fingerprinting purposes.

{{% notice info %}}
Sample User Agent string when running Firefox 88.0.1 on macOS 11.3.1:<br/>
`"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:88.0) Gecko/20100101 Firefox/88.0"`
{{% /notice %}}´
