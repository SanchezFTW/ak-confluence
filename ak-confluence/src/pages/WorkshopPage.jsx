import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {PortableText} from '../lib/portableText'
import {getWorkshopBySlug} from '../lib/sanity'
import {usePageMetadata} from '../lib/usePageMetadata'
import {useClock} from '../lib/useClock'
import {getWorkshopState} from '../lib/workshopStatus.js'

function formatSession(dateTime, timezone) {
  if (!dateTime || !timezone) return null
  try {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZone: timezone,
      timeZoneName: 'short',
    }).format(new Date(dateTime))
  } catch {
    return null
  }
}

export default function WorkshopPage() {
  const {slug} = useParams()
  const [workshop, setWorkshop] = useState(null)
  const [loadedSlug, setLoadedSlug] = useState(null)
  const timeBoundaries = [workshop?.registrationDeadline, ...(workshop?.sessions || []).map((session) => session.end)]
  const now = useClock(timeBoundaries)

  useEffect(() => {
    let active = true
    setLoadedSlug(null)
    getWorkshopBySlug(slug)
      .then((data) => { if (active) setWorkshop(data || null) })
      .catch((error) => { console.error('Failed to load workshop', error); if (active) setWorkshop(null) })
      .finally(() => { if (active) setLoadedSlug(slug) })
    return () => { active = false }
  }, [slug])

  usePageMetadata(workshop?.seo, workshop?.title, workshop?.summary)

  if (loadedSlug !== slug) return <section className="min-h-[60vh] flex items-center justify-center"><p className="text-sm text-[#82a396]">Loading…</p></section>
  if (!workshop) return <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center"><h1 className="font-[var(--font-display)] text-4xl text-[#383838]">Workshop not found</h1><Link to="/events" className="btn-primary mt-6">View workshops</Link></section>

  const sessions = workshop.sessions || []
  const {futureSessions, canRegister, label: statusLabel} = getWorkshopState(workshop, now)

  return (
    <article className="min-h-screen bg-[#f5f2ed]">
      <header className="px-6 lg:px-20 pt-36 pb-14 lg:pt-44 lg:pb-20 bg-[#e8e4dc]">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-[#82a396] mb-5">Workshop · {statusLabel}</p>
          <h1 className="font-[var(--font-display)] text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] text-[#383838]">{workshop.title}</h1>
          {workshop.summary && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#a38d7a]">{workshop.summary}</p>}
          {canRegister && <a href={workshop.registrationUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 inline-flex">Register</a>}
          {workshop.status === 'canceled' && <p className="mt-6 text-sm text-[#a38d7a]">This workshop has been canceled.</p>}
          {workshop.status === 'full' && <p className="mt-6 text-sm text-[#a38d7a]">Registration is full.</p>}
          {workshop.announcement && <p className="mt-6 text-sm text-[#6b8f80]">{workshop.announcement}</p>}
        </div>
      </header>
      <div className="max-w-5xl mx-auto px-6 lg:px-20 py-12 lg:py-16 space-y-10">
        {workshop.description?.length > 0 && <section className="prose-newsletter max-w-3xl text-[#383838]"><PortableText value={workshop.description} /></section>}
        {workshop.intendedAudience && <section><h2 className="font-[var(--font-heading)] text-2xl text-[#383838] mb-3">Who it is for</h2><p className="text-[#a38d7a] leading-relaxed">{workshop.intendedAudience}</p></section>}
        {sessions.length > 0 && <section><h2 className="font-[var(--font-heading)] text-2xl text-[#383838] mb-4">Schedule</h2><ul className="space-y-3">{sessions.map((session, index) => {
          const past = new Date(session.end).getTime() <= now
          return <li key={`${session.start}-${index}`} className="bg-white border border-[#82a396]/15 rounded-xl p-4"><p className="text-sm text-[#383838]">{formatSession(session.start, workshop.timezone) || 'Time to be announced'}</p><p className="mt-1 text-xs text-[#a38d7a]">Ends {formatSession(session.end, workshop.timezone) || 'to be announced'}{past ? ' · Past session' : ''}</p></li>
        })}</ul></section>}
        {sessions.length === 0 && <p className="text-sm text-[#a38d7a]">{workshop.announcement || 'No future dates are currently listed.'}</p>}
        {(workshop.venue || workshop.onlineDetails || workshop.price != null || workshop.paymentInstructions) && <section className="border-y border-[#383838]/10 py-6"><h2 className="font-[var(--font-heading)] text-2xl text-[#383838] mb-4">Practical details</h2><div className="space-y-2 text-sm text-[#a38d7a]">{workshop.venue && <p>{workshop.venue}</p>}{workshop.onlineDetails && <p>{workshop.onlineDetails}</p>}{workshop.price != null && <p>Price: {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(workshop.price)}</p>}{workshop.paymentInstructions && <p className="whitespace-pre-line">{workshop.paymentInstructions}</p>}</div></section>}
        {workshop.facilitators?.length > 0 && <section><h2 className="font-[var(--font-heading)] text-2xl text-[#383838] mb-4">Facilitators</h2><ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#a38d7a]">{workshop.facilitators.map((person) => <li key={person.name}>{person.name}{person.title ? ` · ${person.title}` : ''}</li>)}</ul></section>}
      </div>
    </article>
  )
}