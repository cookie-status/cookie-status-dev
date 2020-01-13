+++
title = "Cliqz"
metatitle = "Cliqz :: Current status"
date = 2019-11-21T15:32:10+02:00
weight = 17
chapter = false
logo = "cliqz"
pre = "<b class=\"temp-cliqz\"></b>"
+++
## Current status

| Detail                          | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| **Mechanism**                 | Anti-Tracking                                                    |
| **Originally deployed in**    | [1.30.0](https://cliqz.com/en/magazine/cliqz-browser-release-notes-1-30-0)                                                      |
| **Latest update deployed in** | [1.30.0](https://cliqz.com/en/magazine/cliqz-browser-release-notes-1-30-0)                         |
| **Latest update includes**    | Cliqz' own Anti-Tracking Mechanism deployed. |
| **User controls**             | Site-specific and global controls for: <ul><li>**Anti-tracking activation**</li><li>**Blocking ads**</li><li>**Cookie pop-up blocking** (consent requests)</li><li>**Anti-phishing**</li><li>**Automatic HTTPS connection upgrade**</li> |

{{< figure src="/images/content/cliqz-settings.jpg" title="Cliqz Anti-Tracking default settings" class="left-align" >}}

## Classification of "known trackers"

Cliqz uses an algorithmic classification model for identifying trackers with cross-site tracking capabilities.

This model is run both **locally** (in the user's browser) and **globally** (derived from a global database, periodically updated with data from local contexts).

To understand this better, read this research paper:

[WhoTracks .Me: Shedding light on the opaque world of online tracking](https://arxiv.org/abs/1804.08959)

You can also browse the [whotracks.me](https://whotracks.me/) service to learn about the status of the global tracker database Cliqz uses.

## Third-party cookies

Known trackers have third-party cookie access blocked. There is a heuristical model in place to determine exceptions to this rule. The model includes ([source](https://github.com/cliqz-oss/browser-core/issues/58#issuecomment-394285634)):

* **User interaction with the 3rd party widget**. When an element is clicked, Cliqz looks for tracker domain access within the embedded element and temporarily whitelists cookie access for the domain.
* **Redirects**. When a domain redirects to a classified domain, the classified domain is whitelisted for temporary cookie access. This is to preserve things like login flows that handle state with cookies.
* **OAuth detection**. OAuth flows can be identified fairly easily, and classified domains are whitelisted for temporary access to cookies necessary to keep the flow running.

Cookies that are **set** on classified domains without first-party interaction (i.e. as third-party cookies) have a maximum expiration set to **1 hour**.

## First-party cookies

How first-party cookies expire is determined by a) whether the domain the cookies are set on is a classified domain, and b) how frequently the classified domain is visited in first-party context.

If the domain is **not** a classified domain, first-party cookies have a maximum expiration of **7 days** (if set without the `HttpOnly` flag) or **30 days** (if set with the `HttpOnly` flag).

{{% notice note %}}

**Example**: A JavaScript SDK (e.g. an analytics) tool writes a cookie in the user's browser, assigning them with an anonymous, randomly generated client identifier. The purpose of this identifier is to assign multiple visits by the same browser to the same "user". If the user visits the site within 7 days of the previous visit, the cookie will persist in the browser, and the analytics platform will be able to identify the browser as one that has previously visited the site. If the visits happen more than 7 days apart, the user will always be a "new user" to the analytics platform.

{{% /notice %}}

If the domain **is** a classified domain, then *infrequent* visits to the domain impose a maximum expiration of **7 days** to the first-party cookie. If the domain is visited frequently, the maximum expiration is set to **30 days** (with the `HttpOnly` limitation same as above).

## Other third-party storage

No current restrictions.

## Other first-party storage

No current restrictions.

## Referrer

Default browser policy (`no-referrer-when-downgrade`).

## Other

Cliqz automatically purges *potential user identifiers* from the URL, headers, and POST data of third-party requests.

The model tokenizes all key-value pairs found, and then evaluates the values against a set of rules to determine if it's *safe* (should not be removed) or *unsafe* (should be removed).

This evaluation is done locally first, and then the values are compared against a **global safe set** (derived from data collected from global Cliqz usage). If the value is flagged as *unsafe* and does not have a match in the global set, it is purged from the request.

{{% notice note %}}

**Example**: If the browser sends a request to a third-party resource using something like `?userId=abcd-1234-efgh-5678` in the request URL, it's possible that this parameter will be stripped from the outgoing request so that the service receiving the request will not be able to access the data.

{{% /notice %}}

[This article](https://whotracks.me/blog/how_cliqz_antitracking_protects_users.html) has an excellent overview of how this process works (beginning with chapter titled **Unsafe Data Removal**).



