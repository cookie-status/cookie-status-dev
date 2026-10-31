---
title: "How tracking protection works"
description: How browsers decide what counts as a tracker, and the difference between blocking a tracker and restricting its storage.
weight: 30
toc: true
---
Tracking protection, and similar measures, seeks to protect the **user** from covert data collection and exploitation by scripts and applications created for such purposes.

Tracking protection, tracking prevention, anti-tracking, cookie blocking, content blocking, etc. are designed to:

* **Identify and classify** domains that utilize and distribute tracking mechanisms obstructive to (browsers' interpretation of) web user privacy.
* Restrict **storage access** in **third-party context** for such scripts so that the trackers cannot build cross-site profiles of web users.
* In some cases, restrict storage access in **first-party context** where it's likely that it could be exploited for **cross-site tracking** purposes.

Once a domain is classified, a browser can **block** requests to it outright, or let them through but **restrict its storage**. Most browsers block only the categories they consider clearly harmful. See [Blocking of known trackers](/features/tracker-blocking/) for what each browser does.

Browsers' main weapon against cross-site tracking is restricting **storage access**. Because there are valid reasons for cross-site tracking (persisting user authentication, shopping baskets, consent status), tracking protection methods restrict storage access for third parties that have been **identified** and **classified** as compromising user privacy. 

All major browsers now also **partition** some storage by default. See [Partitioning](/learn/partitioning/) for how that works.

## List-based protection

**Mozilla Firefox**, for example, describes their own effort [like this](https://blog.mozilla.org/futurereleases/2018/08/30/changing-our-approach-to-anti-tracking/):

> In order to help give users the private web browsing experience they expect and deserve, Firefox will strip cookies and block storage access from third-party tracking content, based on lists of tracking domains by [Disconnect](https://disconnect.me/).

This approach of comparing the third-party domains against a curated list is utilized also by **Microsoft Edge**. Here's how they introduce [Edge's tracking prevention](https://blogs.windows.com/msedgedev/2019/06/27/tracking-prevention-microsoft-edge-preview/):

> We’ve added a new component to Microsoft Edge, Trust Protection Lists**,** that contains the latest information on which organizations may be trying to track users on the web. This component allows us to be flexible with where we source details on what a tracker is and when we deliver updated lists to our users.

The **Brave** browser uses ad-blocking filter lists such as [EasyList](https://easylist.to/), EasyPrivacy and the [uBlock Origin](https://github.com/gorhill/uBlock) lists, along with its own lists.

With **list-based protection**, the browser maintains a list of domains against which each outgoing HTTP request from the site is pattern-matched. If there is a match between the request target and one of the domains in these lists, the browser either **blocks** the request or lets it load **without storage access**, depending on the browser and the type of tracker. Brave blocks most matches; Firefox and Edge block only some categories by default (see [Blocking of known trackers](/#row-tracker-blocking)).

Blocking means that browsers can stop both **downloading script resources** and **HTTP requests to tracking endpoints** (e.g. image pixels).

By blocking the script download, browsers don't need to worry about further storage access restrictions, because the JavaScript from the vendor was never loaded and thus can't abuse the browser storage on the user's computer.

By blocking the pixel and other HTTP endpoints, browsers ensure that in cases where the site is loading the JavaScript from a non-blocked source, the script will not be able to communicate with its endpoint.

The biggest problems with list-based protection are:

* The **performance overhead** of pattern-matching each HTTP request against an ever-growing list of domains (something that these browsers are [actively optimizing](https://brave.com/improved-ad-blocker-performance/)).
* **Reaction lag** to new trackers and domains that need to be added to the lists.
* Difficulty in handling **locally cached and/or proxied requests**.
* Harm to **other functionality** (besides tracking) that these blocked libraries provide.

## Algorithmic protection

The **Safari** browser has opted for a different tack. Instead of a binary approach (blocked vs. not blocked) and a set list of domains, Safari's [Intelligent Tracking Prevention](https://webkit.org/blog/category/privacy/) uses multiple methods to restrict the storage access for third parties that are *algorithmically* classified as having cross-site tracking capabilities. Here's how they describe the [classification process](https://webkit.org/blog/7675/intelligent-tracking-prevention/): 

> A machine learning model is used to classify which top privately-controlled domains have the ability to track the user cross-site, based on the collected statistics. Out of the various statistics collected, three vectors turned out to have strong signal for classification based on current tracking practices: subresource under number of unique domains, sub frame under number of unique domains, and number of unique domains redirected to. All data collection and classification happens on-device.

Note that in early 2020, WebKit's tracking protections were extended to [block **all** third-party cookies without exception](/safari/#third-party-cookies). Thus the algorithmic classification no longer applies to how third-party storage is accessed, but it is still used for other tracking-related protections (such as [downgrading the referrer](https://www.cookiestatus.com/safari/#referrer)).

However, Safari's approach *is* binary in a sense - you can either enable **all** cross-site tracking or **none**.

{{< figure src="/images/content/safari-settings.jpg" title="Safari privacy settings" class="left-align" >}}

The algorithmic approach is effective because it identifies potential tracking domains **dynamically** and without using a centralized list. This means that there's less overhead in pattern-matching the HTTP requests as the list of domains for the browser would only include those the browser has actually communicated with.

The algorithm also ensures that locally hosted tracking domains and reverse proxies would also be under scrutiny (unless served in a same-site context).

The main problems with this approach are:

* **False positives**, where the algorithm classifies domains that serve no cross-site tracking purpose.
* There is also some **reaction lag**, because the algorithm would require enough data to classify each new domain. It's thus possible some communication with a tracking domain would be permitted before access is restricted.
* **Lack of predictability**, which is not necessarily a problem or a bad thing, but a list-based approach allows for community oversight of the domains on the lists. 

{{% notice info %}}
Note that for **false positives** blocking access to cross-origin storage, ITP offers the **Storage Access API**. However, there is no provision in ITP to remove a domain from the list of classified domains, which means that **first-party protections** would still apply.
{{% /notice %}}