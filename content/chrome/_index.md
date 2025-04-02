+++
title = "Chrome"
metatitle = "Chrome :: Current status"
date = 2019-11-21T15:32:10+02:00
weight = 15
chapter = false
logo = "chrome"
pre = "<b><i class=\"fab fa-chrome\"></i> </b>"
+++
## Current status

Chrome's initiative for browser tracking protections (among other things) is called [Privacy Sandbox](https://www.privacysandbox.com/). While Chrome's pledge to remove third-party cookies has been [put on hold](https://privacysandbox.com/news/privacy-sandbox-update/), the project includes many other interesting features, such as **storage partitioning** (see below).

## Classification of "known trackers"

Chrome does not classify classify trackers or domains for the purposes of tracking protection.

## Third-party cookies

Chrome restricts the maximum lifetime of cookies to 400 days.

Chrome supports an **opt-in** flag in cookies, `Partitioned;`. This is part of the **C**ookies **H**aving **I**ndependent **P**artitioned **S**tate proposal (CHIPS). Cookies with this flag can be accessed in third-party context, but they are partitioned between the site sending requests to the third-party and the third-party itself. Cookies in a partition cannot be accessed by other sites that also communicate with the same third-party. 

## First-party cookies

Chrome restricts the maximum lifetime of cookies to 400 days. Other than that, Chrome does not restrict the use of first-party cookies.

## Other third-party storage

Chrome **partitions** storage in embedded frames that load content from a cross-site origin.

{{% notice note %}}
**Example**: If `siteA.com` tries to load an iframe from `siteB.com`, the latter will have access to its storage (`localStorage`, for example). However, these storage mechanisms are **partitioned** between `siteA.com` and `siteB.com`. If a second site, such as `siteC.com` loads a frame from `siteB.com`, the storage the latter will have access to will not be the same as that available when embedded via `siteA.com`.
{{% /notice %}}


## Other first-party storage

Chrome does not restrict the use of other browser storage in first-party context.

## CNAME cloaking

No protections against CNAME cloaking.

## Referrer

Chrome 85 sets the default referrer policy to `strict-origin-when-cross-origin`. This means that for cross-origin requests (e.g. `sub.domain.com` to `othersub.domain.com`, or `sub.domain.com` to `sub.otherdomain.com`) the `referer` HTTP header and `document.referrer` JavaScript API are truncated to show just the **origin** of the website making the request. Thus a page such as `https://www.domain.com/some-page?param=value` would show up just as `https://www.domain.com` in the referrer records.

## Other

On macOS Chrome, the version number in the User Agent string is frozen to `10_15_7` to fix compatibility issues with upgrading to macOS version 11+ (Big Sur). This has obvious privacy implications as well, as the platform version is no longer useful for fingerprinting purposes.

{{% notice info %}}
Sample User Agent string when running Chrome 90.0.4430.212 on macOS 11.3.1:<br/>
`"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"`
{{% /notice %}}
