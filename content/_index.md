+++
title = "Cookie Status"
date = 2019-11-19T13:57:26+02:00
type = "currentstatus"
weight = 5
+++

# Cookie Status

The [cookiestatus.com](https://www.cookiestatus.com) website is a **knowledge sharing resource** for the various **tracking protection mechanisms** implemented by the major browsers and browser engines.

For more information about the service, please consult the [FAQ](#faq).

{{% notice info %}}
Please submit suggestions and corrections as **issues** in the GitHub project. Click [here](https://github.com/sahava/cookie-status/issues) to find your way.
{{% /notice %}}

## Current status

**Last updated**: 10 December 2019

<a title="Suggest an edit" href="https://github.com/cookie-status/cookie-status-dev/issues/new?labels=content&title=%5BContent%20issue%5D%20Current%20Status" target="_blank"><i class="fa fa-edit"></i> Suggest an edit</a>

<a href="#" id="fullscreen">Toggle full screen</a>

{{< table "cs" >}}
|   | [Brave](/brave/current-status/) | [Chrome](/chrome/current-status/)                            | [Edge (Beta)](/edge/current-status/)                         | [Firefox](/firefox/current-status/)                          | [Safari](/safari/current-status/) |
|---:|---|---|---|---|----|
| **Mechanism** | Shields | n/a                                                          | [Tracking prevention](https://blogs.windows.com/msedgedev/2019/06/27/tracking-prevention-microsoft-edge-preview/) | [Enhanced Tracking Protection](https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop) (ETP) | [Intelligent Tracking Prevention 2.3](https://webkit.org/blog/9521/intelligent-tracking-prevention-2-3/) (ITP) |
| **Deployed in** | 0.55.18                                                      | n/a                                                          | [78.0.276.8](https://www.microsoftedgeinsider.com/en-us/welcome/update?channel=beta&version=78.0.276.8) | [69.0](https://www.mozilla.org/en-US/firefox/69.0/releasenotes/) | [Safari 13 on macOS](https://developer.apple.com/documentation/safari_release_notes/safari_13_release_notes) |
| **Latest release** | [Link](https://brave.com/latest/)                            | [Link](https://chromereleases.googleblog.com/search/label/Stable%20updates) | [Link](https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/) | [Link](https://www.mozilla.org/en-US/firefox/releases/)      | [Link](https://developer.apple.com/documentation/safari_release_notes) |
| **Default protection mode** | Default Shield settings                                      | n/a                                                          | Balanced                                                     | Standard                                                     | ITP enabled |
| **Classification of "known trackers"** | [Multiple filter lists](https://github.com/brave/adblock-rust/blob/master/src/filter_lists/default.rs) | n/a                                                          | Trust Protection Lists                                       | [Disconnect.me](https://disconnect.me)                       | [Algorithmic](https://webkit.org/blog/7675/intelligent-tracking-prevention/) |
| **Cookies in 3rd party context** | All access restricted.                                       | No restrictions.                                             | Access restricted for known trackers.                        | Access restricted for known trackers.                        | Access restricted if no prior cookies set on the domain. Access restricted for known trackers. |
| **Cookies in 1st party context** | For cookies set with `document.cookie`, expiration set to 7 days. Otherwise maximum expiry set to 6 months. | No restrictions.                                             | No restrictions.                                             | No restrictions.                                             | For cookies set with `document.cookie`, expiration set to 7 days by default, and 24 hours on pages with URL decoration (query parameters or fragments) when referring domain is a known tracker. |
| **Other browser storage in 3rd party context** | No restrictions.                                             | No restrictions.                                             | Access restricted for known trackers. No restrictions for other domains. | `localStorage` and `IndexedDB` restricted for known trackers. `sessionStorage` is not restricted. No restrictions for other domains. | `localStorage` is partitioned and reset between application launches. `IndexedDB` is restricted. `sessionStorage` is not restricted. |
| **Other browser storage in 1st party context** | No restrictions.                                             | No restrictions.                                             | No restrictions.                                             | No restrictions.                                             | Restricted to 7 days maximum storage on pages with URL decoration (query parameters or fragments) when referring domain is a known tracker. |
| **Referrer** | Cross-origin referrers are spoofed (set to the referred-to rather than the referred-from origin) in non-navigational HTTP requests. Cross-origin referrers are stripped in navigational HTTP requests. Same-site navigation preserves the referrer. | Default browser policy (`no-referrer-when-downgrade`)        | Default browser policy (`no-referrer-when-downgrade`)        | Default browser policy (`no-referrer-when-downgrade`)        | Default browser policy (`no-referrer-when-downgrade`). For referrers that are known trackers, where the referring page also has URL decoration (query parameters or fragments), referrer is downgraded to eTLD+1 (e.g. https://app.site.com/?id=123 becomes https://site.com). |
{{< /table >}}

### Bubbling under

* Brave: Cap all script-writable storage to a maximum lifetime ([link to issue](https://github.com/brave/brave-browser/issues/4438))

* Safari: `isLoggedIn` ([original explainer](https://lists.w3.org/Archives/Public/public-webappsec/2019Sep/0004.html) and [WebKit changeset for experimental feature](https://trac.webkit.org/changeset/250944/webkit))

* Safari: [Downgrade of all third-party referrers](https://trac.webkit.org/changeset/250413/webkit)
* Safari: [Block all third-party cookies, regardless of prior access](https://trac.webkit.org/changeset/251467/webkit)
* Firefox, Edge, Safari, Chrome: [`strict-origin-when-cross-origin` default referrer policy](https://www.chromestatus.com/feature/6251880185331712)

## FAQ

### 1. Why does this resource exist?

Web browsers are going through fairly momentous shifts in order to better respond to the increasing number of data breaches and cases of data misuse by third parties.

Unfortunately, each browser (and the underlying browser engine) seems to have their own interpretation of how to best tackle the problem, which leads to a diverse set of features across the browser landscape. 

What's worse, the information about how these tracking protection mechanisms are deployed is all over the place: in release notes, in developer documentation, in Twitter threads, in working groups, in feature drafts, in bug patches, etc. 

The purpose of the **Cookie Status** resource is to (attempt to) collect this information in one place for easy access and perusal.

There is no commercial agenda behind this project. In fact, there is no agenda other than knowledge transfer.

### 2. Why only these browsers?

Just to kick things off. Hopefully the open-source nature of this project will invite others to contribute details about browsers that are doing significant work with regard to user privacy.

### 3. What cookies / browser storage does Cookie Status set and why?

Cookie Status doesn't use browser cookies, `localStorage`, or `IndexedDB`.

`sessionStorage` is used to add some functionality to navigation (marking visited pages, highlighting search terms). 

Nothing in browser storage is sent to any third parties at any time.

If you see anything contrary to the above, please raise [an issue](https://github.com/cookie-status/cookie-status-dev/issues) about this.

