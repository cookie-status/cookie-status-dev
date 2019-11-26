+++
title = "Cookie Status"
date = 2019-11-19T13:57:26+02:00
type = "currentstatus"
weight = 5

+++

# Cookie Status

The [cookiestatus.com](https://www.cookiestatus.com) website is a **learning resource** for the various **tracking protection mechanisms** implemented by the major browsers and browser engines.

{{% notice info %}}
Please submit suggestions and corrections as **issues** in the GitHub project. Click [here](https://github.com/sahava/cookie-status/issues) to find your way.
{{% /notice %}}

## Current status

**Last updated**: 26 November 2019

{{< table >}}
|   | [Chrome](/chrome/current-status/) | [Edge (Beta)](/edge/current-status/) | [Firefox](/firefox/current-status/) | [Safari](/safari/current-status/) |
|---:|---|---|---|---|
| **Mechanism** | n/a | [Tracking prevention](https://blogs.windows.com/msedgedev/2019/06/27/tracking-prevention-microsoft-edge-preview/) | [Enhanced Tracking Protection](https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop) (ETP) | [Intelligent Tracking Prevention 2.3](https://webkit.org/blog/9521/intelligent-tracking-prevention-2-3/) (ITP) |
| **Deployed in** | n/a | [78.0.276.8](https://www.microsoftedgeinsider.com/en-us/welcome/update?channel=beta&version=78.0.276.8) | [69.0](https://www.mozilla.org/en-US/firefox/69.0/releasenotes/) | [Safari 13 on macOS](https://developer.apple.com/documentation/safari_release_notes/safari_13_release_notes) |
| **Latest release** | [Link](https://chromereleases.googleblog.com/search/label/Stable%20updates) | [Link](https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/) | [Link](https://www.mozilla.org/en-US/firefox/releases/) | [Link](https://developer.apple.com/documentation/safari_release_notes) |
| **Default protection mode** | n/a | Balanced | Standard | ITP enabled |
| **Classification of "known trackers"** | n/a | Trust Protection Lists | [Disconnect.me](https://disconnect.me) | [Algorithmic](https://webkit.org/blog/7675/intelligent-tracking-prevention/) |
| **Cookies in 3rd party context** | No restrictions. | Access restricted for known trackers. | Access restricted for known trackers. | Access restricted in all cases. |
| **Cookies in 1st party context** | No restrictions. | No restrictions. | No restrictions. | For cookies set with `document.cookie`, expiration set to 7 days by default, and 24 hours on pages with URL decoration (query parameters or fragments) when referring domain is a known tracker. |
| **Other browser storage (e.g. localStorage, IndexedDB)** | No restrictions. | Access restricted in third-party context for known trackers. | localStorage and IndexedDB restricted in third-party context for known trackers, sessionStorage is not restricted. No restrictions in first-party context. | Access restricted in third-party context in all cases. First-party storage restricted to 7 days on pages with URL decoration (query parameters or fragments) when referring domain is a known tracker. |
| **Referrer** | Default browser policy (`no-referrer-when-downgrade`)        | Default browser policy (`no-referrer-when-downgrade`)        | Default browser policy (`no-referrer-when-downgrade`) | Default browser policy (`no-referrer-when-downgrade`). For referrers that are known trackers, where the referring page also has URL decoration (query parameters or fragments), referrer is downgraded to eTLD+1 (e.g. https://app.site.com/?id=123 becomes https://site.com). |

{{< /table >}}
