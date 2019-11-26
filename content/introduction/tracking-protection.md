---
title: "Tracking protection?"
date: 2019-11-21T15:28:47+02:00
draft: false
weight: 10
---

Tracking protection, and similar measures, seek to protect the **user** against harmful data collection and exploitation by third-party platforms, scripts, and applications.

As a concept, it's convoluted and multi-faceted. The terminology used is often very vague. Information about the different mechanisms employed by web browsers is distributed across release notes, discussion forums, Twitter threads, and developer guides, some of which are outdated soon after release.

In this introductory chapter, we'll take a look at what tracking protection means *in general*, before directing you to the other parts of this site for more indepth information on how different browsers implement countermeasures. 

In short, tracking protection, tracking prevention, anti-tracking, cookie blocking, content blocking, etc. are designed to:

* **Identify and classify** domains that have been recognized to employ tracking mechanisms harmful to (browsers' intepretation of) user privacy.
* If a script or resource is loaded in a **third-party context** from such a domain, restrict access to browser storage so that the trackers could not exploit data stored within.
* In some cases (namely Safari's ITP), restrict storage access in a first-party context where it's likely that it could be exploited for **cross-site tracking** purposes.

## First-party and third-party

Lorem ipsum.

## Cross-site tracking

A common thread in the rhetoric is that browsers want to quench **cross-site tracking**. Here's how [Safari describes it](https://webkit.org/blog/7675/intelligent-tracking-prevention/):

> Imagine a user who first browses example-products.com for a new gadget and later browses example-recipies.com for dinner ideas. If both these sites load resources from example-tracker.com and example-tracker.com has a cookie stored in the user’s browser, the owner of example-tracker.com has the ability to know that the user visited both the product website and the recipe website, what they did on those sites, what kind of web browser was used, et cetera. This is what’s called *cross-site tracking* and the cookie used by example-tracker.com is called a *third-party cookie*. In our testing we found popular websites with over 70 such trackers, all silently collecting data on users.

In essence, **cross-site tracking** utilizes centralized tracking domains for scripts to communicate with from the sites the user actually visits. These tracking domains leverage third parties' access to *browser storage* (mainly cookies) to build profiles of all the sites the user has visited. 

{{< figure src="/images/content/cross-site-tracking.jpg" title="Cross-site tracking" class="left-align" >}}

## Restrict access

The biggest impact is on **storage access**, and how tracking protection measures restrict this access for third parties that have been identified as compromising user privacy. 

**Mozilla Firefox**, for example, describes their own effort [like this](https://blog.mozilla.org/futurereleases/2018/08/30/changing-our-approach-to-anti-tracking/):

> In order to help give users the private web browsing experience they expect and deserve, Firefox will strip cookies and block storage access from third-party tracking content, based on lists of tracking domains by [Disconnect](https://disconnect.me/).

This approach of comparing the third-party domains against a curated list is utilized also by **Microsoft Edge**. Here's how they introduce [Edge's tracking prevention](https://blogs.windows.com/msedgedev/2019/06/27/tracking-prevention-microsoft-edge-preview/):

> We’ve added a new component to Microsoft Edge, Trust Protection Lists**,** that contains the latest information on which organizations may be trying to track users on the web. This component allows us to be flexible with where we source details on what a tracker is and when we deliver updated lists to our users.

The **Safari** browser has the most interesting approach. Instead of a binary approach (blocked vs. not blocked) and a set list of domains, Safari's [Intelligent Tracking Prevention](https://webkit.org/blog/category/privacy/) uses multiple methods to restrict the storage access for third parties that are *algorithmically* classified as having cross-site tracking capabilities. Here's how they describe the [classification process](https://webkit.org/blog/7675/intelligent-tracking-prevention/): 

> A machine learning model is used to classify which top privately-controlled domains have the ability to track the user cross-site, based on the collected statistics. Out of the various statistics collected, three vectors turned out to have strong signal for classification based on current tracking practices: subresource under number of unique domains, sub frame under number of unique domains, and number of unique domains redirected to. All data collection and classification happens on-device.

However, Safari's approach *is* binary in a sense - you can either enable **all** cross-site tracking or **none**.

{{< figure src="/images/content/safari-settings.jpg" title="Safari privacy settings" class="left-align" >}}

The **Chrome** browser is, for now, devoid of any significant tracking protection measures. However, they have contributed to the discussion with their [privacy sandbox](https://www.blog.google/products/chrome/building-a-more-private-web/) initiative, as well as with upcoming features involving [cookie restrictions](https://blog.chromium.org/2019/05/improving-privacy-and-security-on-web.html) and [referrer policies](https://www.chromestatus.com/feature/6251880185331712).