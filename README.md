# cookie-status-dev

Source for [www.cookiestatus.com](https://www.cookiestatus.com), a reference for how browsers handle cookies, storage and tracking in their **default** browsing mode.

## How the site is organized

| Where | What |
| --- | --- |
| `data/browsers.yaml` | Browsers covered, their mechanism and links. `matrix: true` puts a browser in the homepage table. |
| `data/features.yaml` | Rows of the comparison table. Each `id` is also the heading anchor on browser pages. |
| `data/status/<browser>.yaml` | What each browser does for each row: an optional `status` and the `claims` shown in the table. |
| `data/statuses.yaml` | The status vocabulary (Blocked, Partitioned, Limited, …). |
| `data/site.yaml` | The "Last updated" date and note on the homepage. |
| `content/<browser>/_index.md` | The full explanation for each browser. |
| `content/introduction/`, `content/glossary.md` | Background and definitions. |

To change the comparison table, edit `data/status/<browser>.yaml` and the matching section of `content/<browser>/_index.md`, then update `data/site.yaml`. The build fails with a clear message if a row, status or browser is missing or misspelled.

## Running locally

Requires [Hugo](https://gohugo.io/installation/) 0.150 or newer (CI uses 0.154.4).

```sh
hugo server
```

Search uses [Pagefind](https://pagefind.app/), which indexes the built site, so it only works after a full build:

```sh
hugo --gc --minify && npx pagefind --site public && npx serve public
```

## Deployment

Pushing to `master` builds the site with GitHub Actions and deploys it to GitHub Pages (`.github/workflows/deploy.yml`). Pull requests are built and link-checked but not deployed. External links are checked weekly (`.github/workflows/links.yml`).

The site sets no cookies, uses no browser storage and loads nothing from third parties. Please keep it that way.
