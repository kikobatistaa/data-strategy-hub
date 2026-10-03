# franciscocbatista.com

Personal site of Francisco Cordeiro Batista, data scientist working in fintech (Madrid). Dark editorial layout, CV-style: profile, selected work, experience, credentials, and a contact form.

Live: [franciscocbatista.com](https://franciscocbatista.com)

## Stack

- Vite 7, React 18, TypeScript
- Tailwind CSS 3.4 with a small token set in `src/index.css`; a few shadcn/ui primitives (`Dialog`, `Sheet`, `ScrollArea`, `Tooltip`)
- GSAP ScrollTrigger for reveal-on-scroll, Lenis for smooth scrolling, framer-motion for route fades
- react-router 6 (`/`, `/pt`, `/es`, `/thesis`, `/privacy`, `/projects/spark-analytics/:notebook`)
- Contact form: Formspree + Google reCAPTCHA v2
- Analytics: Plausible (cookieless, aggregate only; the script tag lives in each HTML entry)

## Languages

English, European Portuguese and Spanish. All copy lives in `src/locales/{en,pt-pt,es}.ts`. `en.ts` defines the `Translation` type; the other two files are annotated with it, so a missing or extra key fails `npm run typecheck`. The language is picked from the path (`/pt/`, `/es/`), then `?lang=`, then `localStorage`, then the browser locale.

## HTML entries

Crawlers and link previews do not run JavaScript, so there is one static HTML entry per language and one for the thesis, each with its own title, description, Open Graph image and hreflang links:

| URL | File | OG image |
|---|---|---|
| `/` | `index.html` | `public/og-image.jpg` |
| `/pt/` | `pt/index.html` | `public/og-image-pt.jpg` |
| `/es/` | `es/index.html` | `public/og-image-es.jpg` |
| `/thesis` | `thesis/index.html` | `public/og-thesis.jpg` |

All four load the same app (`src/main.tsx`); `vite.config.ts` lists them under `rollupOptions.input`. When you change a meta tag, change it in all four.

## Scripts

```bash
npm install
npm run dev        # http://localhost:8080
npm run typecheck  # tsc, no emit
npm run lint
npm run build
npm run preview
```

## Editing content

- Copy: `src/locales/*.ts`
- Project reports, thesis and CV: `public/*.pdf`, referenced from `src/components/Projects.tsx`, `src/pages/Thesis.tsx` and `src/lib/links.ts`
- Open Graph images: `public/og-*.jpg` (1200×630)
- SEO tags and structured data: `index.html`, `pt/index.html`, `es/index.html`, `thesis/index.html`
- Saxophone clip: `public/saxophone.mp4` (H.264, 640p, denoised, ~6 MB), poster `public/saxophone-poster.jpg`

## Deployment

Static build in `dist/`. The host must rewrite `/privacy`, `/thesis` and `/projects/*` to `index.html` (single-page app fallback). `dist/thesis/index.html`, `dist/pt/index.html` and `dist/es/index.html` exist as real files, so hosts that resolve directory indexes serve the localised meta tags directly.

Plausible: the site must be added at plausible.io under the domain `franciscocbatista.com` for the dashboard to receive data. Nothing in the code changes.

© 2026 Francisco Cordeiro Batista.
