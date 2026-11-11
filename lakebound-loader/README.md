# Lakebound Transportation logo loader

An animated logo loading screen: the logo assembles piece by piece (navy L, navy T, teal
arrows, medical cross with a soft glow), the wordmark fades in, and the screen fades away
to reveal the page.

| File | What it is |
| --- | --- |
| `lakebound-loader.html` | The loader. One self-contained block of CSS, markup and script, with no dependencies. |
| `demo.html` | Preview page. Open it in a browser to replay the loader at fast, typical and slow load speeds. |
| `lakebound-logo.svg` | The logo with the "LAKEBOUND TRANSPORTATION" wordmark, as a standalone vector file with each part as its own named shape. |
| `lakebound-logo-mark.svg` | The shield logo on its own, without the wordmark. |

## Install

1. Open the HTML file that every page of the site starts from (for example `index.html`).
2. Paste the whole contents of `lakebound-loader.html` as the **first thing inside `<body>`**.
3. Delete the old loading dots or spinner.

It has to be in the page's HTML itself, not added later by JavaScript, so that it is on
screen from the very first paint.

## Behaviour

- Shows when someone opens the site or refreshes, and is skipped for link clicks inside the site.
- The full assembly takes about 1.5 seconds. If the page is ready sooner, the remaining pieces
  settle quickly while the screen is already fading, so nobody waits for the animation.
- If the page takes longer, the finished logo breathes gently until the page is ready.
- Visitors who have "reduce motion" turned on see the finished logo and a plain fade.
- With JavaScript turned off the loader never appears, and it removes itself after 8 seconds
  at most (12 seconds if its script fails), so it cannot get stuck.

## Options

Set these as attributes on the `<div id="lb-loader">` element.

| Attribute | Values | Effect |
| --- | --- | --- |
| `data-ready` | `auto` (default) | Hide when the browser's `load` event fires. |
| | `manual` | Stay until the site calls `LakeboundLoader.done()`. Use this for an app that fetches its content after the page loads. |
| `data-show` | `entry` (default) | Show on first open and refresh only. |
| | `always` | Show on every full page load. |
| `data-max-wait` | milliseconds, default `8000` | The longest the loader may stay, up to 12000. |

## About the artwork

No vector file of the logo was available, so the shapes were traced from the brand
reference image and the colours sampled from it (navy `#102344`, teal `#3fa89c`). If the
designer's original vector file exists, its paths can replace the traced ones. The wordmark
is Montserrat Bold converted to outlines, so no web font has to load.
