---
title: Cookies in third-party context
feature: third-party-cookies
---
A cookie is used in **third-party context** when it belongs to a site other than the one in the address bar, for example in an embedded `<iframe>`, an image or a script loaded from another site. Third-party cookies let one company recognize the same browser on every site that embeds its content, which is the classic way of **cross-site tracking**. They also power legitimate features such as embedded sign-in, chat and payment widgets.

Browsers take one of three approaches:

* **Allowed**: the third party gets the same cookies on every site.
* **Partitioned**: the third party gets a separate set of cookies on each top-level site, so it can't link the visits. Sites can opt individual cookies in to partitioning with the `Partitioned` attribute ([CHIPS](/glossary/#chips)).
* **Blocked**: no cookies at all in third-party context.

Where cookies are partitioned or blocked, embedded content can ask for its unpartitioned cookies through the [Storage Access API](/glossary/#storage-access-api).
