import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {PortableText} from '../lib/portableText'
import {getServiceBySlug, urlFor} from '../lib/sanity'
import {usePageMetadata} from '../lib/usePageMetadata'

export default function ServicePage() {
  const {slug} = useParams()
  const [service, setService] = useState(null)
  const [loadedSlug, setLoadedSlug] = useState(null)

  useEffect(() => {
    let active = true
    setLoadedSlug(null)
    getServiceBySlug(slug)
      .then((data) => { if (active) setService(data || null) })
      .catch((error) => { console.error('Failed to load service', error); if (active) setService(null) })
      .finally(() => { if (active) setLoadedSlug(slug) })
    return () => { active = false }
  }, [slug])

  usePageMetadata(service?.seo, service?.title, service?.desc)

  if (loadedSlug !== slug) return <section className="min-h-[60vh] flex items-center justify-center"><p className="text-sm text-[#82a396]">Loading…</p></section>
  if (!service) return <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center"><h1 className="font-[var(--font-display)] text-4xl text-[#383838]">Service not found</h1><Link to="/" className="btn-primary mt-6">Return home</Link></section>

  const image = urlFor(service.image)?.width(1800).fit('max').auto('format').url()
  const counselors = service.counselors || []
  const faqs = (service.faqs || []).filter((faq) => faq?.question && faq?.answer?.length && faq.websiteVisible !== false)

  return (
    <article className="min-h-screen bg-[#f5f2ed]">
      <header className="px-6 lg:px-20 pt-36 pb-14 lg:pt-44 lg:pb-20 bg-[#e8e4dc]">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-[#82a396] mb-5">Services</p>
          <h1 className="font-[var(--font-display)] text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] text-[#383838]">{service.title}</h1>
          {service.desc && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#a38d7a]">{service.desc}</p>}
          {service.ctaUrl && <a href={service.ctaUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 inline-flex">{service.ctaLabel || 'Request a consultation'}</a>}
        </div>
      </header>
      {image && <div className="max-w-6xl mx-auto px-6 lg:px-20 -mt-8"><img src={image} alt={service.image?.alt || ''} className="w-full max-h-[34rem] object-cover rounded-xl" /></div>}
      <div className="max-w-5xl mx-auto px-6 lg:px-20 py-12 lg:py-16 space-y-12">
        {service.body?.length > 0 && <section className="prose-newsletter max-w-3xl text-[#383838]"><PortableText value={service.body} /></section>}
        {service.intendedAudience && <section><h2 className="font-[var(--font-heading)] text-2xl text-[#383838] mb-3">Who this service is for</h2><p className="text-[#a38d7a] leading-relaxed">{service.intendedAudience}</p></section>}
        {service.concerns?.length > 0 && <section><h2 className="font-[var(--font-heading)] text-2xl text-[#383838] mb-3">Areas of focus</h2><ul className="flex flex-wrap gap-2">{service.concerns.map((item) => <li key={item} className="px-3 py-1.5 rounded-full bg-white text-sm text-[#6b8f80]">{item}</li>)}</ul></section>}
        {service.whatToExpect && <section><h2 className="font-[var(--font-heading)] text-2xl text-[#383838] mb-3">What to expect</h2><p className="text-[#a38d7a] leading-relaxed">{service.whatToExpect}</p></section>}
        {(service.sessionDuration || service.feesAndPayment || service.inPersonAvailable || service.telehealthAvailable) && <section className="border-y border-[#383838]/10 py-6"><h2 className="font-[var(--font-heading)] text-2xl text-[#383838] mb-4">Practical details</h2><div className="space-y-2 text-sm text-[#a38d7a]">
          {service.sessionDuration && <p>Session duration: {service.sessionDuration} {service.sessionDurationUnit || 'minutes'}</p>}
          {service.inPersonAvailable && <p>In-person sessions are available.</p>}
          {service.telehealthAvailable && <p>Telehealth sessions are available.</p>}
          {service.feesAndPayment && <p className="whitespace-pre-line">{service.feesAndPayment}</p>}
        </div></section>}
        {counselors.length > 0 && <section><h2 className="font-[var(--font-heading)] text-2xl text-[#383838] mb-5">Related counselors</h2><div className="grid sm:grid-cols-2 gap-4">{counselors.map((counselor) => <div key={counselor.name} className="bg-white p-5 rounded-xl"><h3 className="font-[var(--font-heading)] text-lg text-[#383838]">{counselor.name}</h3><p className="text-sm text-[#a38d7a]">{[counselor.role, counselor.title].filter(Boolean).join(' · ')}</p>{counselor.status && <p className="mt-2 text-xs uppercase text-[#82a396]">{counselor.status === 'open' ? 'Accepting clients' : counselor.status === 'waitlist' ? 'Waitlist' : counselor.status === 'full' ? 'Currently full' : 'Unavailable'}</p>}</div>)}</div></section>}
        {faqs.length > 0 && <section><h2 className="font-[var(--font-heading)] text-2xl text-[#383838] mb-5">Frequently asked questions</h2><div className="border-t border-[#383838]/10">{faqs.map((faq) => <details key={faq.question} className="border-b border-[#383838]/10 py-5"><summary className="cursor-pointer font-[var(--font-heading)] text-lg text-[#82a396]">{faq.question}</summary><div className="prose-newsletter mt-3 text-sm text-[#a38d7a]"><PortableText value={faq.answer} /></div></details>)}</div></section>}
      </div>
    </article>
  )
}