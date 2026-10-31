---
title: CNAME cloaking
feature: cname-cloaking
---
**CNAME cloaking** hides a third party behind a subdomain of the site itself. The site creates a subdomain such as `metrics.example.com` and points it, through a DNS CNAME record, at a vendor's server. To the browser the requests look first-party, so the vendor gets first-party cookies and avoids lists of third-party trackers.

The same technique is used for legitimate reasons, such as running your own server-side tagging. Browsers that counter it either look up the CNAME record and treat the request as going to the real destination, or limit the cookies such subdomains can set.
