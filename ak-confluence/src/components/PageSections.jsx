import {Link} from 'react-router-dom'
import {ArrowRight} from '@phosphor-icons/react'
import NewsletterSignup from './NewsletterSignup'
import {PortableText} from '../lib/portableText'
import {resolveSiteLink, urlFor} from '../lib/sanity'
import {useClock} from '../lib/useClock'
import {getWorkshopState} from '../lib/workshopStatus'

function SiteAnchor({link, children, className}) {
  const href = resolveSiteLink(link)
  if (!href) return null
  if (href.startsWith('/') && !link.openInNewTab) {
    return <Link to={href} className={className}>{children || link.label}</Link>
  }
  return (
    <a href={href} className={className} target={link.openInNewTab ? '_blank' : undefined} rel={link.openInNewTab ? 'noopener noreferrer' : undefined}>
      {children || link.label}
    </a>
  )
}

function Heading({children}) {
  return <h2 className="font-[var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-light leading-tight text-[#383838]">{children}</h2>
}

function ServiceCards({services = []}) {
  const visible = services.filter((service) => service?.title)
  if (!visible.length) return null
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {visible.map((service) => (
        <Link key={service.id || service.title} to={service.slug ? `/services/${service.slug}` : '/contact'} className="group bg-white border border-[#82a396]/15 p-6 rounded-xl hover:border-[#82a396]/50 transition-colors">
          <h3 className="font-[var(--font-heading)] text-xl text-[#383838] mb-2">{service.title}</h3>
          {service.desc && <p className="text-sm font-light leading-relaxed text-[#a38d7a]">{service.desc}</p>}
          {service.slug && <span className="mt-4 inline-flex items-center gap-2 text-xs text-[#82a396]">Learn more <ArrowRight size={14} /></span>}
        </Link>
      ))}
    </div>
  )
}

function CounselorCards({counselors = []}) {
  const visible = counselors.filter((counselor) => counselor?.name)
  if (!visible.length) return null
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
      {visible.map((counselor) => {
        const image = urlFor(counselor.photo)?.width(600).height(600).fit('crop').auto('format').url()
        const Card = counselor.slug ? Link : 'article'
        return (
          <Card key={counselor.id || counselor.name} {...(counselor.slug ? {to: `/counselors/${counselor.slug}`} : {})} className="block overflow-hidden bg-white border border-[#383838]/5 rounded-xl">
            {image && <img src={image} alt={counselor.photo?.alt || `${counselor.name}, ${counselor.title || 'counselor'}`} className="aspect-square w-full object-cover" loading="lazy" />}
            <div className="p-5">
              <h3 className="font-[var(--font-heading)] text-xl text-[#383838]">{counselor.name}</h3>
              {(counselor.role || counselor.title) && <p className="text-sm text-[#a38d7a] mt-1">{[counselor.role, counselor.title].filter(Boolean).join(' · ')}</p>}
              {counselor.shortIntro && <p className="mt-3 text-sm text-[#a38d7a] leading-relaxed">{counselor.shortIntro}</p>}
              {counselor.status && <p className="mt-3 text-xs uppercase tracking-wider text-[#82a396]">{counselor.status === 'open' ? 'Accepting clients' : counselor.status === 'waitlist' ? 'Waitlist' : counselor.status === 'full' ? 'Currently full' : 'Unavailable'}</p>}
            </div>
          </Card>
        )
      })}
    </div>
  )
}

function WorkshopCards({workshops = []}) {
  const now = useClock(workshops.flatMap((workshop) => [workshop.registrationDeadline, ...(workshop.sessions || []).map((session) => session.end)]))
  const visible = workshops.filter((workshop) => workshop?.title && workshop.slug)
  if (!visible.length) return null
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
      {visible.map((workshop) => {
        const workshopState = getWorkshopState(workshop, now)
        const state = workshopState.label
        const start = workshopState.futureSessions[0]?.start
        let date = null
        if (start && workshop.timezone) {
          try { date = new Intl.DateTimeFormat('en-US', {dateStyle: 'long', timeZone: workshop.timezone}).format(new Date(start)) } catch { date = null }
        }
        return <Link key={workshop.id || workshop.slug} to={`/workshops/${workshop.slug}`} className="bg-white border border-[#82a396]/15 rounded-xl p-5 hover:border-[#82a396]/50 transition-colors">
          <span className="text-[10px] uppercase tracking-wider text-[#82a396]">{state}</span>
          <h3 className="font-[var(--font-heading)] text-xl text-[#383838] mt-2">{workshop.title}</h3>
          {workshop.summary && <p className="mt-2 text-sm text-[#a38d7a] leading-relaxed">{workshop.summary}</p>}
          {date && <p className="mt-3 text-xs text-[#a38d7a]">{date}</p>}
        </Link>
      })}
    </div>
  )
}

function FaqItems({faqs = []}) {
  const visible = faqs.filter((faq) => faq?.question && faq?.answer?.length && faq.websiteVisible !== false)
  if (!visible.length) return null
  return (
    <div className="mt-8 border-t border-[#383838]/10">
      {visible.map((faq) => (
        <details key={faq._id || faq.question} className="border-b border-[#383838]/10 py-5 group">
          <summary className="cursor-pointer list-none pr-8 font-[var(--font-heading)] text-lg text-[#82a396] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#82a396]">
            {faq.question}
          </summary>
          <div className="mt-3 max-w-3xl text-sm leading-relaxed text-[#a38d7a]"><PortableText value={faq.answer} /></div>
        </details>
      ))}
    </div>
  )
}

function Endorsements({endorsements = []}) {
  const visible = endorsements.filter((item) => item?.quote && item?.providerName)
  if (!visible.length) return null
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {visible.map((item) => (
        <figure key={item._id || item.providerName} className="border-l-2 border-[#82a396] pl-5">
          {urlFor(item.photo)?.width(320).height(320).fit('crop').auto('format').url() && <img src={urlFor(item.photo).width(320).height(320).fit('crop').auto('format').url()} alt={item.photo?.decorative ? '' : item.photo?.alt || item.providerName} className="mb-4 w-16 h-16 rounded-full object-cover" loading="lazy" />}
          <blockquote className="font-[var(--font-body)] text-[#383838] leading-relaxed">“{item.quote}”</blockquote>
          <figcaption className="mt-4 text-sm text-[#a38d7a]">
            {item.website ? <a href={item.website} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{item.providerName}</a> : item.providerName}
            {[item.credentials, item.organization].filter(Boolean).length > 0 && ` · ${[item.credentials, item.organization].filter(Boolean).join(', ')}`}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

function Section({section}) {
  if (!section || section.enabled === false) return null
  const standard = 'px-6 lg:px-20 py-14 lg:py-20'
  const title = section.heading && <Heading>{section.heading}</Heading>

  if (section._type === 'heroSection') {
    const image = urlFor(section.image)?.width(2000).fit('crop').auto('format').url()
    return (
      <section className={`${standard} relative overflow-hidden ${section.variant === 'dark' ? 'bg-[#383838] text-[#f5f2ed]' : section.variant === 'image' ? 'bg-[#e8e4dc]' : 'bg-[#f5f2ed]'}`}>
        {image && section.variant === 'image' && <img src={image} alt={section.image?.decorative ? '' : section.image?.alt || ''} className="absolute inset-0 w-full h-full object-cover" />}
        {image && section.variant === 'image' && <div className="absolute inset-0 bg-[#f5f2ed]/75" />}
        <div className="relative z-10 max-w-5xl mx-auto py-10">
          {section.eyebrow && <p className="text-xs uppercase tracking-[0.2em] text-[#82a396] mb-5">{section.eyebrow}</p>}
          <h1 className="max-w-4xl font-[var(--font-display)] text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] font-light text-[#383838]">{section.heading}</h1>
          {section.supportingCopy && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#a38d7a]">{section.supportingCopy}</p>}
          {section.button && <SiteAnchor link={section.button} className="btn-primary mt-8 inline-flex">{section.button.label}</SiteAnchor>}
        </div>
      </section>
    )
  }

  if (section._type === 'richTextSection' && section.body?.length) {
    return <section className={`${standard} ${section.variant === 'dark' ? 'bg-[#383838] text-[#f5f2ed]' : section.variant === 'light' ? 'bg-white' : 'bg-[#f5f2ed]'}`}><div className="max-w-4xl mx-auto">{title}<div className="prose-newsletter mt-6 max-w-3xl text-[#a38d7a]"><PortableText value={section.body} /></div></div></section>
  }

  if (section._type === 'textImageSection') {
    const image = urlFor(section.image)?.width(1200).fit('max').auto('format').url()
    if (!section.heading && !section.body?.length && !image) return null
    return <section className={`${standard} bg-white`}><div className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${section.imagePosition === 'left' ? 'md:[&>div:first-child]:order-2' : ''}`}>
      <div>{title}{section.body?.length > 0 && <div className="prose-newsletter mt-5 text-[#a38d7a]"><PortableText value={section.body} /></div>}{section.button && <SiteAnchor link={section.button} className="btn-primary mt-6 inline-flex">{section.button.label}</SiteAnchor>}</div>
      {image && <img src={image} alt={section.image?.decorative ? '' : section.image?.alt || ''} loading="lazy" className="w-full max-h-[32rem] object-cover rounded-xl" />}
    </div></section>
  }

  if (section._type === 'serviceCardsSection') return <section id="services" className={`${standard} bg-[#f5f2ed}`}><div className="max-w-6xl mx-auto">{title}<ServiceCards services={section.services} /></div></section>
  if (section._type === 'counselorCardsSection') return <section id="counselors" className={`${standard} bg-white`}><div className="max-w-6xl mx-auto">{title}<CounselorCards counselors={section.counselors} /></div></section>
  if (section._type === 'workshopCardsSection') return <section className={`${standard} bg-[#f5f2ed}`}><div className="max-w-6xl mx-auto">{title}<WorkshopCards workshops={section.workshops} /></div></section>
  if (section._type === 'faqSection') return <section className={`${standard} bg-[#f5f2ed}`}><div className="max-w-5xl mx-auto">{title}<FaqItems faqs={section.faqs} /></div></section>
  if (section._type === 'providerEndorsementsSection') return <section className={`${standard} bg-white`}><div className="max-w-6xl mx-auto"><p className="text-xs uppercase tracking-[0.2em] text-[#82a396] mb-4">Provider endorsements</p>{title}<Endorsements endorsements={section.endorsements} /></div></section>
  if (section._type === 'callToActionSection') {
    const theme = section.variant === 'dark' ? 'bg-[#383838] text-[#f5f2ed]' : section.variant === 'light' ? 'bg-white text-[#383838]' : 'bg-[#82a396] text-white'
    return <section className={`${standard} ${theme}`}><div className="max-w-4xl mx-auto text-center"><h2 className="font-[var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] leading-tight">{section.heading}</h2>{section.supportingCopy && <p className="max-w-2xl mx-auto mt-4 leading-relaxed opacity-80">{section.supportingCopy}</p>}{section.button && <SiteAnchor link={section.button} className="mt-7 inline-flex bg-white text-[#383838] px-6 py-3 rounded-full">{section.button.label}</SiteAnchor>}</div></section>
  }
  if (section._type === 'newsletterSection') return <section className="bg-[#383838] px-6 lg:px-20 py-14"><NewsletterSignup heading={section.heading} copy={section.supportingCopy} /></section>
  return null
}

export default function PageSections({sections = []}) {
  return sections.map((section) => <Section key={section._key} section={section} />)
}