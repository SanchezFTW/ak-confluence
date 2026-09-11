// Generates public/sitemap.xml from the static route list + every newsletter post.
// Runs as part of `npm run build`. Post URLs are pulled live from Sanity so the
// sitemap matches published content at build time.
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
  useCdn: false,
});

let posts = [];
try {
  posts = await sanity.fetch(
    `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, date }`
  );
} catch (err) {
  console.warn('sitemap: could not fetch posts from Sanity, continuing with static routes only.', err.message);
}

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/newsletter', priority: '0.8', changefreq: 'weekly' },
  { path: '/what-therapy-might-i-need', priority: '0.8', changefreq: 'monthly' },
];

const urls = [
  ...staticRoutes.map((r) => ({ loc: SITE + r.path, lastmod: today, priority: r.priority, changefreq: r.changefreq })),
  ...posts.map((p) => ({
    loc: `${SITE}/newsletter/${p.slug}`,
    lastmod: p.date || today,
    priority: '0.6',
    changefreq: 'yearly',
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
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
