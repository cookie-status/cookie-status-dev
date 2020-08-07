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

The Chrome browser doesn't currently have mechanisms designed specifically for tracking protection. With **Chrome 85** the default referrer policy of `strict-origin-when-cross-origin` will be rolled out, which could be considered Chrome's best default tracking protection to date.

{{% /notice %}}

The [privacy-sandbox](https://www.chromium.org/Home/chromium-privacy/privacy-sandbox) Chromium project promises initiatives related to tracking prevention, and Chrome has publicly stated intention to [making third-party cookies obsolete by 2022](https://blog.chromium.org/2020/01/building-more-private-web-path-towards.html).

## Classification of "known trackers"

Chrome does not classify classify trackers or domains for the purposes of tracking protection.

## Third-party cookies

Chrome does not restrict the use of third-party cookies.

{{% notice warning %}}
Chrome [plans to stop supporting third-party cookies by 2022](https://blog.chromium.org/2020/01/building-more-private-web-path-towards.html) and is already blocking them in Incognito mode [as of Chrome 83](https://venturebeat.com/2020/05/19/google-chrome-83/).
{{% /notice %}}

## First-party cookies

Chrome does not restrict the use of first-party cookies.

## Other third-party storage

Chrome does not restrict the use of other browser storage in third-party context.

## Other first-party storage

Chrome does not restrict the use of other browser storage in first-party context.

## Referrer

Chrome uses the default referrer policy of `no-referrer-when-downgrade`.
