+++
title = "Edge"
metatitle = "Edge tracking protections"
date = 2019-11-21T15:33:24+02:00
weight = 20
logo = "edge"
aliases = ["/edge/current-status/", "/edge/tracking-prevention/", "/edge/useful-resources/"]
+++
## Current status

| Detail                          | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| **Mechanism**                 | Tracking prevention                                          |
| **Originally deployed in**    | [78.0.276.8](https://www.microsoftedgeinsider.com/en-us/welcome/update?channel=beta&version=78.0.276.8)                                                     |
| **User controls** | Customizable settings to: <ul><li>**Choose between Basic, Balanced or Strict mode**</li><li>**View trackers that have been blocked**</li><li>**Add sites to list of exceptions for which trackers should always be allowed to run**</li><li>**Check your site engagement scores**</li></ul> |

{{< figure src="/images/content/edge-tracking-settings.jpg" title="Edge Tracking prevention settings" class="left-align" >}}

## Classification of "known trackers"

Edge uses **Trust Protection Lists** to classify the domains that are recognized as having cross-site tracking capabilities, or are otherwise harmful to the site. This list is derived from [Disconnect.me](https://disconnect.me/trackerprotection), similar to [Firefox's](/firefox/) approach.

Edge restricts storage access to and/or blocks resources loaded from the following [Disconnect.me categories](https://disconnect.me/trackerprotection#categories-of-trackers):

* Advertising
* Analytics
* Content
* Cryptomining
* Fingerprinting
* Social

The table below shows what **Balanced**, the default level, does to each category ([source](https://learn.microsoft.com/en-us/microsoft-edge/web-platform/tracking-prevention#current-tracking-prevention-behavior)).

| Category | Balanced (default) |
| --- | --- |
| Advertising | S |
| Analytics | - |
| Content | S |
| Cryptomining | B |
| Fingerprinting | B |
| Social | S |
| Other | S |

**S** means that storage access is restricted for domains falling under the given category.

**B** means that storage access is restricted **and** resource loads are blocked for domains falling under the given category.

**-** means that nothing is restricted.

To prevent storage access and resource blocking from breaking user experience, Edge has introduced some **mitigations** to how cross-site tracking prevention works.

### Same-org mitigation

If two domains are owned and operated by the same company, Edge introduces a mitigation where tracking prevention is relaxed when one such domain requests resources from the other.

{{% notice info %}}

**Example**: `www.company-domain.com` and `www.company-cdn.com` are different domains, but they are registered by the same company, and Edge recognizes them as belonging to the same organization. Thus, even if Edge's Trust Protection Lists have identified `www.company-cdn.com` as a tracking domain, access to it from `www.company-domain.com` would not be restricted.

{{% /notice %}}

### Site engagement mitigation

Edge introduced the **Site engagement score** from the [Chromium project](https://www.chromium.org/developers/design-documents/site-engagement) as a further mitigation to accessing resources on classified domains.

Activities that improve the site engagement score are:

* Direct navigations to the site (so typing the URL in the address bar or following a bookmark - navigation via link clicks, for example, would **not** improve the score)
* Active time on site (defined by time spent by clicking, scrolling, using the keyboard)
* Media playback on the site

The site engagement score is calculated as a double value between 0-100. 

Engagement scores are keyed **by origin** (so `www.domain.com` would have a different engagement score from `sub.domain.com`), and engagement scores are cleared with browser history. Engagement scores also **decay with time**.

Edge determines a score of **4.1** to represent sufficient engagement with a site to enable mitigation for tracking prevention. 

{{% notice tip %}}

You can view the site engagement scores stored in your Edge instance by typing `edge://site-engagement` in the address bar of the browser.

{{% /notice %}}

If the browser requests a resource from a site with an engagement score of 4.1 or better, Edge does not restrict storage access or resource loads **unless the site is classified in the Fingerprinting or Cryptomining categories**. 

### Org engagement mitigation

Organization engagement mitigation means that if one site in an organization receives a site engagement score high enough to not be impacted by tracking prevention (i.e. a score of 4.1 or better), then the user is considered to have a relationship **with the organization**.

{{% notice note %}}

**Example**: If the user has interacted with `www.company-domain.com` enough to accumulate a score of 4.1 or better, then `www.company-cdn.com`would enjoy the benefits of site engagement mitigation as well, because it is recognized as part of the same organization. Thus if a website does a cross-site request to `www.company-cdn.com`, Edge would not block storage access even if the domain were in the Trust Protection Lists. *Unless, of course, `www.company-cdn.com` would fall under the Fingerprinting or Cryptomining categories*. 

{{% /notice %}}

{{< sources "classification-of-known-trackers" >}}

## Blocking of known trackers {#tracker-blocking}

In the default **Balanced** mode, Edge blocks requests to known trackers in the **Cryptomining** and **Fingerprinting** categories. The engagement mitigations above don't apply to these categories, so they are blocked even on sites the user visits often.

The Fingerprinting category only covers domains that are on Disconnect.me's Fingerprinting list **and** in another tracking category. Domains that are only on the Fingerprinting list are treated as non-malicious and are not blocked.

Other known trackers (Advertising, Content, Social, Other) still load, but without access to cookies or other storage. Analytics trackers are not restricted at all in Balanced mode.

{{% notice note %}}
**Example**: A site loads a script from a domain that Disconnect.me lists under both Advertising and Fingerprinting. Edge blocks the request, so the script never runs. A script from a domain that is only listed under Advertising loads and runs, but it can't read or write cookies or storage.
{{% /notice %}}

{{< sources "tracker-blocking" >}}

## Third-party cookies

Third-party cookies are blocked from domains listed in the Trust Protection Lists in the Advertising, Content, Social and Other categories (considering the **mitigations** listed above).

Like Chrome, Edge caps the lifetime of all cookies at **400 days**.

Edge supports an **opt-in** flag for cookies, `Partitioned;`. This is part of the **C**ookies **H**aving **I**ndependent **P**artitioned **S**tate proposal (CHIPS). Cookies with this flag can be accessed in third-party context, but they are partitioned between the site sending requests to the third-party and the third-party itself. Cookies in a partition cannot be accessed by other sites that also communicate with the same third-party. 

{{< sources "third-party-cookies" >}}

Edge supports the [Storage Access API](/glossary/#storage-access-api), which embedded content can use to ask for its cookies where they're blocked.

## First-party cookies

Cookies have a maximum lifetime of **400 days**, whether they are set with `document.cookie` or the `Set-Cookie` HTTP response header. Other than that, Edge does not restrict first-party cookies.

{{< sources "first-party-cookies" >}}

{{% notice info %}}

Note that domains in Cryptomining and Fingerprinting categories of the Trust Protection Lists have all resource loads blocked, and thus resources that would have been downloaded from these sources cannot make use of first-party cookies.

{{% /notice %}}

## Other third-party storage

Other third-party browser storage is blocked for the same known trackers as [third-party cookies](#third-party-cookies) (considering the **mitigations** listed above).

For all other domains, storage in third-party context is **partitioned**, as in Chrome.

{{% notice note %}}
**Example**: If `siteA.com` loads an iframe from `siteB.com`, and `siteB.com` is not a known tracker, the iframe can use `localStorage`. But that storage is only shared with other `siteB.com` frames on `siteA.com`. When `siteC.com` embeds the same iframe, it sees a separate, empty storage.
{{% /notice %}}

{{< sources "other-third-party-storage" >}}

## Other first-party storage

No restrictions.

{{% notice info %}}

Note that domains in Cryptomining and Fingerprinting categories of the Trust Protection Lists have all resource loads blocked, and thus resources that would have been downloaded from these sources cannot make use of other first-party storage.

{{% /notice %}}

## CNAME cloaking

No protections against CNAME cloaking.

## Fingerprinting

Edge [blocks requests](#tracker-blocking) to known fingerprinters.

On macOS Edge, the version number in the User Agent string is frozen to `10_15_7` to fix compatibility issues with upgrading to macOS version 11+ (Big Sur). This has obvious privacy implications as well, as the platform version is no longer useful for fingerprinting purposes.

{{% notice info %}}
Sample User Agent string when running Edge 90.0.818.62 on macOS 11.3.1:<br/>
`"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36 Edg/90.0.818.62"`
{{% /notice %}}

## Referrer

Default browser policy (`strict-origin-when-cross-origin`). As in Chrome, sites can loosen it: a page with the `unsafe-url` policy sends its full URL to other sites.

{{< sources "referrer" >}}

## Other

Nothing else to note for Edge's default settings.
