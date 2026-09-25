# franciscocbatista.com

Personal site of Francisco Cordeiro Batista, Advisory Analyst at Finsolutia (Madrid). Dark editorial layout: selected work, experience, credentials, and a contact form.

Live: [franciscocbatista.com](https://franciscocbatista.com)

## Stack

- Vite 7, React 18, TypeScript
- Tailwind CSS 3.4 with a small token set in `src/index.css`; a few shadcn/ui primitives (`Dialog`, `Sheet`, `ScrollArea`, `Tooltip`)
- GSAP ScrollTrigger for reveal-on-scroll, Lenis for smooth scrolling, framer-motion for route fades
- react-router 6 (`/`, `/privacy`, `/projects/spark-analytics/:notebook`)
- Contact form: Formspree + Google reCAPTCHA v2

## Languages

English, European Portuguese and Spanish. All copy lives in `src/locales/{en,pt-pt,es}.ts`. `en.ts` defines the `Translation` type; the other two files are annotated with it, so a missing or extra key fails `npm run typecheck`. The language is picked from `?lang=`, then `localStorage`, then the browser locale.

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
- Project reports and CV: `public/*.pdf`, referenced from `src/components/Projects.tsx` and `src/lib/links.ts`
- Portrait and Open Graph image: `public/profile.jpg`, `public/og-image.jpg`
- SEO tags and structured data: `index.html`

## Deployment

Static build in `dist/`. The host must rewrite `/privacy` and `/projects/*` to `index.html` (single-page app fallback).

© 2026 Francisco Cordeiro Batista.
