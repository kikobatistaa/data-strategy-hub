// Renders every public route to static HTML after `vite build` and the SSR build.
// Crawlers and link previews get real content; the app hydrates on top of it.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Production React (no dev warnings, same output as the client bundle).
process.env.NODE_ENV = "production";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const SITE = "https://franciscocbatista.com";

const { render } = await import(pathToFileURL(path.join(root, "dist-server", "entry-server.js")).href);

// Mirrors detectLanguage() in src/contexts/LanguageContext.tsx. When the visitor's language
// differs from the prerendered one, adds `pr-swap` (hide until the app re-renders in the right
// language). Gives up after 6s so a failed bundle never hides the page.
const HEAD_SCRIPT = `<script>(function(){var d=document.documentElement,p=d.getAttribute("data-prerender-lang"),l="en";try{var ok=function(x){return x==="en"||x==="pt-pt"||x==="es"},m=location.pathname.match(/^\\/(pt|es)\\/?$/),q=new URLSearchParams(location.search).get("lang"),s=localStorage.getItem("language"),n=(navigator.language||"").toLowerCase();if(m)l=m[1]==="pt"?"pt-pt":"es";else if(ok(q))l=q;else if(s==="pt-br")l="pt-pt";else if(ok(s))l=s;else if(n.indexOf("pt")===0)l="pt-pt";else if(n.indexOf("es")===0)l="es"}catch(e){}if(l!==p)d.classList.add("pr-swap");setTimeout(function(){if(!window.__mounted)d.classList.remove("pr-swap")},6000)})();</script>`;

const DEFAULT_IMAGE = "og-image.jpg";

// Routes without their own HTML entry reuse index.html with these tags swapped in.
const ROUTES = [
  { path: "/", lang: "en", template: "index.html" },
  { path: "/pt/", lang: "pt-pt", template: "pt/index.html" },
  { path: "/es/", lang: "es", template: "es/index.html" },
  { path: "/thesis", lang: "en", template: "thesis/index.html" },
  {
    path: "/projects/bid",
    lang: "en",
    meta: {
      title: "Which currency to borrow in: yen or dollars for a development bank | Francisco Cordeiro Batista",
      description:
        "International finance case, UC3M: parity conditions tested on 118 months of yen and dollar data, an interactive borrowing-cost calculator, and a rules-based hedging recommendation.",
      image: "og-bid.jpg",
      imageAlt: "Which currency to borrow in, a case study by Francisco Cordeiro Batista",
    },
  },
  {
    path: "/projects/bank",
    lang: "en",
    meta: {
      title: "Bank branch profitability: an econometric model of 129 branches | Francisco Cordeiro Batista",
      description:
        "Econometrics case, UC3M: a log-log OLS model of the ordinary margin across 129 bank branches (adjusted R² 84%), an interactive what-if simulator, and a residual-based bonus method.",
      image: "og-bank.jpg",
      imageAlt: "Bank branch profitability, a case study by Francisco Cordeiro Batista",
    },
  },
  {
    path: "/privacy",
    lang: "en",
    meta: {
      title: "Privacy Policy | Francisco Cordeiro Batista",
      description: "How franciscocbatista.com handles contact-form data and cookieless analytics.",
    },
  },
  {
    path: "/projects/spark-analytics/traffic",
    lang: "en",
    meta: {
      title: "Traffic prediction notebook, Spark on Databricks | Francisco Cordeiro Batista",
      description: "Databricks notebook: traffic prediction with Spark MLlib. NOVA IMS Big Data Analytics project, graded 20/20.",
    },
  },
  {
    path: "/projects/spark-analytics/spotify",
    lang: "en",
    meta: {
      title: "Spotify playlist analysis notebook, Spark on Databricks | Francisco Cordeiro Batista",
      description: "Databricks notebook: Spotify playlist analysis with Spark and GraphFrames. NOVA IMS Big Data Analytics project, graded 20/20.",
    },
  },
];

const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function replaceOnce(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`prerender: ${pattern} not found in template`);
  // Function replacer: values may contain `$`, which a string replacement would interpret.
  return html.replace(pattern, () => replacement);
}

function applyMeta(html, routePath, meta) {
  const url = SITE + routePath;
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const image = `${SITE}/${meta.image ?? DEFAULT_IMAGE}`;
  const imageAlt = escapeHtml(meta.imageAlt ?? meta.title);

  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`);
  for (const [attr, key, value] of [
    ["name", "title", title],
    ["name", "description", description],
    ["property", "og:url", url],
    ["property", "og:title", title],
    ["property", "og:description", description],
    ["property", "og:image", image],
    ["property", "og:image:alt", imageAlt],
    ["name", "twitter:url", url],
    ["name", "twitter:title", title],
    ["name", "twitter:description", description],
    ["name", "twitter:image", image],
    ["name", "twitter:image:alt", imageAlt],
  ]) {
    html = replaceOnce(html, new RegExp(`<meta ${attr}="${key}" content="[^"]*" />`), `<meta ${attr}="${key}" content="${value}" />`);
  }
  html = replaceOnce(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);
  // The language alternates belong to the home page only.
  html = html.replace(/\n\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>/g, "");
  return html;
}

function finalise(html, lang, appHtml) {
  const htmlLang = html.match(/<html lang="([^"]*)">/)?.[1];
  if (!htmlLang) throw new Error("prerender: <html lang> not found in template");
  html = replaceOnce(html, /<html lang="[^"]*">/, `<html lang="${htmlLang}" data-prerender-lang="${lang}">`);
  html = replaceOnce(html, /<head>/, `<head>\n    ${HEAD_SCRIPT}`);
  html = replaceOnce(html, /<div id="root"><\/div>/, `<div id="root">${appHtml}</div>`);
  return html;
}

const outFile = (routePath) => {
  const clean = routePath.replace(/^\/|\/$/g, "");
  return path.join(dist, clean, "index.html");
};

const baseTemplate = await fs.readFile(path.join(dist, "index.html"), "utf8");

// 404 page: served by the host for unknown paths. Rendered by the client (it shows the
// attempted path), so it is not prerendered, just marked noindex.
{
  let html = applyMeta(baseTemplate, "/404", {
    title: "Page not found | Francisco Cordeiro Batista",
    description: "This page does not exist.",
  });
  html = replaceOnce(html, /<meta name="robots" content="[^"]*" \/>/, `<meta name="robots" content="noindex" />`);
  html = replaceOnce(html, /<head>/, `<head>\n    ${HEAD_SCRIPT}`);
  await fs.writeFile(path.join(dist, "404.html"), html);
}

for (const route of ROUTES) {
  const template = route.template ? await fs.readFile(path.join(dist, route.template), "utf8") : baseTemplate;
  const withMeta = route.meta ? applyMeta(template, route.path, route.meta) : template;
  const appHtml = await render(route.path, route.lang);
  const html = finalise(withMeta, route.lang, appHtml);
  const file = outFile(route.path);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, html);
  console.log(`prerendered ${route.path.padEnd(36)} ${route.lang.padEnd(6)} ${(html.length / 1024).toFixed(0)} kB`);
}

await fs.rm(path.join(root, "dist-server"), { recursive: true, force: true });
