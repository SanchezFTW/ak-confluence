# Master Prompt: Non-Profit Website from Template

Copy everything below the line and paste it into a new Claude Code conversation. Replace all `[PLACEHOLDER]` values with your organization's info before running.

---

## The Prompt

```
I need you to build a complete, modern non-profit website and set it up with GitHub and Cloudflare Pages for automatic deployment. Use the architecture and tech stack described below as a template.

## Organization Info (replace these)

- **Name**: [ORG_NAME]
- **Tagline**: [SHORT_TAGLINE]
- **Mission**: [1-2 SENTENCE MISSION STATEMENT]
- **Location**: [CITY, STATE]
- **Phone**: [PHONE_NUMBER]
- **Email**: [EMAIL_ADDRESS]
- **Address**: [FULL_ADDRESS]
- **Hours**: [e.g., "Mon–Fri 9am–5pm"]

## Services (replace these)

List 4-6 services your org provides. Example format:
1. [Service Name] — [Short description]
2. [Service Name] — [Short description]
3. [Service Name] — [Short description]
4. [Service Name] — [Short description]

## Team Members (replace these)

List your team with this format (as many as you need):
1. **[Name]** — [Title] | Specialties: [list] | Status: Open/Waitlist | Bio: [2-3 sentences] | Photo: [filename or placeholder]

## Events (replace these, or remove if not needed)

1. **[Event Name]** — [Type: Workshop/Webinar/Support Group] | [Date] | [Time] | [Location] | [Description] | Spots: [number]

## FAQ (replace these)

List 8-10 common questions and answers for your organization.

## Brand Colors (replace these or use defaults)

- Primary: [hex, e.g., #82a396]
- Accent 1: [hex]
- Accent 2: [hex]
- Background: [hex, e.g., #f5f2ed]
- Text: [hex, e.g., #383838]

## Fonts (replace or use defaults)

- Heading: [e.g., Instrument Serif]
- Body: [e.g., Outfit]
- Mono: [e.g., IBM Plex Mono]

---

## TECH STACK — Build with exactly these:

- **React 19** + **Vite 8** (with `@vitejs/plugin-react`)
- **Tailwind CSS 4** (using `@tailwindcss/vite` plugin — NOT the PostCSS method)
- **React Router 7** (`react-router-dom`) for client-side routing
- **GSAP 3** + `@gsap/react` for animations (ScrollTrigger for scroll-based reveals)
- **Phosphor Icons** (`@phosphor-icons/react`)
- **No TypeScript** — plain JSX only
- **No backend / no CMS** — all content hardcoded as JS arrays/objects (easy to swap for a CMS later)

## PROJECT STRUCTURE — Follow this layout:

```
[project-name]/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── public/
│   ├── favicon.svg
│   └── _redirects          ← contains: /*    /index.html   200
├── src/
│   ├── main.jsx            ← mounts <BrowserRouter><App /></BrowserRouter>
│   ├── App.jsx             ← layout shell (nav, footer, routes, loader)
│   ├── index.css           ← Tailwind import, CSS variables, global styles
│   ├── pages/
│   │   ├── Home.jsx        ← multi-section homepage
│   │   ├── EventsPage.jsx  ← events listing with filters
│   │   └── FormsPage.jsx   ← embedded forms (JotForm or similar)
│   ├── components/
│   │   ├── TeamGrid.jsx    ← team/staff directory with filters
│   │   └── brand/
│   │       └── AnimatedLogo.jsx  ← SVG logo with GSAP animations
│   └── assets/
```

## VITE CONFIG — Use this exact setup:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

## KEY FEATURES TO BUILD:

### 1. Animated Loader
- Full-screen intro on first load with logo animation
- GSAP timeline: fade in logo → hold → slide up to reveal site
- Runs once per visit

### 2. Fixed Navigation (Pill Style)
- Sticky header with rounded pill shape, blur backdrop
- Logo on left, nav links on right
- Links: Home sections via hash anchors (/#services, /#team, /#contact) + /events + /forms
- Mobile: hamburger icon → full-screen overlay nav
- Nav auto-detects dark sections and switches to light text (use `data-nav-dark` attribute on dark sections)

### 3. Home Page Sections
- **Hero**: Large headline with animated rotating words (GSAP, 4s interval), subtitle, CTA buttons, background image with parallax/reveal effect
- **Services**: Bento grid layout (mixed card sizes — wide, tall, regular), hover scale effects
- **Team Grid**: Photo cards in 2-col mobile / 3-col desktop grid, filterable by specialty/category, click to expand inline detail panel with bio, status badges (Open/Waitlist or similar)
- **Events Preview**: Show top 3 upcoming events, link to full events page
- **FAQ**: Two-column accordion with smooth height transitions
- **Contact**: Address, phone, email, hours in the footer

### 4. Events Page (/events)
- Full event listing with filter pills (All, Workshop, Webinar, etc.)
- Event cards: date, time, location, description, spots remaining
- Featured event badge styling
- RSVP via mailto or external link

### 5. Forms Page (/forms)
- Card-based form selector (e.g., Volunteer Application, Donation Form, Contact)
- JotForm embed integration (use placeholder IDs — owner fills in real ones later)
- Trust signals: Encrypted, Secure, Private badges
- Step indicator for multi-form flows

### 6. Footer
- Multi-column: contact info, quick links, hours, location
- Consistent with nav styling

## STYLING RULES:

- **Tailwind only** — no separate CSS files per component (except inline `<style>` tags for complex GSAP animations)
- Define all brand colors and fonts as CSS custom properties in `index.css`
- Use `@import "tailwindcss"` at top of index.css (Tailwind v4 syntax)
- Use `@theme` block in index.css to register custom properties with Tailwind
- Fluid typography with `clamp()` for headings
- Mobile-first responsive design (`md:` breakpoint for desktop)
- Subtle noise overlay texture using SVG fractal noise (CSS background)
- Custom easing curves as CSS variables for animations
- `.btn-primary` utility class for CTA buttons with hover animation
- Smooth scroll behavior globally

## ANIMATION PATTERNS:

- Use `useGSAP` hook from `@gsap/react` for all GSAP animations
- ScrollTrigger for viewport-based reveals (fade up + stagger)
- Staggered entrance animations: `stagger: 0.1` on grouped elements
- Hero word rotation: swap words on interval with GSAP opacity/y transitions
- Background image reveal: clip-path or scale animation on scroll
- Accordion: animate `maxHeight` for smooth expand/collapse

## ACCESSIBILITY:

- Skip-to-content link
- Semantic HTML (nav, main, section, footer, article)
- ARIA labels on all interactive elements
- Alt text on all images
- Keyboard navigable

## DATA FORMAT:

All content should be stored as plain JS arrays/objects at the top of each component or page file. Example:

```js
const SERVICES = [
  { title: "...", description: "...", theme: "light" | "dark", size: "wide" | "tall" | "regular" },
]

const TEAM = [
  { name: "...", title: "...", specialties: [...], status: "Open", bio: "...", photo: "/team/name.jpg", quote: "..." },
]

const EVENTS = [
  { title: "...", type: "Workshop", date: "...", time: "...", location: "...", description: "...", spots: 20, featured: false },
]

const FAQS = [
  { question: "...", answer: "..." },
]
```

---

## GITHUB + CLOUDFLARE DEPLOYMENT SETUP

After the site is built and working locally, walk me through these steps one at a time:

### Step 1: Initialize Git
- `git init` in the project directory
- Create a `.gitignore` with: .DS_Store, .env, .env.*, node_modules, dist
- Initial commit

### Step 2: Create GitHub Repository
- Use `gh repo create [project-name] --public --source=. --remote=origin` (or --private)
- Push to main: `git push -u origin main`
- If SSH auth is needed, walk me through setting up an SSH key with GitHub

### Step 3: Connect Cloudflare Pages
Walk me through these steps in the Cloudflare dashboard:
1. Log into Cloudflare Dashboard → Workers & Pages → Create Application → Pages
2. Connect to Git → Select the GitHub repo
3. Build settings:
   - **Framework preset**: None
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `[project-name]` (if the app is in a subdirectory of the repo)
4. Deploy

### Step 4: Custom Domain (optional)
If I have a custom domain, walk me through:
1. Adding the domain in Cloudflare Pages settings
2. Updating DNS (CNAME record)
3. SSL/TLS setup (should be automatic with Cloudflare)

### Step 5: Verify Auto-Deploy
- Explain that pushing to `main` will now auto-deploy
- Walk me through making a small test change, committing, pushing, and watching the deploy

---

## IMPORTANT NOTES:
- Build the ENTIRE site before moving to deployment steps
- Make sure `npm run build` succeeds with zero errors before deploying
- The `public/_redirects` file is critical for Cloudflare Pages SPA routing
- Keep all content as hardcoded data so it's easy to update later
- Use placeholder images (solid color divs or gradient backgrounds) where photos aren't available yet
- Ask me questions if any org info is missing before you start building
```
