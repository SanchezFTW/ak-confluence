# AK Confluence — Claude Context

## Project Overview
A therapy practice website for AK Confluence based in Anchorage, Alaska. Built as a single-page React app deployed via Cloudflare Pages (auto-deploys on push to `main`).

## Tech Stack
- **React 19** + **Vite 8** (no TypeScript — plain JSX only)
- **Tailwind CSS 4** via `@tailwindcss/vite` plugin
- **React Router 7** for routing (`/`, `/events`, `/forms`)
- **GSAP 3** + `@gsap/react` for all animations
- **Phosphor Icons** (`@phosphor-icons/react`)
- No backend, no CMS — all content is hardcoded JS arrays in each file

## Project Root
All source code lives in `ak-confluence/src/`.

## File Map
| File | What it controls |
|------|-----------------|
| `src/App.jsx` | Navigation bar, footer, page routing, loader animation |
| `src/pages/Home.jsx` | Hero, Services, Events preview, FAQ sections |
| `src/pages/EventsPage.jsx` | Full events listing at `/events` |
| `src/pages/FormsPage.jsx` | Client forms page at `/forms` |
| `src/components/CounselorGrid.jsx` | Counselor cards + filter pills |
| `src/components/brand/AnimatedLogo.jsx` | SVG logo with GSAP animations |
| `src/index.css` | Global styles, color variables, fonts |

## Brand
- **Primary green**: `#82a396`
- **Dark text**: `#383838`
- **Background**: `#f5f2ed`
- **Warm accent**: `#dd9e6f` / `#a38d7a`
- **Fonts**: Instrument Serif (headings), Outfit (body), IBM Plex Mono (labels/tags)

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
- All Tailwind — no per-component CSS files (inline `<style>` tags okay for GSAP keyframes)
- Fluid type with `clamp()` on all headings
- `data-nav-dark` attribute on dark sections triggers light nav text
- Content is stored as plain JS arrays/objects at the top of each file — easy to update
- No free comments unless the WHY is non-obvious
