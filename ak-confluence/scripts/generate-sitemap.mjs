// Generates public/sitemap.xml from the static route list + every newsletter post.
// Runs as part of `npm run build` so the sitemap always matches the published posts.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { posts } from '../src/data/posts.js';

const SITE = 'https://www.akconfluence.com';
const today = new Date().toISOString().slice(0, 10);

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/newsletter', priority: '0.8', changefreq: 'weekly' },
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
