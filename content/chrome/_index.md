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

{{% notice warning %}}
The Chrome browser doesn't currently have mechanisms designed specifically for tracking protection.
{{% /notice %}}

The [privacy-sandbox](https://www.chromium.org/Home/chromium-privacy/privacy-sandbox) Chromium project promises initiatives related to tracking prevention, and Chrome has publicly stated intention to [making third-party cookies obsolete by 2022](https://blog.chromium.org/2020/01/building-more-private-web-path-towards.html).

## Classification of "known trackers"

Chrome does not classify classify trackers or domains for the purposes of tracking protection.

## Third-party cookies

Chrome does not restrict the use of third-party cookies.

## First-party cookies

Chrome does not restrict the use of first-party cookies.

## Other third-party storage

Chrome does not restrict the use of other browser storage in third-party context.

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