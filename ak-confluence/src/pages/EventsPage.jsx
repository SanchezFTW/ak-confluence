import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getWorkshops } from '../lib/sanity';
import {getPageBySlug} from '../lib/sanity';
import PageSections from '../components/PageSections';
import {useClock} from '../lib/useClock';
import {getWorkshopState} from '../lib/workshopStatus';

gsap.registerPlugin(ScrollTrigger);

function formatSession(value, timezone, options = {}) {
  if (!value || !timezone) return null;
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short', timeZone: timezone, ...options,
    }).format(new Date(value));
  } catch {
    return null;
  }
}

export default function EventsPage() {
  const containerRef = useRef(null);
  const [filter, setFilter] = useState('All');
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(null);
  const timeBoundaries = workshops.flatMap((workshop) => [
    workshop.registrationDeadline,
    ...(workshop.sessions || []).map((session) => session.end),
  ]);
  const now = useClock(timeBoundaries);

  useEffect(() => {
    let active = true;
    getWorkshops()
      .then((data) => { if (active) setWorkshops(data || []); })
      .catch((error) => console.error('Failed to load workshops', error))
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    getPageBySlug('events')
      .then((data) => { if (active) setPage(data || null); })
      .catch((error) => console.error('Failed to load Events page content', error));
    return () => { active = false; };
  }, []);

  useGSAP(() => {
    gsap.fromTo('.ep-heading',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out' }
    );
    gsap.fromTo('.ep-card',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
    );
  }, { scope: containerRef });

  const types = ['All', ...new Set(workshops.map((workshop) => workshop.format).filter(Boolean))];
  const filtered = [...(filter === 'All' ? workshops : workshops.filter((workshop) => workshop.format === filter))]
    .sort((a, b) => new Date(a.sessions?.[0]?.start || '9999-12-31') - new Date(b.sessions?.[0]?.start || '9999-12-31'));

  if (page?.sections?.length) return <PageSections sections={page.sections} />;

  return (
    <div ref={containerRef} className="min-h-screen bg-[#f5f2ed]">
      {/* Page Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 px-6 lg:px-20 bg-[#e8e4dc]">
        <div className="max-w-5xl mx-auto">
          <p className="ep-heading text-[#82a396] text-[9px] tracking-[0.4em] uppercase font-medium mb-6 flex items-center gap-2 font-[var(--font-mono)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#82a396] inline-block" /> Events & Workshops
          </p>
          <h1 className="ep-heading font-[var(--font-display)] text-[clamp(2.5rem,5vw,4.5rem)] font-light text-[#383838] leading-[1.05] mb-6">
            Grow in <em className="text-[#82a396] italic">community</em>
          </h1>
          <p className="ep-heading font-[var(--font-body)] text-[#a38d7a] font-light text-lg leading-relaxed max-w-2xl">
            Workshops, support groups, and gatherings designed to support your journey alongside others. Find something that speaks to where you are right now.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 lg:py-24 px-6 lg:px-20">
        <div className="max-w-5xl mx-auto">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                aria-pressed={filter === t}
                className={`text-[10px] tracking-[0.15em] uppercase font-medium font-[var(--font-mono)] px-4 py-2 rounded-full transition-all cursor-pointer ${
                  filter === t
                    ? 'bg-[#82a396] text-white'
                    : 'bg-transparent text-[#a38d7a] border border-[#383838]/10 hover:border-[#82a396] hover:text-[#82a396]'
                }`}
              >
                {t === 'All' ? t : t === 'in-person' ? 'In person' : t === 'online' ? 'Online' : 'Hybrid'}
              </button>
            ))}
          </div>

          {/* Event Cards */}
          <div className="flex flex-col gap-5" aria-live="polite">
            {filtered.map((event) => {
              const {futureSessions, canRegister, label} = getWorkshopState(event, now);
              const nextSession = futureSessions[0] || event.sessions?.[0];
              const sessionTime = nextSession && formatSession(nextSession.start, event.timezone);
              const sessionEnd = nextSession && formatSession(nextSession.end, event.timezone, {hour: 'numeric', minute: '2-digit'});
              const location = event.format === 'online' ? event.onlineDetails || 'Online' : event.format === 'hybrid' ? [event.venue, event.onlineDetails].filter(Boolean).join(' · ') : event.venue;
              return (
                <div
                  key={event.id}
                  className="ep-card group bg-white/60 backdrop-blur-sm border border-[#383838]/5 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-[#82a396]/5 hover:border-[#82a396]/20"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-shrink-0 w-full md:w-32 flex md:flex-col items-center justify-center gap-2 md:gap-1 py-5 md:py-10 bg-[#82a396]/5">
                      <span className="text-[#82a396] text-[10px] tracking-[0.2em] uppercase font-[var(--font-mono)] font-medium">{event.sessions?.length ? 'Schedule' : 'Dates'}</span>
                      <span className="font-[var(--font-display)] text-[#383838] text-2xl md:text-3xl font-light leading-none">{event.sessions?.length || 'TBA'}</span>
                      <span className="text-[#a38d7a]/60 text-[9px] tracking-[0.15em] uppercase font-[var(--font-mono)] mt-1">{event.sessions?.length === 1 ? 'session' : 'sessions'}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                            <span className="text-[9px] tracking-[0.15em] uppercase font-medium font-[var(--font-mono)] text-[#82a396] bg-[#82a396]/10 px-2.5 py-1 rounded-full">
                            Workshop
                          </span>
                          <span className={`text-[9px] tracking-[0.15em] uppercase font-medium font-[var(--font-mono)] px-2.5 py-1 rounded-full ${label === 'Canceled' ? 'text-[#a34f4f] bg-[#a34f4f]/10' : 'text-[#a38d7a] bg-[#a38d7a]/10'}`}>{label}</span>
                        </div>
                        <h2 className="font-[var(--font-heading)] text-[#383838] text-2xl mb-2">{event.title}</h2>
                        {event.summary && <p className="font-[var(--font-body)] text-[#a38d7a] text-sm font-light leading-relaxed mb-3">{event.summary}</p>}
                        <div className="flex flex-wrap items-center gap-4 text-[#a38d7a]/60 text-xs font-[var(--font-mono)]">
                          {sessionTime && <span>{sessionTime}{sessionEnd ? ` – ${sessionEnd}` : ''}</span>}
                          {location && <span>{location}</span>}
                        </div>
                        {event.announcement && <p className="mt-3 text-sm text-[#6b8f80]">{event.announcement}</p>}
                      </div>

                      {/* CTA */}
                      <div className="flex-shrink-0 flex flex-col items-start md:items-end gap-2">
                        {canRegister && <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#82a396] text-white text-[10px] tracking-[0.15em] uppercase font-medium px-5 py-2.5 rounded-full hover:bg-[#6b8f80] active:scale-[0.98] transition-all">Register</a>}
                        {event.slug && <Link to={`/workshops/${event.slug}`} className="text-xs text-[#82a396] underline underline-offset-2">Workshop details</Link>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#a38d7a]/60 text-sm font-light font-[var(--font-body)]">No upcoming workshops are currently listed.</p>
            </div>
          )}
          {loading && <p className="text-center py-12 text-sm text-[#a38d7a]" role="status">Loading workshops…</p>}

          {/* Bottom note */}
          <div className="mt-14 text-center">
            <p className="text-[#a38d7a]/60 text-sm font-light font-[var(--font-body)] max-w-lg mx-auto leading-relaxed">
              Want to be notified about future events? <a href="mailto:info@akconfluence.com?subject=Event Updates" className="text-[#82a396] underline underline-offset-2 hover:text-[#6b8f80] transition-colors">Get on the list</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
