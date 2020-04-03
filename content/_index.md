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
Changes added in the **latest release** of each browser are indicated with <span style="background: yellow;">yellow highlight</span>. You can **click** the <a class="fa fa-info-circle" rel="footnote"></a> icon to be redirected to the respective section in each browser's own "Current Status" page.
{{% /notice %}}

**Last updated**: 25 March 2020  
Updated Safari with latest ITP changes.

<a title="Suggest an edit" href="https://github.com/cookie-status/cookie-status-dev/issues/new?labels=content&title=%5BContent%20issue%5D%20Current%20Status" target="_blank"><i class="fa fa-edit"></i> Suggest an edit</a>

<a href="#" id="fullscreen">Toggle full screen</a>

{{< table "cs" >}}
|   | [Brave](/brave/) | [Chrome](/chrome/)                            | [Cliqz](/cliqz/)        | [Edge](/edge/)                         | [Firefox](/firefox/)                          | [Safari](/safari/) |
|---:|---|---|---|---|----|----|
| **Mechanism** | [Shields](https://support.brave.com/hc/en-us/articles/360022973471-What-is-Shields-) | n/a                                                          | Anti-Tracking                                             | [Tracking prevention](https://blogs.windows.com/msedgedev/2019/06/27/tracking-prevention-microsoft-edge-preview/) | [Enhanced Tracking Protection](https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop) (ETP) | [Intelligent Tracking Prevention](https://webkit.org/blog/7675/intelligent-tracking-prevention/) (ITP) |
| **Deployed in** | 0.55.18                                                      | n/a                                                          | [1.30.0](https://cliqz.com/en/magazine/cliqz-browser-release-notes-1-30-0) | [78.0.276.8](https://www.microsoftedgeinsider.com/en-us/welcome/update?channel=beta&version=78.0.276.8) | [69.0](https://www.mozilla.org/en-US/firefox/69.0/releasenotes/) | [Safari 11](https://en.wikipedia.org/wiki/Safari_version_history#Safari_11) |
| **Latest release** | [Link](https://brave.com/latest/)                            | [Link](https://chromereleases.googleblog.com/search/label/Stable%20updates) | [Link](https://cliqz.com/en/download) | [Link](https://www.microsoftedgeinsider.com/en-us/whats-new) | [Link](https://www.mozilla.org/en-US/firefox/releases/)      | [Link](https://developer.apple.com/documentation/safari_release_notes) |
| **Default protection mode** | Default Shield settings | n/a                                                          | Default Anti-Tracking settings                            | Balanced                                                     | Standard                                                     | ITP enabled |
| **Classification of "known trackers"** | <a href="/brave/#classification-of-known-trackers" class="fa fa-info-circle" rel="footnote"></a> Multiple filter lists | <a href="/chrome/#classification-of-known-trackers" rel="footnote" class="fa fa-info-circle"></a> n/a | <a href="/cliqz/#classification-of-known-trackers" rel="footnote" class="fa fa-info-circle"></a> Algorithmic | <a href="/edge/#classification-of-known-trackers" rel="footnote" class="fa fa-info-circle"></a> Trust Protection Lists (<span class="new">with engagement and organization mitigation</span>) | <a href="/firefox/#classification-of-known-trackers" rel="footnote" class="fa fa-info-circle"></a> Disconnect.me | <a href="/safari/#classification-of-known-trackers" rel="footnote" class="fa fa-info-circle"></a> Algorithmic |
| **Cookies in 3rd party context** | <a href="/brave/#third-party-cookies" rel="footnote" class="fa fa-info-circle"></a> All access restricted. | <a href="/chrome/#third-party-cookies" rel="footnote"  class="fa fa-info-circle"></a> No restrictions. | <p><a href="/cliqz/#third-party-cookies" rel="footnote" class="fa fa-info-circle"></a> Access restricted for known trackers, with mitigations for user interaction and critical flows (e.g. some oAuth implementations).</p><p><a href="/cliqz/#third-party-cookies" rel="footnote" class="fa fa-info-circle"></a> Cookies set on tracker origins without first-party interaction expire in 1 hour.</p> | <a href="/edge/#third-party-cookies" rel="footnote"  class="fa fa-info-circle"></a> Access restricted for known trackers. | <a href="/firefox/#third-party-cookies" rel="footnote"  class="fa fa-info-circle"></a> Access restricted for known trackers. | <p><a href="/safari/#third-party-cookies" rel="footnote"  class="fa fa-info-circle"></a> <span class="new">All access restricted, except with Storage Access API.</span></p> |
| **Cookies in 1st party context** | <p><a href="/brave/#first-party-cookies" rel="footnote"  class="fa fa-info-circle"></a> For cookies set with `document.cookie`, expiration set to 7 days.</p><p><a href="/brave/#first-party-cookies" rel="footnote"  class="fa fa-info-circle"></a> Otherwise maximum expiry set to 6 months.</p> | <a href="/chrome/#first-party-cookies" rel="footnote"  class="fa fa-info-circle"></a> No restrictions. | <p><a href="/cliqz/#first-party-cookies" rel="footnote" class="fa fa-info-circle"></a> Cookies set on tracker domains with infrequent first-party interaction expire in 7 days. Otherwise expiration set to 30 days after last visit to site.</p><p><a href="/cliqz/#first-party-cookies" rel="footnote" class="fa fa-info-circle"></a> Cookies set with `document.cookie` have a maximum expiration of 7 days.</p> | <a href="/edge/#first-party-cookies" rel="footnote"  class="fa fa-info-circle"></a> No restrictions. | <a href="/firefox/#first-party-cookies" rel="footnote"  class="fa fa-info-circle"></a> No restrictions. | <p><a href="/safari/#first-party-cookies" rel="footnote"  class="fa fa-info-circle"></a> For cookies set with `document.cookie`, expiration set to 7 days.</p><p><a href="/safari/#first-party-cookies" rel="footnote"  class="fa fa-info-circle"></a> For cookies set with `document.cookie`, expiration set to 24 hours on pages with URL decoration (query parameters or fragments) when referring domain is a known tracker.</p> |
| **Other browser storage in 3rd party context** | <a href="/brave/#other-third-party-storage" rel="footnote"  class="fa fa-info-circle"></a> No restrictions. | <a href="/chrome/#other-third-party-storage" rel="footnote"  class="fa fa-info-circle"></a> No restrictions. | <a href="/cliqz/#other-third-party-storage" rel="footnote" class="fa fa-info-circle"></a> No restrictions. | <p><a href="/edge/#other-third-party-storage" rel="footnote"  class="fa fa-info-circle"></a> Access restricted for known trackers.</p><p><a href="/edge/#other-third-party-storage" rel="footnote"  class="fa fa-info-circle"></a> No restrictions for other domains.</p> | <p><a href="/firefox/#other-third-party-storage" rel="footnote"  class="fa fa-info-circle"></a> `localStorage` and `IndexedDB` restricted for known trackers.</p><p><a href="/firefox/#other-third-party-storage" rel="footnote"  class="fa fa-info-circle"></a> `sessionStorage` is not restricted.</p><p><a href="/firefox/#other-third-party-storage" rel="footnote"  class="fa fa-info-circle"></a> No restrictions for other domains.</p> | <p><a href="/safari/#other-third-party-storage" rel="footnote"  class="fa fa-info-circle"></a> `localStorage` is partitioned and reset between application launches.</p><p><a href="/safari/#other-third-party-storage" rel="footnote"  class="fa fa-info-circle"></a> `IndexedDB` is restricted.</p><p><a href="/safari/#other-third-party-storage" rel="footnote"  class="fa fa-info-circle"></a> `sessionStorage` is not restricted.</p> |
| **Other browser storage in 1st party context** | <a href="/brave/#other-first-party-storage" rel="footnote"  class="fa fa-info-circle"></a> No restrictions. | <a href="/chrome/#other-first-party-storage" rel="footnote"  class="fa fa-info-circle"></a> No restrictions. | <a href="/cliqz/#other-first-party-storage" rel="footnote" class="fa fa-info-circle"></a> No restrictions. | <a href="/edge/#other-first-party-storage" rel="footnote"  class="fa fa-info-circle"></a> No restrictions. | <a href="/firefox/#other-first-party-storage" rel="footnote"  class="fa fa-info-circle"></a> No restrictions. | <a href="/safari/#other-first-party-storage" rel="footnote"  class="fa fa-info-circle"></a> <span class="new">Restricted to 7 days since last interaction (click, tap, text input) with the site.</span> |
| **Referrer** | <p><a href="/brave/#referrer" rel="footnote"  class="fa fa-info-circle"></a> Cross-site referrers are spoofed (set to the referred-to rather than the referred-from origin) in non-navigational HTTP requests.</p><p><a href="/brave/#referrer" rel="footnote"  class="fa fa-info-circle"></a> Cross-site referrers are stripped in navigational HTTP requests.</p><p><a href="/brave/#referrer" rel="footnote" class="fa fa-info-circle"></a> Same-site navigation preserves the referrer.</p> | <a href="/chrome/#referrer" rel="footnote"  class="fa fa-info-circle"></a> Default browser policy (`no-referrer-when-downgrade`) | <a href="/cliqz/#referrer" rel="footnote" class="fa fa-info-circle"></a> <span class="new">Strip all cross-origin referrers to origin.</span> | <a href="/edge/#referrer" rel="footnote"  class="fa fa-info-circle"></a> Default browser policy (`no-referrer-when-downgrade`) | <a href="/firefox/#referrer" rel="footnote"  class="fa fa-info-circle"></a> Default browser policy (`no-referrer-when-downgrade`) | <p><a href="/safari/#referrer" rel="footnote"  class="fa fa-info-circle"></a> <span class="new">Downgrade cross-site `document.referrer` to origin.</span></p><p><a href="/safari/#referrer" rel="footnote" class="fa fa-info-circle"></a> Downgrade all cross-site request headers to origin.</p><p><a href="/safari/#referrer" rel="footnote"  class="fa fa-info-circle"></a> For referrers that are known trackers, where the referring page also has URL decoration (query parameters or fragments), `document.referrer` is downgraded to eTLD+1.</p> |
| **Other** | <a href="/brave/#other" rel="footnote" class="fa fa-info-circle"></a> <span class="new">Removes known tracking parameters (`fbclid`, `gclid`, `msclkid`, `mc_eid`) from URL query strings.</span> | n/a | <a href="/cliqz/#other" rel="footnote" class="fa fa-info-circle"></a> Algorithmically identify and purge unique user identifiers from requests to third-party domains. | n/a | <a href="/firefox/#other" rel="footnote" class="fa fa-info-circle"></a> <span class="new">Automatically block requests to tracking domains that are also listed in the Fingerprinting category of the Disconnect.me list.</span> | <a href="/safari/#other" rel="footnote" class="fa fa-info-circle"></a> <span class="new">Detect delays in bounce trackers and treat them as regular bounces.</span>
{{< /table >}}

### Bubbling under

**Last updated**: 2 April 2020

* Brave: Add noise to Canvas, WebGL and AudioContext APIs to make fingerprinting more difficult ([link to wiki page](https://github.com/brave/brave-browser/wiki/Fingerprinting-Protections)).
* Brave: Cap all script-writable storage to a maximum lifetime ([link to issue](https://github.com/brave/brave-browser/issues/4438)).
* Chrome: Deprecation of the User-Agent string ([link to discussion](https://groups.google.com/a/chromium.org/forum/m/#!msg/blink-dev/-2JIRNMWJ7s/yHe4tQNLCgAJ)).
* Chrome: Scheme-bound cookies ([link to proposal](https://github.com/mikewest/scheming-cookies)).
* Firefox: Remove browser storage on sites that set tracking cookies, if the site has not been interacted with in 30 days ([link to issue](https://bugzilla.mozilla.org/show_bug.cgi?id=1599262)).
* Safari: Exempt web applications from having their local browser data erased ([link to changeset](https://trac.webkit.org/changeset/259440/webkit)).
* Safari: Enforce cookies to SameSite=Strict if passed in bounce trackers ([link to changeset](https://trac.webkit.org/changeset/259275/webkit)).
* Safari: Remove the [Temporary Compatibility Fix](https://webkit.org/blog/8311/intelligent-tracking-prevention-2-0/) which gives storage access to embedded popups in some contexts (e.g. login flows).
* Safari: `isLoggedIn` ([original explainer](https://lists.w3.org/Archives/Public/public-webappsec/2019Sep/0004.html) and [WebKit changeset for experimental feature](https://trac.webkit.org/changeset/250944/webkit)).
* Firefox, Edge, Chrome: [`strict-origin-when-cross-origin` default referrer policy](https://www.chromestatus.com/feature/6251880185331712).

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

### 4. Why are you collecting data to Google Analytics?

Cookie Status collects a simple pageview hit from the page loads that happen on https://www.cookiestatus.com/. This is simply to gauge the relative "usage" of different parts of the site.

The payload uses an obfuscated User-Agent string, the IP address is anonymized (by removing the last octet before it hits the GA reports), and no persistent identifiers are used or stored.
