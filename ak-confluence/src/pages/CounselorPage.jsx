import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {getCounselorBySlug, urlFor} from '../lib/sanity'
import {usePageMetadata} from '../lib/usePageMetadata'

export default function CounselorPage() {
  const {slug} = useParams()
  const [counselor, setCounselor] = useState(null)
  const [loadedSlug, setLoadedSlug] = useState(null)

  useEffect(() => {
    let active = true
    setLoadedSlug(null)
    getCounselorBySlug(slug)
      .then((data) => { if (active) setCounselor(data || null) })
      .catch((error) => { console.error('Failed to load counselor profile', error); if (active) setCounselor(null) })
      .finally(() => { if (active) setLoadedSlug(slug) })
    return () => { active = false }
  }, [slug])

  usePageMetadata(counselor?.seo, counselor?.name, counselor?.shortIntro || counselor?.bio)

  if (loadedSlug !== slug) return <section className="min-h-[60vh] flex items-center justify-center"><p className="text-sm text-[#82a396]">Loading…</p></section>
  if (!counselor) return <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center"><h1 className="font-[var(--font-display)] text-4xl text-[#383838]">Counselor profile not found</h1><Link to="/#counselors" className="btn-primary mt-6">Meet our counselors</Link></section>

  const photo = urlFor(counselor.photo)?.width(1000).height(1200).fit('crop').auto('format').url()
  const availability = {open: 'Accepting clients', full: 'Currently full', waitlist: 'Waitlist', unavailable: 'Not currently accepting clients'}[counselor.status]
  const canContact = counselor.status !== 'unavailable'
  const contactHref = counselor.consultationUrl || `mailto:${counselor.publicEmail || 'info@akconfluence.com'}?subject=${encodeURIComponent(`Inquiry for ${counselor.name}`)}`

  return (
    <article className="min-h-screen bg-[#f5f2ed]">
      <header className="px-6 lg:px-20 pt-36 pb-14 lg:pt-44 lg:pb-20 bg-[#e8e4dc]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(16rem,0.7fr)] gap-10 items-center">
          <div>
            <Link to="/#counselors" className="text-xs uppercase tracking-[0.2em] text-[#82a396] mb-6 inline-block">Our counselors</Link>
            <h1 className="font-[var(--font-display)] text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] text-[#383838]">{counselor.name}</h1>
            <p className="mt-4 text-[#a38d7a]">{[counselor.role, counselor.title, counselor.pronouns].filter(Boolean).join(' · ')}</p>
            {availability && <p className="mt-4 text-sm text-[#6b8f80]">{availability}</p>}
          </div>
          {photo && <img src={photo} alt={counselor.photo?.decorative ? '' : counselor.photo?.alt || `${counselor.name}${counselor.title ? `, ${counselor.title}` : ''}`} className="w-full max-h-[32rem] aspect-[4/5] object-cover rounded-xl" />}
        </div>
      </header>
      <div className="max-w-5xl mx-auto px-6 lg:px-20 py-12 lg:py-16 space-y-10">
        {counselor.quote && <blockquote className="max-w-3xl font-[var(--font-display)] italic text-2xl text-[#82a396]">“{counselor.quote}”</blockquote>}
        {(counselor.shortIntro || counselor.bio) && <section className="max-w-3xl"><h2 className="font-[var(--font-heading)] text-2xl text-[#383838] mb-3">About</h2>{counselor.shortIntro && <p className="text-[#a38d7a] leading-relaxed">{counselor.shortIntro}</p>}{counselor.bio && <p className="mt-4 whitespace-pre-line text-[#a38d7a] leading-relaxed">{counselor.bio}</p>}</section>}
        {counselor.specialties?.length > 0 && <section><h2 className="font-[var(--font-heading)] text-2xl text-[#383838] mb-4">Focus areas</h2><ul className="flex flex-wrap gap-2">{counselor.specialties.map((item) => <li key={item} className="px-3 py-1.5 rounded-full bg-white text-sm text-[#6b8f80]">{item}</li>)}</ul></section>}
        {counselor.populations?.length > 0 && <section><h2 className="font-[var(--font-heading)] text-2xl text-[#383838] mb-4">Populations served</h2><ul className="flex flex-wrap gap-2">{counselor.populations.map((item) => <li key={item} className="px-3 py-1.5 rounded-full bg-white text-sm text-[#6b8f80]">{item}</li>)}</ul></section>}
        {counselor.therapyApproaches?.length > 0 && <section><h2 className="font-[var(--font-heading)] text-2xl text-[#383838] mb-4">Therapy approaches</h2><ul className="flex flex-wrap gap-2">{counselor.therapyApproaches.map((item) => <li key={item} className="px-3 py-1.5 rounded-full bg-white text-sm text-[#6b8f80]">{item}</li>)}</ul></section>}
        {(counselor.inPersonAvailable || counselor.telehealthAvailable) && <section><h2 className="font-[var(--font-heading)] text-2xl text-[#383838] mb-3">Session options</h2><p className="text-[#a38d7a]">{[counselor.inPersonAvailable && 'In person', counselor.telehealthAvailable && 'Telehealth'].filter(Boolean).join(' · ')}</p></section>}
        {counselor.services?.length > 0 && <section><h2 className="font-[var(--font-heading)] text-2xl text-[#383838] mb-4">Services</h2><ul className="flex flex-wrap gap-x-5 gap-y-2">{counselor.services.map((service) => <li key={service.id}>{service.slug ? <Link to={`/services/${service.slug}`} className="text-[#82a396] underline underline-offset-2">{service.title}</Link> : <span className="text-[#a38d7a]">{service.title}</span>}</li>)}</ul></section>}
        {canContact && (counselor.consultationUrl || counselor.publicEmail) && <section><a href={contactHref} target={counselor.consultationUrl ? '_blank' : undefined} rel={counselor.consultationUrl ? 'noopener noreferrer' : undefined} className="btn-primary inline-flex">{counselor.status === 'waitlist' || counselor.status === 'full' ? 'Ask about the waitlist' : 'Request a consultation'}</a>{counselor.publicPhone && <a href={`tel:${counselor.publicPhone.replace(/[^+\d]/g, '')}`} className="ml-5 text-sm text-[#82a396]">{counselor.publicPhone}</a>}</section>}
      </div>
    </article>
  )
}