import {createClient} from '@sanity/client'
import {createImageUrlBuilder} from '@sanity/image-url'

// projectId + dataset are public (visible in every request), so hardcode them as
// fallbacks. This keeps the live site working without Cloudflare env-var config;
// a local .env can still override for a different project/dataset.
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '3gzdej0i',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  perspective: 'published',
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
  "author": coalesce(authorReference->name, author),
  excerpt,
  tags,
  categories,
  coverImage,
  featured,
  "relatedServices": relatedServices[]->{"slug": slug.current, title},
  "relatedArticles": relatedArticles[]->{"slug": slug.current, title, excerpt, coverImage},
  seo
`

const COUNSELOR_FIELDS = `
  "id": _id,
  name,
  "slug": slug.current,
  title,
  role,
  pronouns,
  status,
  quote,
  shortIntro,
  specialties,
  populations,
  therapyApproaches,
  bio,
  photo,
  inPersonAvailable,
  telehealthAvailable,
  consultationUrl,
  publicEmail,
  publicPhone,
  featureOnHomepage,
  order,
  seo,
  "services": services[coalesce(@->websiteVisible, true)]->{"id": _id, title, "slug": slug.current}
`

const SERVICE_FIELDS = `
  "id": _id,
  title,
  "slug": slug.current,
  desc,
  layout,
  image,
  body,
  intendedAudience,
  concerns,
  whatToExpect,
  sessionDuration,
  sessionDurationUnit,
  feesAndPayment,
  inPersonAvailable,
  telehealthAvailable,
  ctaLabel,
  ctaUrl,
  order,
  "counselors": *[_type == "counselor" && references(^._id) && coalesce(websiteVisible, true)] | order(order asc){name, title, role, status, photo},
  "faqs": relatedFaqs[coalesce(@->websiteVisible, true)]->{question, answer, category, order, websiteVisible}
`

const SITE_LINK_FIELDS = `label, url, email, phone, openInNewTab, "document": document->{_type, "slug": slug.current, websiteVisible}`

const SECTION_FIELDS = `
  _key,
  _type,
  enabled,
  eyebrow,
  heading,
  supportingCopy,
  body,
  image,
  imagePosition,
  variant,
  button{${SITE_LINK_FIELDS}},
  "services": services[coalesce(@->websiteVisible, true)]->{${SERVICE_FIELDS}},
  "counselors": counselors[coalesce(@->websiteVisible, true)]->{${COUNSELOR_FIELDS}},
  "workshops": workshops[coalesce(@->websiteVisible, true)]->{"id": _id, title, "slug": slug.current, summary, sessions[]{start, end}, timezone, status, registrationDeadline, registrationUrl, announcement},
  "faqs": faqs[coalesce(@->websiteVisible, true)]->{question, answer, category, order, websiteVisible},
  "endorsements": endorsements[coalesce(@->websiteVisible, true)]->{quote, providerName, credentials, organization, photo, website, featured, order}
`

function pageFields() {
  return `sections[]{${SECTION_FIELDS}}, seo`
}

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
    `*[_type == "counselor" && coalesce(websiteVisible, true) && coalesce(featureOnHomepage, true)] | order(order asc){${COUNSELOR_FIELDS}}`
  )
}

export function getCounselorBySlug(slug) {
  return client.fetch(
    `*[_type == "counselor" && slug.current == $slug && coalesce(websiteVisible, true)][0]{${COUNSELOR_FIELDS}}`,
    {slug}
  )
}

export function getServices() {
  return client.fetch(
    `{"items": *[_type == "service" && coalesce(websiteVisible, true)] | order(order asc){${SERVICE_FIELDS}}, "configured": count(*[_type == "service"]) > 0}`
  )
}

export function getServiceBySlug(slug) {
  return client.fetch(
    `*[_type == "service" && slug.current == $slug && coalesce(websiteVisible, true)][0]{${SERVICE_FIELDS}, seo}`,
    {slug}
  )
}

export function getFaqs() {
  return client.fetch(
    `{"items": *[_type == "faq" && coalesce(websiteVisible, true)] | order(order asc){question, answer, category, order, websiteVisible, "relatedServices": relatedServices[coalesce(@->websiteVisible, true)]->{title, "slug": slug.current}}, "configured": count(*[_type == "faq"]) > 0}`
  )
}

export function getProviderEndorsements() {
  return client.fetch(
    `{"items": *[_type == "providerEndorsement" && coalesce(websiteVisible, true)] | order(order asc){quote, providerName, credentials, organization, photo, website, featured, order}, "configured": count(*[_type == "providerEndorsement"]) > 0}`
  )
}

export function getWorkshops() {
  return client.fetch(
    `*[_type == "workshop" && coalesce(websiteVisible, true)] | order(sessions[0].start asc){"id": _id, title, "slug": slug.current, summary, description, intendedAudience, sessions[]{start, end}, timezone, format, venue, onlineDetails, price, paymentInstructions, registrationUrl, registrationDeadline, status, announcement, "facilitators": facilitators[coalesce(@->websiteVisible, true)]->{name, title, role, photo}, seo}`
  )
}

export function getWorkshopBySlug(slug) {
  return client.fetch(
    `*[_type == "workshop" && slug.current == $slug && coalesce(websiteVisible, true)][0]{"id": _id, title, "slug": slug.current, summary, description, intendedAudience, sessions[]{start, end}, timezone, format, venue, onlineDetails, price, paymentInstructions, registrationUrl, registrationDeadline, status, announcement, "facilitators": facilitators[coalesce(@->websiteVisible, true)]->{name, title, role, photo}, seo}`,
    {slug}
  )
}

export function getPageBySlug(slug) {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug && coalesce(websiteVisible, true)][0]{title, "slug": slug.current, ${pageFields()}}`,
    {slug}
  )
}

export function getHomePage() {
  return client.fetch(`*[_type == "homePage"][0]{${pageFields()}}`)
}

export function getSiteSettings() {
  return client.fetch(
    `*[_type == "siteSettings"][0]{
      heroImage,
      heroSubtitle,
      heroWords,
      headerNavigation[]{${SITE_LINK_FIELDS}},
      primaryConsultationLink{${SITE_LINK_FIELDS}},
      footerLinkGroups[]{title, links[]{${SITE_LINK_FIELDS}}},
      publicPhone,
      publicEmail,
      officeAddress,
      officeHours,
      socialLinks[]{platform, url},
      contactIntroduction,
      newsletterHeading,
      newsletterCopy,
      newsletterConfirmation,
      footerTagline,
      announcement{enabled, message, startsAt, endsAt, link{${SITE_LINK_FIELDS}}},
      defaultSeo
    }`
  )
}

export function resolveSiteLink(link) {
  if (!link) return null
  if (link.url?.startsWith('https://') || link.url?.startsWith('http://')) return link.url
  if (link.email) return `mailto:${link.email}`
  if (link.phone) return `tel:${link.phone.replace(/[^+\d]/g, '')}`

  const document = link.document
  if (!document) return null
  if (document._type !== 'homePage' && document.websiteVisible === false) return null
  if (document._type === 'homePage') return '/'
  if (document._type === 'page') return document.isHomepage ? '/' : document.slug ? `/${document.slug}` : null
  if (document._type === 'service') return document.slug ? `/services/${document.slug}` : null
  if (document._type === 'workshop') return document.slug ? `/workshops/${document.slug}` : null
  if (document._type === 'counselor') return document.slug ? `/counselors/${document.slug}` : null
  if (document._type === 'post') return document.slug ? `/newsletter/${document.slug}` : null
  return null
}
