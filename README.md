# franciscocbatista.com

Personal site of Francisco Cordeiro Batista, data scientist working in fintech (Madrid). Dark editorial layout, CV-style: profile, selected work, experience, credentials, and a contact form.

Live: [franciscocbatista.com](https://franciscocbatista.com)

## Stack

- Vite 7, React 18, TypeScript
- Tailwind CSS 3.4 with a small token set in `src/index.css`; a few shadcn/ui primitives (`Dialog`, `Sheet`, `Tooltip`)
- GSAP ScrollTrigger for reveal-on-scroll, Lenis for smooth scrolling, framer-motion for route fades, a CSS keyframe for the hero
- react-router 6
- Contact form: Formspree + Google reCAPTCHA v2
- Analytics: Plausible (cookieless, aggregate only; the script tag lives in each HTML entry)
- Hosting: Vercel (`vercel.json`)

## Routes

| URL | Page |
|---|---|
| `/`, `/pt/`, `/es/` | Home, in English, Portuguese, Spanish |
| `/thesis` | Compliance.AI master's thesis, with the five-year financials chart |
| `/projects/bid` | BID currency case, with the borrowing-cost calculator |
| `/projects/bank` | Bank branch profitability, with the margin simulator |
| `/privacy` | Privacy policy |
| `/projects/spark-analytics/:notebook` | Databricks notebooks (`traffic`, `spotify`) |

## Languages

English, European Portuguese and Spanish. All copy lives in `src/locales/{en,pt-pt,es}.ts`. `en.ts` defines the `Translation` type; the other two files are annotated with it, so a missing or extra key fails `npm run typecheck`. The language is picked from the path (`/pt/`, `/es/`), then `?lang=`, then `localStorage`, then the browser locale.

Numbers are formatted by hand in `src/lib/format.ts`, not with `Intl`, so the prerendered HTML and the browser render match exactly.

## Prerendering

`npm run build` runs three steps:

1. `vite build`: the client bundle, with four HTML entries (`index.html`, `pt/index.html`, `es/index.html`, `thesis/index.html`), each with its own title, description, Open Graph image and hreflang links.
2. `vite build --ssr src/entry-server.tsx`: a Node build of the same app.
3. `scripts/prerender.mjs`: renders every route in the list there to `dist/<route>/index.html`, swaps in per-route meta tags for routes without their own entry, and writes `dist/404.html`.

In the browser, `src/main.tsx` hydrates the prerendered HTML when the visitor's language matches the one it was rendered in (`<html data-prerender-lang>`), and renders fresh otherwise. A small inline script in `<head>` hides the page during that swap so the wrong language never flashes.

To add a page: add the route in `src/App.tsx`, add it to `ROUTES` in `scripts/prerender.mjs` (with meta tags), add a rewrite in `vercel.json`, and add it to `public/sitemap.xml`.

## Scripts

```bash
npm install
npm run dev        # http://localhost:8080 (client-only, no prerender)
npm run typecheck  # tsc, no emit
npm run lint
npm run build      # client + SSR build + prerender
npm run preview
```

## Editing content

- Copy: `src/locales/*.ts`
- Project reports, thesis and CV: `public/*.pdf`, referenced from `src/components/Projects.tsx`, the pages in `src/pages/` and `src/lib/links.ts`
- Open Graph images: `public/og-*.jpg` (1200×630)
- SEO tags and structured data: the four HTML entries, plus `ROUTES` in `scripts/prerender.mjs`
- Saxophone clip: `public/saxophone.mp4` (H.264, 640p, denoised, ~6 MB), poster `public/saxophone-poster.jpg`

## Deployment

Vercel builds with `npm run build` and serves `dist/`. Every route exists as a real file; `vercel.json` maps the paths without a trailing slash to them, and unknown paths get `dist/404.html` with a 404 status.

Plausible: the site must be added at plausible.io under the domain `franciscocbatista.com` for the dashboard to receive data. Nothing in the code changes.

© 2026 Francisco Cordeiro Batista.
