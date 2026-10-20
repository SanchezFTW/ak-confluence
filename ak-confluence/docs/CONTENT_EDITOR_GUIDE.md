# Website Content Editing

The Sanity Studio is the source for published website content. Save and publish a document to make its published fields available to the public site. The site uses Sanity's published perspective; drafts do not appear on ordinary public pages.

## Website

- **Homepage** is a singleton. Add sections and drag them into display order. If no homepage sections are published, the current homepage remains in place. Use the section's visibility toggle to hide it without removing it.
- **Pages** creates additional slugged pages. Choose sections from the approved list; do not use reserved routes such as `contact`, `newsletter`, and `boundaries-blueprint`. The existing `/events` and `/what-therapy-might-i-need` pages can be replaced by pages with those slugs.
- **Site Defaults & SEO** contains navigation, footer links, public contact details, office hours, newsletter copy, announcement scheduling, and default search/social metadata. Choose an internal document reference when linking to site content. Hidden documents are not emitted as internal links.

## Practice

- **Counselors:** availability and website visibility are separate. `Feature on homepage` controls the roster; a profile slug enables a dedicated profile URL. Existing profiles remain visible while the new visibility field is blank.
- **Services:** existing homepage-card fields remain available. Generate a slug to enable a detail page. Counselor-to-service references are maintained on the counselor; service pages derive their counselor list.
- **Workshops:** add individual start/end datetimes and an IANA timezone such as `America/Anchorage`. Registration is shown only while status is open, a future session exists, a URL is present, and the deadline has not passed. Full, closed, and canceled are manual states; capacity is not tracked.
- **FAQs** can be selected on pages and services. **Provider Endorsements** are separate from patient reviews; only approved provider material should be entered.

## Publishing

- **Articles & Newsletter** keeps the existing `/newsletter/:slug` route and article body. Publishing an article does not send an email newsletter. MailerLite remains connected only to its existing signup forms.
- There is no resource collection because the current site has no existing resource library location.

## Preview and deployment

The normal website reads published content only. Sanity Presentation, draft mode, live preview, and click-to-edit are not enabled yet. For secure draft preview, the Cloudflare Pages Functions deployment needs a server-side `SANITY_API_READ_TOKEN` with read access to draft content, plus the Presentation/Visual Editing integration and allowed-origin configuration. Never use a `VITE_`-prefixed variable for this token or put it in browser code. Preview must be tested before being described as working.

Schema and Studio navigation changes require a Studio build/deploy. Website code changes require the normal site deployment. No production content was migrated or seeded as part of these code changes.