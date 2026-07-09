import {createClient} from '@sanity/client'
import {createImageUrlBuilder} from '@sanity/image-url'

// projectId + dataset are public (visible in every request), so hardcode them as
// fallbacks. This keeps the live site working without Cloudflare env-var config;
// a local .env can still override for a different project/dataset.
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '3gzdej0i',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
})

const builder = createImageUrlBuilder(client)

// urlFor(image).width(600).url() — safe to call on undefined (returns null)
export function urlFor(source) {
  return source ? builder.image(source) : null
}

// --- Queries -------------------------------------------------------------

const POST_FIELDS = `
  "slug": slug.current,
  title,
  date,
  author,
  excerpt,
  tags,
  coverImage
`

export function getPosts() {
  return client.fetch(
    `*[_type == "post" && defined(slug.current)] | order(date desc){${POST_FIELDS}}`
  )
}

export function getPostSlugs() {
  return client.fetch(`*[_type == "post" && defined(slug.current)].slug.current`)
}

export function getPostBySlug(slug) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{${POST_FIELDS}, body}`,
    {slug}
  )
}

export function getCounselors() {
  return client.fetch(
    `*[_type == "counselor"] | order(order asc){
      "id": _id,
      name,
      title,
      role,
      status,
      quote,
      specialties,
      bio,
      photo
    }`
  )
}

export function getServices() {
  return client.fetch(
    `*[_type == "service"] | order(order asc){
      "id": _id,
      title,
      desc,
      layout,
      image
    }`
  )
}

export function getSiteSettings() {
  return client.fetch(
    `*[_type == "siteSettings"][0]{
      heroImage,
      heroSubtitle,
      heroWords
    }`
  )
}
