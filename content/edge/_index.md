+++
title = "Edge"
metatitle = "Edge :: Current status"
date = 2019-11-21T15:33:24+02:00
weight = 20
chapter = false
logo = "edge"
pre = "<b><i class=\"fab fa-edge\"></i> </b>"
+++
## Current status

| Detail                          | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| **Mechanism**                 | Tracking prevention                                          |
| **Originally deployed in**    | [78.0.276.8](https://www.microsoftedgeinsider.com/en-us/welcome/update?channel=beta&version=78.0.276.8)                                                     |
| **Latest update deployed in** | [79](https://blogs.windows.com/msedgedev/2019/12/03/improving-tracking-prevention-microsoft-edge-79/) |
| **Latest update includes** | Site and organization mitigation to choosing which trackers to block. |
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

The chart below shows the level of blocking for each category. **Balanced** is the default level of tracking prevention in the browser.

{{< figure src="/images/content/edge-block-chart.jpg" title="From: https://bit.ly/39PlJ6S" class="left-align" >}}

**S** means that storage access is restricted for domains falling under the given category. 

**B** means that all resources are blocked for domains falling under the given category. 

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

Engagement scores are keyed **by origin** (so `www.domain.com` would have a different engagement score from `sub.domain.com`), and engagement scores are cleared with browser history (or, for scores accumulated in *incognito mode*, when the browser is shut down). Engagement scores also **decay with time**.

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

## Third-party cookies

Third-party cookies are blocked from all domains listed in the Trust Protection Lists (considering the **mitigations** listed above).

## First-party cookies

No restrictions.

{{% notice info %}}

Note that domains in Cryptomining and Fingerprinting categories of the Trust Protection Lists have all resource loads blocked, and thus resources that would have been downloaded from these sources cannot make use of first-party cookies.

{{% /notice %}}

## Other third-party storage

All other third-party browser storage is blocked from domains listed in the Trust Protection Lists (considering the **mitigations** listed above).

## Other first-party storage

No restrictions.

{{% notice info %}}

Note that domains in Cryptomining and Fingerprinting categories of the Trust Protection Lists have all resource loads blocked, and thus resources that would have been downloaded from these sources cannot make use of other first-party storage.

{{% /notice %}}

## CNAME cloaking

No protections against CNAME cloaking.

## Referrer

Default browser policy (`strict-origin-when-cross-origin`).

## Other

On macOS Edge, the version number in the User Agent string is frozen to `10_15_7` to fix compatibility issues with upgrading to macOS version 11+ (Big Sur). This has obvious privacy implications as well, as the platform version is no longer useful for fingerprinting purposes.

{{% notice info %}}
Sample User Agent string when running Edge 90.0.818.62 on macOS 11.3.1:<br/>
`"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36 Edg/90.0.818.62"`
{{% /notice %}}
