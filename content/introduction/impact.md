---
title: "Impact"
date: 2019-11-21T15:29:14+02:00
weight: 11
draft: false
toc: true
---
The tracking protection measures taken by browsers have a widespread impact on a variety of things, including **web development**, **advertising** and **marketing technologies**, **digital analytics**, and **user experience optimization**.

Websites use cookies and other browser storage for a plethora of things, such as persisting login state, preserving items in a shopping cart, and for presenting tailored experiences in a first-party context, based on what the user has done while visiting the site.

Similarly, digital analytics uses anonymous/pseudonymous identifiers stored in first-party cookies to identify the hits collected across a span of time as coming from the same browser instance.

The methods used for **cross-site tracking** are often *indistinguishable* from those harnessed for more mundane purposes. Thus tracking protection measures tend to disrupt regular functionality of the web while seeking to eradicate malicious tracking.

## Web development

Websites regularly utilize cookies in both **first-party** and **third-party context** for persisting user authentication, for storing **marketing consent**, for identifying active **sessions**, and for operating with `<iframe>` elements that embed content from other sites.

### Cookies in third-party context

Because browsers like [Edge](/edge/) and [Firefox](/firefox/) use lists (Trust Protection Lists and Disconnect.me, respectively) to collect information about *known trackers*, it's unlikely that any regular website would get their domain blacklisted. It would require that domain to participate in a tracking scheme, and for some public push to get the domain classified as a tracking domain.

{{< figure src="/images/content/disconnect-me-list.jpg" title="Beginning of the Disconnect.me entity list" class="left-align shadow" >}}

On browsers like these, using their default tracking protection settings, websites could still continue to operate efficiently with third-party cookies.

However, **Safari**, in introducing [Intelligent Tracking Prevention](/safari/intelligent-tracking-prevention/), can block cookies in a third-party context for domains that don't actually participate in cross-site tracking. Since Safari **algorithmically** classifies domains on a browser-by-browser basis, it's entirely possible that a regular domain owned by the organization would get classified and thus have its cookies blocked when accessed in a third-party context.

{{% notice info %}}
Safari describes the classifier [like this](https://webkit.org/blog/7675/intelligent-tracking-prevention/): **Out of the various statistics collected, three vectors turned out to have strong signal for classification based on current tracking practices: subresource under number of unique domains, sub frame under number of unique domains, and number of unique domains redirected to.**
{{% /notice %}}

Because of this, websites that require third-party cookies should utilize the Storage Access API to get user's consent to access first-party storage for a classified domain.

{{< figure src="/images/content/storage-access-api.jpg" title="Requesting storage access via the API" class="left-align" >}}

### Cookies in first-party context

With browsers such as Chrome, Edge, and Firefox, the first-party context is unimpacted when it comes to tracking protection.

With **Safari**, *script-writable storage* is impacted by Intelligent Tracking Prevention.

* Cookies set with JavaScript (`document.cookie`) have a maximum expiration of 7 days or 24 hours, depending on where the user navigated from to the current page.
* Other script-writable storage is restricted to 7 days in similar navigational scenarios.

This means that websites **should avoid setting cookies with JavaScript where possible**, and they should similarly avoid leveraging **other script-writable storage** for long-term persistence.

{{% notice warning %}}
Cookies should never be used to store or send confidential information. They are inherently insecure, regardless of what flags are set when they are created.
{{% /notice %}}

Websites should set business-critical cookies with the `Set-Cookie` header using the [`SameSite`](https://www.owasp.org/index.php/SameSite) and [`Secure`](https://www.owasp.org/index.php/SecureFlag) flags. If the cookie does not need to be accessed by JavaScript, then the [`HttpOnly`](https://www.owasp.org/index.php/HttpOnly) flag should be set as well.

By setting the cookie in an HTTP response, it is unimpacted by Intelligent Tracking Prevention's restrictions on first-party storage.

### Referrer downgrade

With **cross-origin** requests, browsers are moving to a stricter default policy of [stripping the referrer to its origin](https://www.chromestatus.com/feature/6251880185331712), thus removing all path, query, and fragment identifiers from it.

Safari is taking an even stricter stance, stripping [all cross-origin referrers](https://bugs.webkit.org/show_bug.cgi?id=201353) to their origin, but also downgrading referrers to eTLD+1 (so `www.mysite.com/path` becomes `mysite.com`) when the navigation source is a classified domain with URL decoration.

{{< figure src="/images/content/safari-referrer-downgrade.jpg" title="Navigation from www.gtmtools.com (a classified domain) becomes a referrer string that's stripped to eTLD+1" class="left-align" >}}  

{{% notice info %}}
Because of the unreliability of the referrer, websites should avoid placing too much importance on interpreting what is stored in the referrer string, especially when using JavaScript's `document.referrer`.
{{% /notice %}}

The Brave browser has adopted an [*even* stricter stance](https://github.com/brave/brave-browser/wiki/Blocking-goals-and-policy#blocking-techniques-and-methods), where they opt to **spoof** the referrer on cross-origin requests: 

> Second, Brave modifies the referrer header when making cross origin requests. Brave "lies" on these requests, and says the request was being issued from the same domain being requested, instead of the true, cross-domain origin.

## Advertising and marketing technologies

For AdTech vendors relying on storage access in third-party context, there are some tough times ahead. With Safari, Edge, and Firefox blocking third-party cookies for known trackers, it doesn't take much for a vendor to be blacklisted or classified as a tracker, leading to severely handicapped tracking capabilities. 

Vendors are becoming more **outspoken** in their attempts to work around browser restrictions. [Some companies are approaching site owners](https://medium.com/nextdns/cname-cloaking-the-dangerous-disguise-of-third-party-trackers-195205dc522a) with instructions on how to setup CNAME redirects and reverse proxies to avoid ad blockers from preventing data collection. The ethical nature of such approaches is questionable at best.

Even advertising that takes place in a **first-party context** (such as Google's [search ads](https://support.google.com/google-ads/answer/1722047?hl=en)) is being hampered by browsers' efforts. Safari's **Intelligent Tracking Prevention** [reduces the maximum expiration for cookies and browser storage](https://webkit.org/blog/9521/intelligent-tracking-prevention-2-3/) if the user navigates to the site from an ad click, and if the source of the navigation is a known tracker (e.g. Facebook or Google). Thus the site's capability to attribute a conversion taking place in the near future to the ad click is compromised.

In short, for vendors requiring browser storage access in **third-party context**, these broad impacts can be observed:

* Ability to **build graphs and profiles** of users is restricted.
* Ability to **target ads** based on graphs and profiles of users is restricted.
* Ability to **manage ad frequency** is restricted.
* Ability to **model attribution for view-through conversions** is restricted.
* Ability to **participate in cookie matching** is restricted.
* Ability to **provide demographics and interest data for analytics systems** is restricted.

For vendors needing browser storage access in **first-party context**, these handicaps are in place:

* Ability to **attribute conversions to ad clicks** is somewhat restricted.
* Ability to **measure efficiency of advertising** is somewhat restricted.
* Ability to **look back beyond the last touch in attribution models** is somewhat restricted.

{{% notice info %}}
**"Somewhat restricted"** above refers to the fact that out of the major browsers, only Safari is currently restricting first-party storage access. Thus the severity of these restrictions depends on the typical share of Safari traffic on the advertised website.
{{% /notice %}}

## Digital analytics

Digital analytics is an industry that measures, among other things, the **effectiveness** and **return on investment** of advertising.

There are analytics ventures that rely on **cross-site tracking** to analyze how uses are navigating across the websites of the internet, though much of this analytics is often done in addition to the primary focus of targeted advertising.

However, there is an industry of **first-party analytics**, where the focus is on users who browse the website (or websites) of the organization, providing data and information about user behavior. This data can then be used to improve the user experience of the site, to build more effective campaigns, and to attribute *conversions* to different channels.

{{< figure src="/images/content/google-analytics.jpg" title="Google Analytics is the most popular web analytics platform in use" class="left-align" >}}

On Chrome, Firefox, and Edge, the capabilities of digital analytics are not really restricted. Because much of digital analytics works with browser storage in **first-party context**, the restrictions on known trackers in third-party context do not impact the capability to monitor users browsing the website itself. 

However, on **Safari**, especially since [ITP 2.1](https://www.simoahava.com/analytics/itp-2-1-and-web-analytics/), the accuracy of first-party analytics has been compromised as well.

Web analytics tools such as **Google Analytics** drop a first-party cookie when the user first visits a website. This cookie is typically given a long expiration, such as two years, and the cookie expiration is reset each time a Google Analytics script runs on the page.

The cookie value is random and unique - by default Google Analytics uses a random number and the timestamp of when the cookie was set (e.g. `GA1.2.123456789.1575363021`), but sometimes the identifier is just a [UUID](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#cid).

Google Analytics uses this cookie to identify that the separate hits coming from a user's browser belong, in fact, to the same browser. 

{{< figure src="/images/content/itp-impact.jpg" title="ITP impact on first-party analytics" class="left-align" >}}

Because this cookie is set **with JavaScript**, Safari's ITP restricts its expiration to the maximum of **7 days**. This means that as long as the user visits the site with fewer than 7 days between each visit (and don't flush cookies for any other reason), they would be considered the same user. But if the visit frequency ever goes past 7 days, the user's cookie is reset and they would be considered a **"New user"** by the analytics tool.

{{% notice info %}}
With [ITP 2.2](https://webkit.org/blog/8828/intelligent-tracking-prevention-2-2/), cookie expiration is reduced to 1 day if the user followed a decorated link from a known tracker (e.g. a Google ad click), making it even more difficult to analyze user behavior past a very short time window.
{{% /notice %}}

Websites can [move these identifier cookies to **HTTP responses**](https://www.simoahava.com/google-cloud/create-cookie-rewrite-web-service-google-cloud/) rather than have them be set with JavaScript. For now, this would preserve the expiraton of such cookies.

**Referrer downgrade** impacts web analytics as well, because these platforms often provide **channel** data based on campaign identifiers in the URL and/or information stored in the referrer string. By downgrading referrers to their origins, web analytics tools can no longer accurately measure which particular page brought the user to the current site.

## User experience optimization

Here, *user experience optimization* covers the broad topics of **conversion (rate) optimization** and **content personalization**. The purpose of such efforts is to dynamically alter what the user might see on a website, based on random distribution to different variants, or based on targeting algorithms that choose the most suitable variant or content for the user.

For experimentation and data collection, it's important that the user's experience on the site be **consistent**. Being exposed to a different variant of the site with every page load can lead to confusion and introduce friction, especially in ecommerce contexts.

{{< figure src="/images/content/optimizely-storage.jpg" title="Storage specification on the Optimizely platform https://bit.ly/2YdKmVG" class="left-align" >}}

To ensure consistency, optimization platforms set **identifiers** in the user's browser storage that tells these platforms which experimentation variant or personalization group they belong to. This storage would *typically* be accessed in a first-party context, but if the optimization derives targeting parameters from a global profile, the storage access might be required in a third-party context, too.

Because the vendors often provide their solutions using global content delivery networks (CDN), these domains tend to get blacklisted in browsers' tracking protection lists and algorithms. Thus their capability to deliver experiences based on data harvested from third-party storage is compromised.

Similar to digital analytics, first-party storage for content optimization is also restricted on **Safari**. Due to the short expiration time of script-writable storage, experimentation and personalization platforms **can't deliver consistent experiences**. In addition to this, the inability to control the sample sizes and deduplicate conversions often leads to too much noise in the calculation of *statistical significance* for the experimentation variations.

Optimization platforms and websites running them should look into utilizing **HTTP headers** for getting and setting these cookies and for determining which content to show to the user, rather than the JavaScript APIs that have been compromised by Safari's ITP.



