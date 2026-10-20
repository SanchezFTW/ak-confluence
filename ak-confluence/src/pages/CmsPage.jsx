import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import PageSections from '../components/PageSections'
import {getPageBySlug} from '../lib/sanity'
import {usePageMetadata} from '../lib/usePageMetadata'

export default function CmsPage() {
  const {slug} = useParams()
  const [page, setPage] = useState(null)
  const [loadedSlug, setLoadedSlug] = useState(null)

  useEffect(() => {
    let active = true
    setLoadedSlug(null)
    getPageBySlug(slug)
      .then((data) => { if (active) setPage(data || null) })
      .catch((error) => { console.error('Failed to load page', error); if (active) setPage(null) })
      .finally(() => { if (active) setLoadedSlug(slug) })
    return () => { active = false }
  }, [slug])

  usePageMetadata(page?.seo, page?.title)

  if (loadedSlug !== slug) return <section className="min-h-[60vh] flex items-center justify-center"><p className="text-sm text-[#82a396]">Loading…</p></section>
  if (!page) return <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center"><h1 className="font-[var(--font-display)] text-4xl text-[#383838]">Page not found</h1><Link to="/" className="btn-primary mt-6">Return home</Link></section>
  return <main><PageSections sections={page.sections} /></main>
}