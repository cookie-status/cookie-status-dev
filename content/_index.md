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

{{% notice note %}}
Changes added in the **latest release** are indicated with <span style="background: yellow;">yellow highlight</span>. You can **click** the <a class="fa fa-info-circle" rel="footnote"></a> icon to be redirected to the respective section in each browser's own "Current Status" page.
{{% /notice %}}

**Last updated**: 11 December 2019

<a title="Suggest an edit" href="https://github.com/cookie-status/cookie-status-dev/issues/new?labels=content&title=%5BContent%20issue%5D%20Current%20Status" target="_blank"><i class="fa fa-edit"></i> Suggest an edit</a>

<a href="#" id="fullscreen">Toggle full screen</a>

{{< table "cs" >}}
|   | [Brave](/brave/) | [Chrome](/chrome/)                            | [Edge (Beta)](/edge/)                         | [Firefox](/firefox/)                          | [Safari](/safari/) |
|---:|---|---|---|---|----|
| **Mechanism** | Shields | n/a                                                          | [Tracking prevention](https://blogs.windows.com/msedgedev/2019/06/27/tracking-prevention-microsoft-edge-preview/) | [Enhanced Tracking Protection](https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop) (ETP) | [Intelligent Tracking Prevention 2.3](https://webkit.org/blog/9521/intelligent-tracking-prevention-2-3/) (ITP) |
| **Deployed in** | 0.55.18                                                      | n/a                                                          | [78.0.276.8](https://www.microsoftedgeinsider.com/en-us/welcome/update?channel=beta&version=78.0.276.8) | [69.0](https://www.mozilla.org/en-US/firefox/69.0/releasenotes/) | [Safari 13 on macOS](https://developer.apple.com/documentation/safari_release_notes/safari_13_release_notes) |
| **Latest release** | [Link](https://brave.com/latest/)                            | [Link](https://chromereleases.googleblog.com/search/label/Stable%20updates) | [Link](https://www.microsoftedgeinsider.com/en-us/whats-new) | [Link](https://www.mozilla.org/en-US/firefox/releases/)      | [Link](https://developer.apple.com/documentation/safari_release_notes) |
| **Default protection mode** | Default Shield settings | n/a                                                          | Balanced                                                     | Standard                                                     | ITP enabled |
| **Classification of "known trackers"** | <a href="/brave/#classification-of-known-trackers" class="fa fa-info-circle" rel="footnote"></a> Multiple filter lists | <a href="/chrome/#classification-of-known-trackers" rel="footnote" class="fa fa-info-circle"></a> n/a | <a href="/edge/#classification-of-known-trackers" rel="footnote" class="fa fa-info-circle"></a> Trust Protection Lists (<span class="new">with engagement and organization mitigation</span>) | <a href="/firefox/#classification-of-known-trackers" rel="footnote" class="fa fa-info-circle"></a> Disconnect.me | <a href="/safari/#classification-of-known-trackers" rel="footnote" class="fa fa-info-circle"></a> Algorithmic |
| **Cookies in 3rd party context** | <a href="/brave/#third-party-cookies" rel="footnote" class="fa fa-info-circle"></a> All access restricted. | <a href="/chrome/#third-party-cookies" rel="footnote"  class="fa fa-info-circle"></a> No restrictions. | <a href="/edge/#third-party-cookies" rel="footnote"  class="fa fa-info-circle"></a> Access restricted for known trackers. | <a href="/firefox/#third-party-cookies" rel="footnote"  class="fa fa-info-circle"></a> Access restricted for known trackers. | <a href="/safari/#third-party-cookies" rel="footnote"  class="fa fa-info-circle"></a> <span class="new">Access restricted if no prior interaction in first-party context.</span><br/><a href="/safari/#third-party-cookies" rel="footnote"  class="fa fa-info-circle"></a> Access restricted if no prior cookies set on the domain<br/><a href="/safari/#third-party-cookies" rel="footnote"  class="fa fa-info-circle"></a> Access restricted for known trackers. |
| **Cookies in 1st party context** | <a href="/brave/#first-party-cookies" rel="footnote"  class="fa fa-info-circle"></a> For cookies set with `document.cookie`, expiration set to 7 days.<br/><a href="/brave/#first-party-cookies" rel="footnote"  class="fa fa-info-circle"></a> Otherwise maximum expiry set to 6 months. | <a href="/chrome/#first-party-cookies" rel="footnote"  class="fa fa-info-circle"></a> No restrictions. | <a href="/edge/#first-party-cookies" rel="footnote"  class="fa fa-info-circle"></a> No restrictions. | <a href="/firefox/#first-party-cookies" rel="footnote"  class="fa fa-info-circle"></a> No restrictions. | <a href="/safari/#first-party-cookies" rel="footnote"  class="fa fa-info-circle"></a> For cookies set with `document.cookie`, expiration set to 7 days.<br/><a href="/safari/#first-party-cookies" rel="footnote"  class="fa fa-info-circle"></a> For cookies set with `document.cookie`, expiration set to 24 hours on pages with URL decoration (query parameters or fragments) when referring domain is a known tracker. |
| **Other browser storage in 3rd party context** | <a href="/brave/#other-third-party-storage" rel="footnote"  class="fa fa-info-circle"></a> No restrictions. | <a href="/chrome/#other-third-party-storage" rel="footnote"  class="fa fa-info-circle"></a> No restrictions. | <a href="/edge/#other-third-party-storage" rel="footnote"  class="fa fa-info-circle"></a> Access restricted for known trackers.<br/><a href="/edge/#other-third-party-storage" rel="footnote"  class="fa fa-info-circle"></a> No restrictions for other domains. | <a href="/firefox/#other-third-party-storage" rel="footnote"  class="fa fa-info-circle"></a> `localStorage` and `IndexedDB` restricted for known trackers.<br/><a href="/firefox/#other-third-party-storage" rel="footnote"  class="fa fa-info-circle"></a> `sessionStorage` is not restricted.<br/><a href="/firefox/#other-third-party-storage" rel="footnote"  class="fa fa-info-circle"></a> No restrictions for other domains. | <a href="/safari/#other-third-party-storage" rel="footnote"  class="fa fa-info-circle"></a> `localStorage` is partitioned and reset between application launches.<br/><a href="/safari/#other-third-party-storage" rel="footnote"  class="fa fa-info-circle"></a> `IndexedDB` is restricted.<br/><a href="/safari/#other-third-party-storage" rel="footnote"  class="fa fa-info-circle"></a> `sessionStorage` is not restricted. |
| **Other browser storage in 1st party context** | <a href="/brave/#other-first-party-storage" rel="footnote"  class="fa fa-info-circle"></a> No restrictions. | <a href="/chrome/#other-first-party-storage" rel="footnote"  class="fa fa-info-circle"></a> No restrictions. | <a href="/edge/#other-first-party-storage" rel="footnote"  class="fa fa-info-circle"></a> No restrictions. | <a href="/firefox/#other-first-party-storage" rel="footnote"  class="fa fa-info-circle"></a> No restrictions. | <a href="/safari/#other-first-party-storage" rel="footnote"  class="fa fa-info-circle"></a> Restricted to 7 days maximum storage on pages with URL decoration (query parameters or fragments) when referring domain is a known tracker. |
| **Referrer** | <a href="/brave/#referrer" rel="footnote"  class="fa fa-info-circle"></a> Cross-origin referrers are spoofed (set to the referred-to rather than the referred-from origin) in non-navigational HTTP requests.<br/><a href="/brave/#referrer" rel="footnote"  class="fa fa-info-circle"></a> Cross-origin referrers are stripped in navigational HTTP requests.<br/><a href="/brave/#referrer" rel="footnote" class="fa fa-info-circle"></a> Same-site navigation preserves the referrer. | <a href="/chrome/#referrer" rel="footnote"  class="fa fa-info-circle"></a> Default browser policy (`no-referrer-when-downgrade`) | <a href="/edge/#referrer" rel="footnote"  class="fa fa-info-circle"></a> Default browser policy (`no-referrer-when-downgrade`) | <a href="/firefox/#referrer" rel="footnote"  class="fa fa-info-circle"></a> Default browser policy (`no-referrer-when-downgrade`) | <a href="/safari/#referrer" rel="footnote"  class="fa fa-info-circle"></a> <span class="new">Strip all cross-origin referrers to origin.</span><br/><a href="/safari/#referrer" rel="footnote"  class="fa fa-info-circle"></a> For referrers that are known trackers, where the referring page also has URL decoration (query parameters or fragments), referrer is downgraded to eTLD+1. |
| **Other** | <a href="/brave/" rel="footnote" class="fa fa-info-circle"></a> <span class="new">Removes known tracking parameters from URL query strings.</span> | n/a | n/a | n/a | n/a |
{{< /table >}}

### Bubbling under

* Brave: Cap all script-writable storage to a maximum lifetime ([link to issue](https://github.com/brave/brave-browser/issues/4438))
* Safari: `isLoggedIn` ([original explainer](https://lists.w3.org/Archives/Public/public-webappsec/2019Sep/0004.html) and [WebKit changeset for experimental feature](https://trac.webkit.org/changeset/250944/webkit))
* Firefox, Edge, Chrome: [`strict-origin-when-cross-origin` default referrer policy](https://www.chromestatus.com/feature/6251880185331712)

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

