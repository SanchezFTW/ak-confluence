// Migrates the homepage hero fields that currently live in the legacy
// `siteSettings` singleton into the new `homePage` document.
//
// - Reads use the public dataset (no token required).
// - Writes require a token: set SANITY_WRITE_TOKEN (see .env.example).
//
// Run:
//   node scripts/migrate-homepage.mjs            # dry run (default)
//   node scripts/migrate-homepage.mjs --apply    # create/update the Homepage draft
import {createClient} from '@sanity/client'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '3gzdej0i'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const apiVersion = '2024-01-01'
const applyChanges = process.argv.includes('--apply')

const readClient = createClient({projectId, dataset, apiVersion, perspective: 'published', useCdn: false})

const [siteSettings, homePage] = await Promise.all([
  readClient.fetch('*[_type == "siteSettings"][0]'),
  readClient.fetch('*[_type == "homePage"][0]'),
])

// Legacy siteSettings field → new homePage field. Only empty homePage fields are
// filled; existing values always win.
const legacyCopy = siteSettings?.homePageCopy || {}
const sources = {
  heroIntro: siteSettings?.heroSubtitle,
  heroAccentWords: siteSettings?.heroWords,
  heroImage: siteSettings?.heroImage,
  heroEyebrow: legacyCopy.heroEyebrow,
  heroHeadingLead: legacyCopy.heroHeadingLead,
  heroHeadingSecondPrefix: legacyCopy.heroHeadingSecondPrefix,
  heroButtonLabel: legacyCopy.heroCtaLabel,
}

const patches = {}
for (const [field, value] of Object.entries(sources)) {
  if (value == null) continue
  const existing = homePage?.[field]
  const isEmpty = existing == null || (Array.isArray(existing) && existing.length === 0)
  if (isEmpty) {
    patches[field] = value
  } else {
    console.log(`- Skipping homePage.${field}: already has a value (existing values win).`)
  }
}

console.log('=== Migration: siteSettings hero fields → homePage ===')
console.log(`Legacy siteSettings: ${siteSettings ? `found (${siteSettings._id})` : 'none'}`)
console.log(`homePage document: ${homePage ? `found (${homePage._id})` : 'none (will be created as a draft)'}`)
console.log(`Fields to migrate: ${Object.keys(patches).length}`)
for (const [field, value] of Object.entries(patches)) {
  const preview = Array.isArray(value) ? value.join(', ') : String(value).slice(0, 80)
  console.log(`- homePage.${field} ← ${preview}`)
}

if (!applyChanges) {
  console.log('\nDry run only. Re-run with --apply (and SANITY_WRITE_TOKEN set) to create/update the Homepage draft.')
} else if (!process.env.SANITY_WRITE_TOKEN) {
  console.error('\nSANITY_WRITE_TOKEN is not set. No changes were made.')
  process.exitCode = 1
} else {
  const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    perspective: 'raw',
    useCdn: false,
    token: process.env.SANITY_WRITE_TOKEN,
  })
  const draft = await writeClient.fetch('*[_type == "homePage"][0]', {}, {perspective: 'raw'})
  const transaction = writeClient.transaction()
  if (draft) {
    transaction.patch(draft._id, (patch) => patch.setIfMissing(patches))
  } else {
    transaction.createIfNotExists({_id: 'homePage', _type: 'homePage', ...patches})
  }
  await transaction.commit()
  console.log(`\nApplied: homePage ${draft ? 'updated' : 'created'} with ${Object.keys(patches).length} fields (as a draft).`)
}
