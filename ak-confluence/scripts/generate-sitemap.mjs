// Generates public/sitemap.xml from static routes and published Sanity content.
// Dynamic URLs reflect the dataset as of the last production build.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createClient } from '@sanity/client';

const SITE = 'https://www.akconfluence.com';
const today = new Date().toISOString().slice(0, 10);

const sanity = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || '3gzdej0i',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: process.env.VITE_SANITY_API_VERSION || '2024-01-01',
  perspective: 'published',
  useCdn: false,
});

let content = {posts: [], pages: [], services: [], workshops: [], counselors: []};
try {
  content = await sanity.fetch(`{
    "posts": *[_type == "post" && defined(slug.current)]{"slug": slug.current, "lastmod": date},
    "pages": *[_type == "page" && defined(slug.current) && coalesce(websiteVisible, true) && slug.current not in ["events", "what-therapy-might-i-need"]]{"slug": slug.current, "lastmod": _updatedAt},
    "services": *[_type == "service" && defined(slug.current) && coalesce(websiteVisible, true)]{"slug": slug.current, "lastmod": _updatedAt},
    "workshops": *[_type == "workshop" && defined(slug.current) && coalesce(websiteVisible, true)]{"slug": slug.current, "lastmod": _updatedAt},
    "counselors": *[_type == "counselor" && defined(slug.current) && coalesce(websiteVisible, true)]{"slug": slug.current, "lastmod": _updatedAt}
  }`);
} catch (err) {
  console.warn('sitemap: could not fetch Sanity content, continuing with static routes only.', err.message);
}

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/newsletter', priority: '0.8', changefreq: 'weekly' },
  { path: '/events', priority: '0.8', changefreq: 'monthly' },
  { path: '/boundaries-blueprint', priority: '0.7', changefreq: 'monthly' },
  { path: '/what-therapy-might-i-need', priority: '0.8', changefreq: 'monthly' },
];

const contentRoutes = [
  ...(content.posts || []).map((item) => ({...item, path: `/newsletter/${item.slug}`, priority: '0.6', changefreq: 'yearly'})),
  ...(content.pages || []).map((item) => ({...item, path: `/${item.slug}`, priority: '0.7', changefreq: 'monthly'})),
  ...(content.services || []).map((item) => ({...item, path: `/services/${item.slug}`, priority: '0.7', changefreq: 'monthly'})),
  ...(content.workshops || []).map((item) => ({...item, path: `/workshops/${item.slug}`, priority: '0.6', changefreq: 'weekly'})),
  ...(content.counselors || []).map((item) => ({...item, path: `/counselors/${item.slug}`, priority: '0.6', changefreq: 'monthly'})),
];

const urls = [
  ...staticRoutes.map((r) => ({ loc: SITE + r.path, lastmod: today, priority: r.priority, changefreq: r.changefreq })),
  ...contentRoutes.map((item) => ({
    loc: `${SITE}${item.path}`,
    lastmod: item.lastmod?.slice(0, 10) || today,
    priority: item.priority,
    changefreq: item.changefreq,
  })),
];

const xmlEscape = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${xmlEscape(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, '../public/sitemap.xml');
writeFileSync(out, xml);
console.log(`sitemap.xml written with ${urls.length} URLs → ${out}`);
