+++
title = "Firefox"
metatitle = "Firefox tracking protections"
date = 2019-11-21T15:33:28+02:00
weight = 25
logo = "firefox"
aliases = ["/firefox/current-status/", "/firefox/enhanced-tracking-protection/", "/firefox/useful-resources/"]
+++
## Current status

| Detail                          | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| **Mechanism**                 | Enhanced Tracking Protection (ETP)                                    |
| **Originally deployed in**    | [69.0](https://www.mozilla.org/en-US/firefox/69.0/releasenotes/)                                                     |
| **User controls**             | <ul><li>**Choose between Standard, Strict, and Custom levels**</li><li>**In Custom level, select which types of trackers and scripts to block**</li><li>**Add exceptions to the domains blocked by Enhanced Tracking Protection**</li><ul> |

{{< figure src="/images/content/etp-modes.jpg" title="Enhanced Tracking Protection levels" class="left-align" >}}

## Classification of "known trackers"

Firefox uses the [Disconnect.me](https://disconnect.me/trackerprotection) lists to establish the domains that fall under ETP measures.

Firefox utilizes the following Disconnect.me categories in ETP:

* **Advertising** - third-party cookies blocked
* **Analytics** - third-party cookies blocked
* **Cryptomining** - all third-party requests blocked
* **Fingerprinting** - third-party requests blocked [conditionally](#tracker-blocking)
* **Social** - third-party cookies blocked, and requests to social media trackers blocked

{{% notice note %}}

**Example**: If the browser sends a request to `www.facebook.com` (a known tracker), no cookies would be sent with the request.

{{% /notice %}}

Firefox deletes all stored site data (incl. cookies, browser storage) if the site is a known tracker and hasn't been interacted with in the last 45 days (see [First-party cookies](#first-party-cookies)).

## Blocking of known trackers {#tracker-blocking}

In the default **Standard** mode of Enhanced Tracking Protection, Firefox **blocks** requests to:

* **Social media trackers**: the most common trackers from Facebook, Twitter and LinkedIn that appear on other websites.
* **Cryptominers**.
* **Known fingerprinters**: domains that are in Disconnect.me's Fingerprinting category **and** in one of the tracking categories (Advertising, Analytics, or Social).

Other **tracking content**, such as ads and embedded videos with tracking code, still loads in the default mode, but its cross-site tracking cookies are blocked. Cookies that aren't used for cross-site tracking, such as login or shopping cart cookies, are still allowed.

{{% notice note %}}
**Example**: A site embeds a Facebook tracking script. Firefox blocks the request, so the script never loads. An analytics script from a domain listed under Analytics still loads, but it can't use its cross-site cookies.
{{% /notice %}}

{{< sources "tracker-blocking" >}}

## Third-party cookies

Third-party cookies are blocked for classified domains.

With [Total Cookie Protection](https://blog.mozilla.org/en/products/firefox/firefox-rolls-out-total-cookie-protection-by-default-to-all-users-worldwide/), Firefox **partitions** storage between the site and the third-party embedded on the site.

{{% notice note %}}
**Example**: If `siteA.com` tries to load a resource from `siteB.com`, the latter will have access (assuming it is not on the list of known trackers) to its cookies. However, these cookies are stored in a special **partition** keyed between `siteA.com` and `siteB.com`. If a second site, such as `siteC.com` loads a resource from `siteB.com`, the cookies the latter will have access to will not be the same as those available when embedded via `siteA.com`.
{{% /notice %}}

{{< sources "third-party-cookies" >}}

Since [Firefox 141](https://www.firefox.com/en-US/firefox/141.0/releasenotes/), Firefox also supports the `Partitioned` cookie attribute (CHIPS). Third-party cookies are partitioned anyway, so this mainly means developers can use the same cookie settings in all browsers.

Embedded content can ask for its unpartitioned cookies with the [Storage Access API](/glossary/#storage-access-api). Firefox only shows a prompt once an origin has asked for access on several sites, and it denies the request if the user hasn't used the embedded site as a first party in the last 30 days ([source](https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API)).

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

Since [Firefox 85](https://www.mozilla.org/en-US/firefox/85.0/releasenotes/), **network state** such as the HTTP cache is partitioned too, so trackers can't hide identifiers in cached files ("supercookies") and read them on other sites.

{{< sources "other-third-party-storage" >}}

## Other first-party storage

All storage is cleared (more or less) daily from origins that are known trackers and that haven't received a top-level user interaction (including scroll) within the last 45 days. More details can be found [here](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Privacy/Redirect_tracking_protection).

{{% notice info %}}

Note that domains in the Cryptomining category have all incoming requests blocked by Firefox, and thus scripts loaded from these domains will not be able to interact with other first-party storage. Similarly, domains that are both in the Fingerprinting and some other tracking category have incoming requests blocked and the downstream impact is the same.

{{% /notice %}}

## CNAME cloaking

No protections against CNAME cloaking.

## Fingerprinting

Since **Firefox 151** (May 2026), the default Standard mode also limits how much information about the device and browser is revealed to sites, a protection that was previously only in Strict mode. Mozilla says this reduces the number of users that common fingerprinting techniques can uniquely identify by about 14% on average, and by about 49% on macOS.

Firefox also [blocks requests](#tracker-blocking) to known fingerprinters.

On macOS Firefox, the version number in the User Agent string is frozen to `10.15` to fix compatibility issues with upgrading to macOS version 11+ (Big Sur). This has obvious privacy implications as well, as the platform version is no longer useful for fingerprinting purposes.

{{% notice info %}}
Sample User Agent string when running Firefox 88.0.1 on macOS 11.3.1:<br/>
`"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:88.0) Gecko/20100101 Firefox/88.0"`
{{% /notice %}}

{{< sources "fingerprinting" >}}

## Referrer

The default referrer policy is `strict-origin-when-cross-origin`. Sites can't loosen it for cross-site requests: in a test on 31 October 2026, a page with the `unsafe-url` policy still sent only its origin to another site.

{{% notice info %}}
Earlier versions of this page said that Firefox trims `document.referrer` to eTLD+1 when the referring URL has a tracking parameter such as `fbclid`. The same test found no such trimming: navigating from `https://www.example.com/?fbclid=123` to another site gave `https://www.example.com/`.
{{% /notice %}}

{{< sources "referrer" >}}

## Other

Nothing else to note for Firefox's default settings.
