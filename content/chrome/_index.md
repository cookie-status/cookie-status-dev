+++
title = "Chrome"
metatitle = "Chrome tracking protections"
date = 2019-11-21T15:32:10+02:00
weight = 15
logo = "chrome"
aliases = ["/chrome/current-status/", "/chrome/privacy-sandbox/", "/chrome/privacy-sandobx/", "/chrome/useful-resources/"]
+++
## Current status

Chrome's initiative for browser tracking protections (among other things) was called [Privacy Sandbox](https://www.privacysandbox.com/). In April 2025, Google [announced](https://privacysandbox.google.com/blog/privacy-sandbox-next-steps) that Chrome would keep its current approach to third-party cookies: they stay enabled by default, and there won't be a separate prompt asking users to choose. In October 2025, Google [retired most of the remaining Privacy Sandbox technologies](https://privacysandbox.google.com/blog/update-on-plans-for-privacy-sandbox-technologies), such as Topics, Protected Audience and Attribution Reporting. Some protections from the project did ship and stay, such as **storage partitioning** and **CHIPS** (see below).

## Classification of "known trackers"

Chrome does not classify trackers or domains for the purposes of tracking protection.

## Blocking of known trackers {#tracker-blocking}

Chrome does not block requests to known trackers.

## Third-party cookies

Third-party cookies are **allowed** by default. Google has dropped its plan to restrict them ([source](https://privacysandbox.google.com/blog/privacy-sandbox-next-steps)).

Chrome restricts the maximum lifetime of cookies to 400 days.

Chrome supports an **opt-in** flag in cookies, `Partitioned;`. This is part of the **C**ookies **H**aving **I**ndependent **P**artitioned **S**tate proposal (CHIPS). Cookies with this flag can be accessed in third-party context, but they are partitioned between the site sending requests to the third-party and the third-party itself. Cookies in a partition cannot be accessed by other sites that also communicate with the same third-party. 

Chrome supports the [Storage Access API](/glossary/#storage-access-api) (Chrome 119+). Because third-party cookies are allowed by default, it mostly matters for users who block them.

## First-party cookies

Chrome restricts the maximum lifetime of cookies to 400 days. Other than that, Chrome does not restrict the use of first-party cookies.

<span id="third-party-storage"></span>

## Other third-party storage

Chrome **partitions** storage in embedded frames that load content from a cross-site origin.

{{% notice note %}}
**Example**: If `siteA.com` tries to load an iframe from `siteB.com`, the latter will have access to its storage (`localStorage`, for example). However, these storage mechanisms are **partitioned** between `siteA.com` and `siteB.com`. If a second site, such as `siteC.com` loads a frame from `siteB.com`, the storage the latter will have access to will not be the same as that available when embedded via `siteA.com`.
{{% /notice %}}


Since Chrome 86, the **HTTP cache** is also partitioned by top-level site, so a third party can't use cached files to recognize the same browser on different sites ([source](https://developer.chrome.com/blog/http-cache-partitioning)).

{{< sources "other-third-party-storage" >}}

## Other first-party storage

Chrome does not restrict the use of other browser storage in first-party context.

## CNAME cloaking

No protections against CNAME cloaking.

## Fingerprinting

Chrome has [reduced the User-Agent string](https://www.chromium.org/updates/ua-reduction/): the minor version, the platform version and the device model are frozen to fixed values. Sites that need these details can ask for them through **User-Agent Client Hints**. Chrome doesn't block fingerprinting scripts.

On macOS Chrome, the version number in the User Agent string is frozen to `10_15_7` to fix compatibility issues with upgrading to macOS version 11+ (Big Sur). This has obvious privacy implications as well, as the platform version is no longer useful for fingerprinting purposes.

{{% notice info %}}
Sample User Agent string when running Chrome 90.0.4430.212 on macOS 11.3.1:<br/>
`"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"`
{{% /notice %}}

## Referrer

Chrome 85 sets the default referrer policy to `strict-origin-when-cross-origin`. This means that for cross-origin requests (e.g. `sub.domain.com` to `othersub.domain.com`, or `sub.domain.com` to `sub.otherdomain.com`) the `referer` HTTP header and `document.referrer` JavaScript API are truncated to show just the **origin** of the website making the request. Thus a page such as `https://www.domain.com/some-page?param=value` would show up just as `https://www.domain.com` in the referrer records.

Sites can loosen this policy. A page with the `unsafe-url` policy sends its full URL to other sites.

{{< sources "referrer" >}}

## Other

Nothing else to note for Chrome's default settings.
