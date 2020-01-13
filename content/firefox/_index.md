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
| **Latest update deployed in** | [72.0](https://www.mozilla.org/en-US/firefox/72.0/releasenotes/) |
| **Latest update includes** | Automatically block resource loads for scripts that are both in the Fingerprinting and one of the tracking categories. |
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

## Third-party cookies

Third-party cookies are blocked for classified domains.

## First-party cookies

No restrictions.

{{% notice info %}}

Note that domains in the Cryptomining category have all incoming requests blocked by Firefox, and thus scripts loaded from these domains will not be able to interact with first-party cookies. Similarly, domains that are both in the Fingerprinting and some other tracking category have incoming requests blocked and the downstream impact is the same.

{{% /notice %}}

## Other third-party storage

For classified domains, `localStorage` and `IndexedDB` are restricted.

{{% notice note %}}

**Example**: JavaScript running in an iframe, which loads content from a known tracking domain, tries to write to `localStorage` within that iframe. Firefox blocks this activity, because `localStorage` is disabled in third-party context if the domain is classified as a known tracking domain.

{{% /notice %}}

`sessionStorage` is not restricted.

No restrictions for other domains.

## Other first-party storage

No restrictions.

{{% notice info %}}

Note that domains in the Cryptomining category have all incoming requests blocked by Firefox, and thus scripts loaded from these domains will not be able to interact with other first-party storage. Similarly, domains that are both in the Fingerprinting and some other tracking category have incoming requests blocked and the downstream impact is the same.

{{% /notice %}}

## Referrer

Default browser policy (`no-referrer-when-downgrade`).

## Other

If the domain is in the Fingerprinting category of Disconnect.me **and** in one of the tracking categories (Advertising, Analytics, or Social), all third-party **requests** to the domain are blocked.