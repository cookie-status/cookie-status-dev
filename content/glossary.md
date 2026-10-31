---
title: "Glossary"
date: 2019-12-02T11:57:51+02:00
draft: false
toc: true
---
This is a **glossary of terms** used in the website.

## AdTech

Term used to describe **advertising technologies** and the companies and vendors working in AdTech. Many AdTech vendors utilize **cross-site tracking** to exploit user data in browser storage.

---

## Analytics

Industry, vendors, tools, platforms, and methodologies grouped together by the pursuit of **empirical data** for measuring things like *web performance*, *user behavior* and *advertising efforts*.

Often focuses on data collection in a **first-party context**, but especially in AdTech, analytics tools are used for collecting and analyzing data in **third-party context** as well.

---

## Chromium

An open-source web browser project, used as the foundation of a variety of browsers, including [Chrome](/chrome/), [Brave](/brave/) and [Edge](/edge/).

Much of the technology in Chromium is also used in the Chrome browser, but the two projects diverge when it comes to the full tech stack.

---

## CHIPS

**C**ookies **H**aving **I**ndependent **P**artitioned **S**tate. A cookie set with the `Partitioned` attribute can be used in **third-party context**, but it is [partitioned](#partitioning) by the top-level site. Supported by Chrome, Edge and Safari.

---

## Conversion

An event or metadata of a user, collected by **analytics** tools and **AdTech** platforms to calculate the efficiency of campaigns and of content optimization and personalization efforts. 

Each organization can have their own interpretation of what a *conversion* is, but typically it is something that has a measurable impact on the business bottom line.

---

## Cookie

A key-value pair (e.g. `userStatus=logged-in`) stored in the user's computer. Cookies are keyed to the domain on which they were set. Accessing cookies in same-site requests occurs in **first-party context**, and such cookies are termed **first-party cookies**. Cross-origin access happens in **third-party context** and these cookies are called **third-party cookies**. 

---

## Cookie matching / syncing

Data management platforms (DMP) and demand-side platforms (DSP) can exchange user information in their own data stores, mapping each platform's own list of users to other lists by utilizing shared keys in **third-party storage**. 

This way a DMP can build a comprehensive graph of a user's cross-site navigation on the web without actually having their own data collection architecture present on all the websites.

---

## Cross-origin

"Origin" is the protocol (e.g. `https`), hostname (e.g. `www.domain.com`) and port (e.g. `4097`) of the URL. If the origin of the site where the request was sent from differs from the origin of the site the request is sent to, the request is considered to be *cross-origin*.

For example:

* A request from `https://www.domain.com/page.html` to `https://www.domain.com/images/image.jpg` is **same-origin**, as both the source and target share the origin.
* A request from `https://www.domain.com/page.html` to `https://images.domain.com/images/image.jpg` is **cross-origin**, as the source and target do not share the origin.

---

## Cross-site

Cross-site is a *type* of **cross-origin** communication, but it's more rigid as it requires that the source and target of the request do not share the [effective top-level domain plus one part](#etld1) (eTLD +1). 

For example:

* A request from `https://www.domain.com/page.html` to `https://images.domain.com/images/image.jpg` is **cross-origin** and **same-site**, as the eTLD+1 (`domain.com`) is shared by the source and target.
* A request from `https://www.domain.com/page.html` to `https://imagesource.domaincdn.com/images/image.jpg` is **cross-origin** and **cross-site**, as the eTLD+1 (`domain.com` and `domaincdn.com`) is different between the source and target.

---

## Cross-site tracking

Cross-site tracking refers to a tracking domain harvesting data from user's navigation and actions on other, unrelated sites. This is typically done by storing an identifier in a cookie on the tracking domain, and communicating with the tracking domain in a **third-party context**.

Cross-site tracking happens covertly, and the user typically has no knowledge of all the data that has been collected from them while browsing the web.

---

## Domain hierarchy

Domain (or DNS) hierarchy refers to the domain names in a given domain name string (fully qualified domain name). With the `document.cookie` JavaScript API, the browser can read and write **cookies** on the current domain and all the domains *higher* in the hierarchy, all the way to eTLD+1.

Thus a user browsing a site on `sub.blog.domain.com` can read and write cookies on `sub.blog.domain.com`, `blog.domain.com` and `domain.com`.

---

## Enhanced Tracking Protection (ETP)

The name of the tracking protection mechanism in the [Firefox](/firefox/) web browser.

ETP uses the [Disconnect.me](https://disconnect.me/) lists to determine whether a given domain is a known tracker or not. Since 2022, its default Standard mode also includes **Total Cookie Protection**, which [partitions](#partitioning) the cookies and storage of every third party.

---

## eTLD+1

**Effective top-level domain** plus **one part**. eTLD would comprise the top-level domain (e.g. `.com` and `.uk`) and sometimes a second-level of hierarchy (e.g. `.co` in `.co.uk` or `.com` in `.com.au`). Thus eTLD is the same thing as the [Public Suffix](https://publicsuffix.org/).

The "one part" is then the next level in the domain hierarchy, i.e. the domain name the site would have acquired to map to their servers. 

The eTLD+1 term is used in particular by Safari's Intelligent Tracking Prevention documentation to refer to the highest domain name the browser has read/write storage access to.

---

## Fingerprinting

Identifying a browser by combining many small details it exposes, such as screen size, fonts, time zone and how it draws to a `<canvas>`. Unlike a cookie, a fingerprint can't be deleted by the user. Browsers counter it by blocking known fingerprinting scripts, by reducing the detail they expose, or by adding random noise to the values (Brave calls this *farbling*).

---

## First-party

In the context of **storage access**, first-party references the domain the user is currently on. Browser storage is typically completely restricted to the first-party.

Cookie access is a bit different, as the browser can access cookies in a first-party context on the domain they are on *and* on any domain higher up in the domain hierarchy (all the way to eTLD+1).

---

## Gecko

The browser engine of [Firefox](/firefox/). ("Quantum" was the name of the 2017 project that rebuilt large parts of it.)

---

## Identity resolution

Services that link identifiers such as hashed email addresses, IP addresses and device signals to recognize the same person across sites and devices, building an *identity graph* ("ID graph"). They are an alternative to **third-party cookies** for **cross-site tracking**. Safari 27 [blocks cross-site requests](/safari/#tracker-blocking) to known identity resolution services.

---

## Intelligent Tracking Prevention (ITP)

The name of the Safari browser's tracking protection mechanism and related tools.

Due to its wide-spread use (especially on mobile devices), its algorithmic evaluation of tracking domains, and its impact on first-party storage, ITP has been a big disruption on AdTech and analytics industries. 

---

## Link decoration

The act of adding URL query string parameters (e.g. `https://www.domain.com?id=12345` or hash fragments (e.g. `https://www.domain.com/#id=12345`) to outbound links from a website with the purpose of passing some key-value pairs from first-party storage to another site without having to worry about third-party storage access restrictions.

Since the values are passed in the URL, the target site can access them by simply taking them from the URL string.

---

## Partitioning

Keeping a third party's cookies or other storage separate for each top-level site it's embedded on. `b.example` embedded on `a.example` gets one storage area, and `b.example` embedded on `c.example` gets another, so the two can't be linked. Brave, Chrome, Edge, Firefox and Safari all partition at least some third-party storage by default.

---

## PageGraph

[PageGraph](https://github.com/brave/brave-browser/wiki/PageGraph) is a tool built for the Brave browser, which analyzes the way in which a web document operates (and is operated on) within the browser. 

PageGraph builds a representation of things like node changes, network requests, and script execution, so that this research could be used to, for example, optimize the privacy-preserving feature restrictions of the browser that produced the graph.

---

## Referrer

When the web browser issues a request to a web server, that request often includes the `referer ` [sic] header to indicate the URL the request originated from.

If the target resource is a web page, i.e. the request originated from a link click, when the web page is rendered the referrer string is written into the `document.referrer` property.

Due to its capability to carry information that could be utilized in cross-site tracking contexts, browsers make the referrer string less informative through *referrer downgrade*.

---

## Referrer downgrade

Downgrading the referrer means stripping out parts of it that could be utilized for cross-site tracking or carrying sensitive information.

All major browsers now default to the `strict-origin-when-cross-origin` [referrer policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy), which means that for cross-origin requests the referrer is stripped of its path, query, and fragment parts. Thus `https://www.sourcedomain.com/some-page-with-link/?id=12345` would become `https://www.sourcedomain.com` in the `referer` header.

**Brave** and **Firefox** don't let sites loosen this policy for cross-site requests, and **Safari** always cuts the referrer of third-party requests to the origin. See each browser's page for details.

---

## Script-writable storage

Refers to browser storage that can be accessed with JavaScript. Typically this would be **browser cookies**, `localStorage`, `sessionStorage`, and `IndexedDB`.

---

## Storage Access API

A web API that lets content embedded in **third-party context**, such as an `<iframe>`, ask for access to its unpartitioned cookies, usually after a click and sometimes with a prompt to the user. See [Safari](/safari/#storage-access-api) for how it works there.

---

## Third-party

In the context of **storage access**, third-party means that the browser is trying to access storage that is not on the current domain. 

For example, while on `web.domain.com` if the browser makes a request for an image on `image.imagestore.com`, whether the request has access to cookies written on `image.imagestore.com` depends on the browser: it may send them, send only a [partitioned](#partitioning) set, or send none. The same applies when the response from `image.imagestore.com` tries to write a cookie with a `Set-Cookie` header.

If the web browser loaded another domain's content in an `<iframe>` element, then any storage access (using e.g. `document.cookie` or `localStorage`) within that `<iframe>` would happen in a third-party context.

---

## WebKit

A browser engine developed by Apple and used as the engine for the Safari browser. Outside the EU, all browsers on iOS and iPadOS must use WebKit, so they all get its [tracking protections](/safari/).
