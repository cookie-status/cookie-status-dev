+++
title = "Cookie Status"
description = "Compare how Safari, Firefox, Chrome, Edge and Brave handle third-party cookies, storage, CNAME cloaking and referrers in their default browsing mode."
date = 2020-08-05T07:00:26+02:00
# Cliqz shut down in 2020 and its page was removed; send old links to the comparison.
aliases = ["/cliqz/", "/cliqz/anti-tracking/", "/cliqz/useful-resources/"]
+++

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

It doesn't use `sessionStorage` either, and it doesn't load anything from third-party servers. The search index is served from this site.

If you see anything contrary to the above, please raise [an issue](https://github.com/cookie-status/cookie-status-dev/issues) about this.
