---
title: "Test your own site"
description: How to check what a browser does with your cookies and storage, using the browser's own tools and a few console commands.
weight: 60
toc: true
---
The [comparison table](/) describes each browser's defaults, but the quickest way to know how your own site behaves is to test it. Use a normal window with default settings: private windows and changed settings behave differently.

## Before you start

* Use a **fresh profile** in each browser, or clear the data of the sites you test, so earlier visits don't affect the result.
* Test on **real HTTPS sites**. The examples below use the public test sites `example.com`, `example.org` and `example.net`, and `httpbin.org`, which echoes requests back.
* Open the developer tools (**Console** and **Application** / **Storage**). In Safari, turn on *Show features for web developers* in the Advanced settings first.

## Is a third-party cookie sent?

1. Open `https://httpbin.org/response-headers?Set-Cookie=cs3p%3D1%3B%20Path%3D%2F%3B%20SameSite%3DNone%3B%20Secure` to set a cookie on `httpbin.org`.
2. Open `https://example.com` and run this in the console:

   ```js
   fetch('https://httpbin.org/cookies', { credentials: 'include' })
     .then((r) => r.json()).then((j) => console.log(JSON.stringify(j)))
   ```

If the output includes `cs3p`, the browser sent the cookie in a third-party request. An empty object means it was blocked or partitioned.

## Is storage in an iframe partitioned?

1. On `https://example.com`, embed another site:

   ```js
   f = document.createElement('iframe'); f.src = 'https://example.org'; document.body.append(f)
   ```

2. In the console's context menu (usually "top"), switch to the `example.org` frame and run `localStorage.setItem('cs', '1')`.
3. Repeat step 1 on `https://example.net`, switch to the frame, and run `localStorage.getItem('cs')`.

`null` means storage is partitioned: the same `example.org` frame sees different storage on different sites. `"1"` means it's shared.

## How long does a cookie live?

On your site, set a cookie with a two-year lifetime and check its expiry in the storage panel:

```js
document.cookie = 'cs_long=1; max-age=63072000; path=/'
```

Chrome and Edge cap it at 400 days, Brave at about 6 months. Safari deletes cookies set with `document.cookie` after 7 days of browser use without interaction on the site, whatever expiry they were given.

## What referrer do other sites see?

On a page with a query string, such as `https://example.com/?x=1`, run `location.href = 'https://httpbin.org/headers'` and look at the `Referer` value. To see whether the browser lets a site loosen its policy, add a `<meta name="referrer" content="unsafe-url">` first:

```js
document.head.insertAdjacentHTML('beforeend', '<meta name="referrer" content="unsafe-url">')
```

## Browser-specific tools

* **Safari:** [ITP Debug Mode](https://www.simoahava.com/privacy/itp-debug-mode-in-safari/) logs which domains Intelligent Tracking Prevention has classified, and lets you mark a test domain as a tracker.
* **Edge:** `edge://site-engagement` shows the engagement scores that relax tracking prevention. The console reports `Tracking Prevention blocked access to storage for <URL>` when it applies.
* **Firefox:** the shield icon in the address bar lists what Enhanced Tracking Protection blocked on the page.
* **Brave:** the Shields panel (the lion icon) lists blocked requests.
* **Chrome:** the **Issues** panel and the **Application → Cookies** panel flag cookies that weren't sent and why.

For a broad, regularly updated comparison of default protections, see [privacytests.org](https://privacytests.org/).

## Found something different?

If your result doesn't match this site, [open an issue](https://github.com/cookie-status/cookie-status-dev/issues/new?labels=content) with the browser version, the steps and what you saw.
