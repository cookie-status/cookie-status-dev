---
title: Blocking of known trackers
feature: tracker-blocking
---
Once a domain is classified as a tracker, a browser can either **block** requests to it, or let the request through but **restrict its storage**.

* When a request is **blocked**, nothing reaches the tracker: a script never downloads or runs, and a pixel is never sent.
* When only storage is **restricted**, the script still runs and can send data, but it can't keep a cookie or other identifier that would let it recognize the same browser on other sites.

Blocking protects more but breaks more, so most browsers block only the categories they see as clearly harmful, such as cryptominers and fingerprinting scripts, and restrict the storage of everything else. Brave is the exception: it blocks everything on its filter lists that is loaded from another site.
