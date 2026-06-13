# AK Confluence — Claude Context

## Project Overview
A therapy practice website for AK Confluence based in Anchorage, Alaska. Built as a single-page React app deployed via Cloudflare Pages (auto-deploys on push to `main`).

## Tech Stack
- **React 19** + **Vite 8** (no TypeScript — plain JSX only)
- **Tailwind CSS 4** via `@tailwindcss/vite` plugin (no `tailwind.config.js` — config lives in CSS)
- **React Router 7** (`react-router-dom`) for client-side routing
- **GSAP 3** + `@gsap/react` for all animations
- **Phosphor Icons** (`@phosphor-icons/react`)
- No backend, no CMS — all content is hardcoded JS arrays/objects in each file

## Running Locally

```bash
npm install
npm run dev       # starts Vite dev server at http://localhost:5173
npm run build     # production build → dist/ (also copies index.html → 404.html for SPA routing)
npm run preview   # serve the production build locally
npm run lint      # ESLint
```

## How It Deploys

Cloudflare Pages auto-deploys on every push to `main`:
- **Build command**: `npm run build`
- **Output directory**: `dist`
- The build script runs `vite build && cp dist/index.html dist/404.html` — the `404.html` copy is what makes client-side routing work on Cloudflare Pages (all unknown paths serve `index.html`, React Router handles the rest)
- No environment variables required — this is a fully static site

## Folder Structure

```
ak-confluence/
├── public/              # static assets served as-is
├── src/
│   ├── App.jsx          # nav bar, footer, loader animation, route definitions
│   ├── main.jsx         # React root, BrowserRouter wrapper
│   ├── index.css        # global styles, CSS variables, font imports
│   ├── components/
│   │   ├── CounselorGrid.jsx         # counselor cards + specialty filter pills
│   │   └── brand/
│   │       └── AnimatedLogo.jsx      # SVG logo with GSAP animations (variants: horizontal, vertical, mark)
│   ├── pages/
│   │   ├── Home.jsx                  # hero, services, counselor section, FAQ, events preview
│   │   ├── FormsPage.jsx             # client intake/paperwork forms at /forms
│   │   ├── NewsletterPage.jsx        # newsletter archive index at /newsletter
│   │   ├── NewsletterPostPage.jsx    # individual post at /newsletter/:slug
│   │   └── NotFoundPage.jsx          # 404 fallback
│   └── data/
│       ├── posts.js     # all newsletter articles (35+ posts, hardcoded HTML body strings)
│       └── tags.js      # tag/filter data
├── package.json
└── vite.config.js
```

## Routes

| Path | Component |
|------|-----------|
| `/` | `Home` |
| `/forms` | `FormsPage` |
| `/newsletter` | `NewsletterPage` |
| `/newsletter/:slug` | `NewsletterPostPage` |
| `*` | `NotFoundPage` |

Anchor links (`/#services`, `/#counselors`, `/#contact`) are handled by `ScrollToHash` in `App.jsx` — it listens to `location.hash` and scrolls after a short render delay.

## Brand

- **Primary green**: `#82a396`
- **Dark text**: `#383838`
- **Background**: `#f5f2ed`
- **Warm accent**: `#dd9e6f` / `#a38d7a`
- **Fonts**: Instrument Serif (headings), Outfit (body), IBM Plex Mono (labels/tags)

CSS custom properties for fonts: `var(--font-heading)`, `var(--font-body)`, `var(--font-mono)`

## Contact Info (always use these)

- Email: `info@akconfluence.com`
- Phone: `907-313-4433` (render as `<a href="tel:9073134433">`)
- Location: Anchorage, Alaska
- Hours: Mon–Fri 7am–7pm, Sat 8am–3pm

## Counselors

Current roster (6 active, Elly is the only one on waitlist):
- Elly Sanchez — Founder, LPC — **Waitlist**
- Samuel Peterson — LPC — Open
- Jillian Thony — Marriage & Family Therapist — Open
- Jessica Pretz — LPC — Open
- Joe Mattison — LPC — Open
- Katie McNamara — Marriage & Family Therapist — Open

Counselor filter options (hardcoded, do not auto-generate):
`Anxiety, Couples, Grief and Loss, Depression, Somatic`

## Key Conventions

- All Tailwind utility classes — no per-component CSS files (inline `<style>` tags are okay for GSAP keyframes only)
- Fluid type with `clamp()` on all headings
- `data-nav-dark` attribute on dark sections triggers light nav text (checked via scroll position in `App.jsx`)
- Content lives as plain JS arrays/objects at the top of each file — edit there to update copy
- No comments unless the WHY is non-obvious
- Newsletter post bodies are raw HTML strings (use `dangerouslySetInnerHTML`) — they contain `<p>`, `<h3>`, `<ul>`, `<ol>`, `<strong>`, `<em>` tags
