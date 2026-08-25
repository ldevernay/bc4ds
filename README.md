# Business Case for Digital Sustainability

Static site (Jekyll + Parcel) collecting real-world "story" cards about the
measurable and non-measurable benefits of digital sustainability —
inspired by [wpostats.com](https://wpostats.com/).

Live at: **sustainability.laudevsat.fr** (once deployed)
Built by [laudevsat.fr](https://laudevsat.fr).

## Stack & principles

- **Jekyll** — one Markdown file per story, in the `stories` collection (`_stories/`).
- **Parcel** — bundles and minifies the site's own CSS/JS (`src/`) into
  `assets/css` and `assets/js`, which Jekyll then copies through unchanged.
  Parcel handles minification, autoprefixing, and dead-code removal
  automatically — no manual optimisation step.
- **No JS framework, no web fonts, no CSS framework.** The theme is built to
  be as light and accessible as possible: system font stack, semantic HTML,
  AA/AAA colour contrast, `prefers-reduced-motion` and dark-mode support,
  a skip link, and full keyboard/focus support.
- **Client-side filtering**, entirely local — no
  network calls, no external service. It just shows/hides the
  server-rendered cards already in the page.

## Getting started

Requirements: Ruby + Bundler, Node.js + npm.

```bash
bundle install
npm install

npm start        # builds assets once, then runs `jekyll serve --livereload`
# or, in two terminals while developing:
npm run watch:assets     # Parcel watch mode (CSS/JS)
npm run jekyll:serve      # Jekyll serve

npm run build     # production build → _site/
```

## Adding a story

Create a new Markdown file in `_stories/`, named `YYYY-MM-DD-slug.md`:

```yaml
---
title: "A short, results-oriented headline"
company: "Company or project name"
sector: "Optional sector/industry"
logo: /assets/images/logos/company.svg
summary: "One or two sentences shown on the homepage card."
key_metric: "-42%"
key_metric_label: "what the number refers to"
tags: [performance, images, cost-savings]
date: 2026-04-01
source_url: "https://example.com/original-source"   # optional
source_name: "Publication name"                       # optional
---

## Key figures
- Bullet list of quantifiable results.

## Beyond the numbers
- Non-measurable gains: team morale, UX, brand, resilience, compliance, etc.
```

The front matter drives the homepage card (logo, key figure, summary, tags);
the body is the full story page, and should cover **both** measurable figures
and non-measurable gains, as described in the brief.

Drop the corresponding logo SVG/PNG into `assets/images/logos/`.

The four stories currently in `_stories/` are **fictitious placeholder
examples** — replace them with real cases before launch.

## Tags & filtering

Tags are free-form: just add any string to a story's `tags:` list. The
homepage automatically collects every tag in use across all stories and
renders a filter button for each — no separate configuration needed.

## RSS feed

`feed.xml` is a hand-written Liquid template (no plugin dependency) that
lists all stories, newest first, at `/feed.xml`.

## Branding

The current palette in `src/css/main.css` (`:root` custom properties) is a
**placeholder**, inspired by laudevsat.fr's nature/green identity. Before
launch:

1. Replace the hex values in `:root` with the exact colours from the
   laudevsat.fr graphic charter.
2. Replace `assets/images/site/logo.svg` and `favicon.svg` with the real
   laudevsat.fr logo assets (an SVG is preferred to keep the page light).

## Pages

- `/` — homepage, story cards grid with tag filters.
- `/business-case/` — the classic eco-design business case (cost, UX,
  compliance, resilience, brand, environmental impact).
- `/stories/<slug>/` — one page per story.
- `/feed.xml` — RSS feed.

## Repository

Source code: <https://github.com/ldevernay/sustainability-business-case>
(update `repository:` in `_config.yml` once the repo exists, if the URL
differs).
