---
title: "Impact"
date: 2019-11-21T15:29:14+02:00
weight: 11
draft: false
---

The tracking protection measures taken by browsers have a widespread impact on a variety of things, including **web development**, **advertising** and **marketing technologies**, **digital analytics**, and **user experience optimization**.

Websites use cookies and other browser storage for a plethora of things, such as persisting login state, preserving items in a shopping cart, and for presenting tailored experiences in a first-party context, based on what the user has done while visiting the site.

Similarly, digital analytics uses anonymous/pseudonymous identifiers stored in first-party cookies to identify the hits collected across a span of time as coming from the same browser instance.

{{% notice info %}}
The methods used for **cross-site tracking** are often *indistinguishable* from those harnessed for more mundane purposes. Thus tracking protection measures tend to disrupt regular functionality of the web while seeking to eradicate malicious tracking.
{{% /notice %}}

## Web development

Websites regularly utilize cookies in both **first-party** and **third-party context** for persisting user authentication, for storing **marketing consent**, for identifying active **sessions**, and for operating with `<iframe>` elements that embed content from other sites.

### Cookies in third-party context

Because browsers like [Edge](/edge/) and [Firefox](/firefox/) use lists (Trust Protection Lists and Disconnect.me, respectively) to collect information about *known trackers*, it's unlikely that any regular website would get their domain blacklisted. It would require that domain to participate in a tracking scheme, and for some public push to get the domain classified as a tracking domain.

{{< figure src="/images/content/disconnect-me-list.jpg" title="Beginning of the Disconnect.me entity list" class="left-align" >}}

On browsers like these, using their default tracking protection settings, websites could still continue to operate efficiently with third-party cookies.

However, **Safari**, in introducing [Intelligent Tracking Prevention](/safari/intelligent-tracking-prevention/), can block cookies in a third-party context for domains that don't actually participate in cross-site tracking. Since Safari **algorithmically** classifies domains on a browser-by-browser basis, it's entirely possible that a regular domain owned by the organization would get classified and thus have its cookies blocked when access in a third-party context.

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

Websites should set business-critical cookies with the `Set-Cookie` header, setting the [`SameSite`](https://www.owasp.org/index.php/SameSite) and [`Secure`](https://www.owasp.org/index.php/SecureFlag) flags. If the cookie does not need to be accessed by JavaScript, then the [`HttpOnly`](https://www.owasp.org/index.php/HttpOnly) should be set as well.

By setting the cookie in an HTTP response, it is unimpacted by Intelligent Tracking Prevention's restrictions on first-party storage.

### Referrer downgrade

With **cross-origin** requests, browsers are moving to a stricter default policy of [stripping the referrer to its origin](https://www.chromestatus.com/feature/6251880185331712), thus removing all path, query, and fragment identifiers from it.

Safari is taking an even stricter stance, stripping [all cross-origin referrers](https://bugs.webkit.org/show_bug.cgi?id=201353) to their origin, but also downgrading referrers to eTLD+1 (so `www.mysite.com/path` becomes `mysite.com`) when the navigation source is a classified domain with URL decoration.

{{< figure src="/images/content/safari-referrer-downgrade.jpg" title="Navigation from www.gtmtools.com (a classified domain) becomes a referrer string that's stripped to eTLD+1" class="left-align" >}}  

{{% notice info %}}
Because of the unreliability of the referrer, websites should avoid placing too much importance on interpreting what is stored in the referrer string, especially when using JavaScript's `document.referrer`.
{{% /notice %}}

## Advertising and marketing techonologies

## Digital analytics

## User experience optimization

