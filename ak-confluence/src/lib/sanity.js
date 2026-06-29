import {createClient} from '@sanity/client'
import {createImageUrlBuilder} from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
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
