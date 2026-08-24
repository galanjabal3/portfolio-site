# Galan Jabal Portfolio Site

Static portfolio page for presenting Galan Jabal's projects, LinkedIn summary,
technical skills, and selected work to recruiters or hiring teams.

## Files

- `index.html` - Main portfolio page (6 project cards, hero, about, skills, contact).
- `styles.css` - Responsive styling with CSS variables, grid layouts, and animations.
- `script.js` - Project search, category filtering, modal, hamburger menu, scroll reveal.
- `resume.html` - Standalone print-optimized A4 resume (Ctrl+P to save as PDF).
- `assets/` - Images, logos, and favicon for project cards.
- `robots.txt` - Search engine crawler instructions.
- `sitemap.xml` - Sitemap for search engine indexing.

## Features

- **7 project cards** — Sobat Pintar, Kantin, Toki Chat Bot, Auto Tester, Linkas, Pixel Drift, BootPy
- **AI-assisted badges** — all projects marked as AI-assisted development (Codex, Gemini, Claude, Opencode)
- **Search & filter** — real-time search by name/description + category filter (AI, Full-Stack, Bot, Tooling)
- **Case study modal** — detailed contribution breakdown for each project
- **Resume page** — print-optimized A4 layout with sidebar
- **Mobile responsive** — hamburger menu, single-column layout on small screens
- **Scroll animations** — subtle fade-in on sections via Intersection Observer
- **Scroll progress indicator** — gradient bar at top showing scroll position
- **Floating back-to-top** — circular button appears after scrolling down
- **SEO optimized** — favicon, Twitter cards, Open Graph, canonical URL, robots.txt, sitemap.xml
- **Lazy loading** — images load on demand for better performance
- **Accessible** — ARIA attributes, focus management, keyboard navigation

## How to Open

Open `index.html` directly in a browser:

```bash
open index.html
```

From the repository root:

```bash
open portfolio-site/index.html
```

## Notes

- Project links point to GitHub repositories.
- Visual assets are in the `assets/` folder.
- LinkedIn is linked externally at:
  `https://www.linkedin.com/in/galan-jabal-nur-8a1ba5234/`
- Domain used in meta tags: `https://galanjabal.dev/` (update if different)

## Deployment

This site is static and can be deployed to Vercel, Netlify, GitHub Pages, or any
static hosting provider.
