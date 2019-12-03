---
title: "Tracking protection"
date: 2019-11-21T15:28:47+02:00
draft: false
weight: 10
---

{{< toc >}}

Tracking protection, and similar measures, seek to protect the **user** from covert data collection and exploitation by scripts and applications created for such purposes.

In short, tracking protection, tracking prevention, anti-tracking, cookie blocking, content blocking, etc. are designed to:

* **Identify and classify** domains that utilize and distribute tracking mechanisms obstructive to (browsers' interpretation of) web user privacy.
* Restrict **storage access** in **third-party context** for such scripts so that the trackers cannot build cross-site profiles of web users.
* In some cases, restrict storage access in **first-party context** where it's likely that it could be exploited for **cross-site tracking** purposes.

In this introductory chapter, we'll gloss over some of the key terminology regarding tracking protection. You are then advised to visit the other pages of Cookie Status for more details.

1. [Cookies](#cookies)
2. [First-party and third-party context](#first-party-and-third-party-context)
3. [Cross-site tracking](#cross-site-tracking)
4. [Restrict storage access](#restrict-storage-access)

## Cookies

**Browser cookies** are key-value pairs (e.g. `id=abcd1234`) of information stored on the user's computer. Websites set them in order to persist information from one page to the next. This is because the web is effectively *stateless* - only a very limited set of information is shared from one page to the next. By writing information into browser storage, that information persists even if the pages the user navigates from are unloaded and their storage purged.

When the user browses a website, that site has the capability to **set** or **write** cookies on the user's computer, and the site also has the ability to **get** or **read** the cookies stored on the user's computer. Due to browser security and same-origin restrictions - the website **can only get and set cookies for the domain the user is currently on**, i.e. in a *first-party context* (see the next chapter).

{{% notice info %}}
More specifically, the website has access to any cookies written on **the current domain** the user is browsing on, and on any domains *higher* up in the domain (or DNS) hierarchy, all the way to the effective top-level domain (**eTLD**) plus one part.
{{% /notice %}}

{{< figure src="/images/content/cookie-example.jpg" title="Cookies set on current domain and on the eTLD+1" class="left-align" >}}

As an example, let's say the user is browsing **blog.ecommerce.cookiestatus.com**. This is the **domain** the user is currently on.

The following three domains are all considered to be in the same domain hierarchy: 

* **blog.ecommerce.cookiestatus.com** (current domain)
* **ecommerce.cookiestatus.com** (one level up in the hierarchy)
* **cookiestatus.com** (eTLD (`.com`) plus one part (`cookiestatus`))

The following three domains are **not** part of the same hierarchy:

* **store**.ecommerce.cookiestatus.com (different subdomain)
* blog.ecommerce.cookiestatus.**co.uk** (different eTLD)
* blog.ecommerce.**storagestatus**.com (different eTLD+1)

The user's browser can set cookies on any of the three domains in the first list. For instance, they can **set** an identifier cookie on the eTLD+1 with JavaScript like this:

```JavaScript
document.cookie = 'userId=abcd1234;domain=cookiestatus.com';
```

If the user's browser requests a resource from **cookiestatus.com**, such as an image or a JavaScript file, then the *response* from the web server can also use the `Set-Cookie` header to **set** a cookie on **cookiestatus.com**, and it will then be available for reading on **ecommerce.cookiestatus.com** and **blog.ecommerce.cookiestatus.com**.

Similarly, any HTTP request for any resource residing on a domain in the same hierarchy would include all the cookies written on that domain or any domain higher in the hierarchy in the `cookie` header. The web server can read these stored bits of information and parse them however they like.

{{< figure src="/images/content/cookie-header.jpg" title="Sample cookie header with all cookies available on the target domain" class="left-align" >}}

The browser can also read any cookies available to the current domain with JavaScript (except if they have been specifically flagged as `HttpOnly`, meaning they are only passed in HTTP headers).

```JavaScript
console.log(document.cookie); // Outputs "userId=abcd1234"
```

These examples show how cookies are accessed in a **first-party context**. 

## First-party and third-party context

It's common in the parlance of the web to talk about **first-party cookies** and **third-party cookies**. This is a bit of a misnomer. Cookies are pieces of information that are stored on the user's computer. There is no distinction between *first-party* and *third-party* in how these cookies are classified and stored on the computer.

What matters is the **context** of the access.

{{% notice info %}}
Nevertheless, to align with other discussions around the same topic, Cookie Status will use *first-party cookie*  and *third-party cookie* for clarity's sake.
{{% /notice %}}

The examples presented in the previous chapter describe cookie access in a **first-party context**. When the user's browser requests a resource from the same domain hierarchy (up to eTLD+1) as the website the user is currently on, that request will include all the cookies that have been set for that domain.

{{% notice info %}}
**This is important**. The endpoint of the request has access to *all* cookies written on the domain that is mapped to that endpoint. This means that if the endpoint is controlled by a third party, any requests for resources from that endpoint would include cookies you might not want to share with the third party.
{{% /notice %}}

However, if the user's browser requests a resource from a domain that is *not* part of the domain hierarchy the user is currently on, cookies would not be shared between the source and the target of the request. 

As mentioned above, the endpoint has access to all cookies written on the domain mapped to that endpoint. Thus if **blog.ecommerce.cookiestatus.com** makes a request to **image.imagestore.com**, the request would include all the cookies written on the user's computer for **image.imagestore.com** and **imagestore.com**.

Similarly, if the endpoint responds with a `Set-Cookie` header, they can **write** cookies on **image.imagestore.com** or **imagestore.com** with the HTTP response.

{{% notice info %}}
The endpoint at **image.imagestore.com** would **not** have access to cookies written on **blog.ecommerce.cookiestatus.com**, even if the request originated from the latter.
{{% /notice %}}

This type of cookie access occurs in a **third-party context**, because the cookies are read from and written on a domain that is not part of the domain hierarchy the user is currently on.

> You can get and set cookies in third-party context with JavaScript as well. If the website loads content from the external domain in an `<iframe>` element, for example, the user's browser can run `document.cookie` commands within that `<iframe>`, and the reading and writing would happen in the context of *that* domain and not the one the user is currently on. 

Accessing cookies in a **third-party context** is necessary for some benign features of the web, such as persisting user authentication across the domains of an organization (SSO), or for passing information about user's marketing consent from one part of the organization to another.

However, cookie access in a third-party context can be abused as well, because it can be used for **cross-site tracking** without the user's consent or awareness.

## Cross-site tracking

A common thread in the rhetoric is that browsers want to quench **cross-site tracking**. Here's how [Safari describes it](https://webkit.org/blog/7675/intelligent-tracking-prevention/):

> Imagine a user who first browses example-products.com for a new gadget and later browses example-recipies.com for dinner ideas. If both these sites load resources from example-tracker.com and example-tracker.com has a cookie stored in the user’s browser, the owner of example-tracker.com has the ability to know that the user visited both the product website and the recipe website, what they did on those sites, what kind of web browser was used, et cetera. This is what’s called *cross-site tracking* and the cookie used by example-tracker.com is called a *third-party cookie*. In our testing we found popular websites with over 70 such trackers, all silently collecting data on users.

In essence, **cross-site tracking** utilizes centralized tracking domains for scripts to communicate with from the sites the user actually visits. These tracking domains leverage third parties' access to *browser storage* (mainly cookies) to build profiles of all the sites the user has visited. 

{{< figure src="/images/content/cross-site-tracking.jpg" title="Cross-site tracking" class="left-align" >}}

To continue the examples from the previous chapters, when the user's browser makes a request for **image.imagestore.com** while on the **blog.ecommerce.cookiestatus.com**, the endpoint at **image.imagestore.com** will now know that the request originated from **blog.ecommerce.cookiestatus.com**, as this is included in the `origin` and `referer` [sic] headers.

Thus the endpoint at **image.imagestore.com** could now check if the user has an identifier cookie set on that domain, and they can augment the profile for that identifier with knowledge that the user has visited **blog.ecommerce.cookiestatus.com**.

If the user then visits another page on the internet that also communicates with **image.imagestore.com**, then that endpoint will be privy to yet another origin, and they can keep building the profile.

This is the essence of cross-site tracking - using a consolidated and centralized store (e.g. a cookie) to collect information from different domains.

## Restrict storage access

Browsers' main weapon against cross-site tracking is restricting **storage access**. Because there are valid reasons for cross-site tracking (persisting user authentication, shopping baskets, consent status), tracking protection methods restrict storage access for third parties that have been **identified** and **classified** as compromising user privacy. 

**Mozilla Firefox**, for example, describes their own effort [like this](https://blog.mozilla.org/futurereleases/2018/08/30/changing-our-approach-to-anti-tracking/):

> In order to help give users the private web browsing experience they expect and deserve, Firefox will strip cookies and block storage access from third-party tracking content, based on lists of tracking domains by [Disconnect](https://disconnect.me/).

This approach of comparing the third-party domains against a curated list is utilized also by **Microsoft Edge**. Here's how they introduce [Edge's tracking prevention](https://blogs.windows.com/msedgedev/2019/06/27/tracking-prevention-microsoft-edge-preview/):

> We’ve added a new component to Microsoft Edge, Trust Protection Lists**,** that contains the latest information on which organizations may be trying to track users on the web. This component allows us to be flexible with where we source details on what a tracker is and when we deliver updated lists to our users.

The **Safari** browser has the most interesting approach. Instead of a binary approach (blocked vs. not blocked) and a set list of domains, Safari's [Intelligent Tracking Prevention](https://webkit.org/blog/category/privacy/) uses multiple methods to restrict the storage access for third parties that are *algorithmically* classified as having cross-site tracking capabilities. Here's how they describe the [classification process](https://webkit.org/blog/7675/intelligent-tracking-prevention/): 

> A machine learning model is used to classify which top privately-controlled domains have the ability to track the user cross-site, based on the collected statistics. Out of the various statistics collected, three vectors turned out to have strong signal for classification based on current tracking practices: subresource under number of unique domains, sub frame under number of unique domains, and number of unique domains redirected to. All data collection and classification happens on-device.

However, Safari's approach *is* binary in a sense - you can either enable **all** cross-site tracking or **none**.

{{< figure src="/images/content/safari-settings.jpg" title="Safari privacy settings" class="left-align" >}}

The **Chrome** browser is, for now, devoid of any significant tracking protection measures. However, they have contributed to the discussion with their [privacy sandbox](https://www.blog.google/products/chrome/building-a-more-private-web/) initiative, as well as with upcoming features involving [cookie restrictions](https://blog.chromium.org/2019/05/improving-privacy-and-security-on-web.html) and [referrer policies](https://www.chromestatus.com/feature/6251880185331712).
