# AK Confluence — Site Reference Guide

A plain-language map of the codebase. Use this to find the right place to make any change, then point Claude to it.

---

## What Each File Is

### `ak-confluence/src/App.jsx`
The **shell** of the entire site. Think of it as the frame around every page.
- **Navigation bar** — the pill-shaped bar at the top with links
- **Footer** — everything at the bottom (contact info, hours, tagline, CTA buttons)
- **Page loader** — the animation that plays when the site first opens
- **Mobile menu** — the full-screen menu that opens on phones

### `ak-confluence/src/pages/Home.jsx`
The **homepage**. Divided into named sections:
- **Hero** — the big headline at the top ("Finding your way back to...")
- **Services** — the grid of service cards (Individual Therapy, Couples Counseling, etc.)
- **Events Preview** — the 3 upcoming events shown on the homepage
- **FAQ** — the accordion of questions and answers at the bottom

### `ak-confluence/src/pages/EventsPage.jsx`
The **Events page** (`/events`). Contains:
- The `EVENTS_DATA` array at the top — add/edit/remove events here
- Event cards with filter pills

### `ak-confluence/src/pages/FormsPage.jsx`
The **Forms page** (`/forms`). Contains:
- The `FORMS` array — the three form cards (New Client Intake, Informed Consent, Screening)
- New Client Intake links to: `https://elly.clientsecure.me/contact-widget`
- The other two use JotForm embed (IDs go in `jotformId`)

### `ak-confluence/src/components/CounselorGrid.jsx`
The **Counselors section** on the homepage. Contains:
- `counselors` array at the top — add/remove/edit counselors here
- `FILTER_SPECIALTIES` — the 5 filter pill options (Anxiety, Couples, Grief and Loss, Depression, Somatic)

### `ak-confluence/src/index.css`
**Global styles** — colors, fonts, button styles. Rarely needs editing.

---

## Quick Change Reference

| I want to change... | Go to this file | Look for... |
|---------------------|-----------------|-------------|
| Nav links | `App.jsx` | `desktopNavLinks` and `navLinks` arrays (~line 75 & 304) |
| Footer contact info | `App.jsx` | Footer function, "Contact" section |
| Footer hours | `App.jsx` | Footer function, "Hours" section |
| Footer tagline | `App.jsx` | `"Together. Making a plan..."` |
| CTA button text ("Book a consultation") | `App.jsx` | Pre-Footer CTA section |
| Hero headline / rotating words | `Home.jsx` | `WORDS` array (line 11) and Hero function |
| Services cards | `Home.jsx` | `SERVICES` array |
| FAQ questions & answers | `Home.jsx` | `FAQS` array |
| Events on homepage | `Home.jsx` | Events Preview section |
| Full events list | `EventsPage.jsx` | `EVENTS_DATA` array |
| Counselor info | `CounselorGrid.jsx` | `counselors` array |
| Counselor filter options | `CounselorGrid.jsx` | `FILTER_SPECIALTIES` array |
| Add a new counselor | `CounselorGrid.jsx` | Add an object to `counselors` array |
| Remove a counselor | `CounselorGrid.jsx` | Delete their object from `counselors` array |
| Counselor waitlist status | `CounselorGrid.jsx` | `status: "open"` or `status: "waitlist"` on their entry |
| Forms page cards | `FormsPage.jsx` | `FORMS` array |
| New Client Intake link | `FormsPage.jsx` | `externalUrl` on the intake form entry |
| Email address | Any file | `info@akconfluence.com` |
| Phone number | `App.jsx` | Footer Contact section |
| Brand colors | `index.css` | CSS custom properties at the top |

---

## Terms to Know

**Component** — A reusable chunk of UI (e.g. `CounselorGrid` is a component used inside `Home.jsx`).

**Array** — A list of items in code, written like `[ item1, item2, item3 ]`. Most site content (counselors, events, FAQs) lives in arrays — you add or remove items to add or remove content.

**Object** — One item in an array, written like `{ name: "Elly", status: "waitlist" }`. Each counselor, event, and FAQ is an object.

**Props** — Values you pass into a component to configure it (like settings).

**Section** — A semantic HTML block on the page. Each named section in `Home.jsx` (Hero, Services, FAQ) is wrapped in a `<section>` tag.

**Route** — A URL path. This site has three: `/` (home), `/events`, `/forms`.

**`data-nav-dark`** — A custom attribute on dark sections. When the nav scrolls over it, the nav text switches to light so it stays readable.

---

## Deployment

- **Auto-deploys** via Cloudflare Pages — just push to `main` on GitHub and the live site updates automatically.
- Local dev server: run `npm run dev` from inside `ak-confluence/`
- Build check: run `npm run build` before pushing if you want to catch errors first
