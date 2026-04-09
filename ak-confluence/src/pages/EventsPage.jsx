import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EVENTS_DATA = [
  {
    id: 1,
    title: 'Breathwork & Grounding Circle',
    date: '2026-04-18',
    time: '6:00 PM – 7:30 PM',
    location: 'Confluence Office, Anchorage',
    type: 'Workshop',
    description: 'A guided breathwork session designed to help you reconnect with your body, release tension, and cultivate calm. Open to all experience levels.',
    spotsLeft: 6,
    featured: true,
  },
  {
    id: 2,
    title: 'Navigating Life Transitions',
    date: '2026-04-25',
    time: '12:00 PM – 1:00 PM',
    location: 'Virtual (Zoom)',
    type: 'Webinar',
    description: 'A free lunchtime talk exploring how to move through major life changes with intention and self-compassion.',
    spotsLeft: null,
    featured: false,
  },
  {
    id: 3,
    title: 'Couples Communication Workshop',
    date: '2026-05-10',
    time: '10:00 AM – 1:00 PM',
    location: 'Confluence Office, Anchorage',
    type: 'Workshop',
    description: 'Learn practical Gottman-based tools for deeper listening, resolving conflict, and strengthening your partnership.',
    spotsLeft: 4,
    featured: false,
  },
  {
    id: 4,
    title: 'Community Grief Circle',
    date: '2026-05-17',
    time: '5:30 PM – 7:00 PM',
    location: 'Confluence Office, Anchorage',
    type: 'Support Group',
    description: 'A safe, facilitated space to share, listen, and be held in community as you navigate loss.',
    spotsLeft: 10,
    featured: false,
  },
];

function formatEventDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = date.getDate();
  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
  const full = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return { month, day, weekday, full };
}

export default function EventsPage() {
  const containerRef = useRef(null);
  const [filter, setFilter] = useState('All');

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

  const types = ['All', ...new Set(EVENTS_DATA.map(e => e.type))];
  const filtered = filter === 'All' ? EVENTS_DATA : EVENTS_DATA.filter(e => e.type === filter);

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
                className={`text-[10px] tracking-[0.15em] uppercase font-medium font-[var(--font-mono)] px-4 py-2 rounded-full transition-all cursor-pointer ${
                  filter === t
                    ? 'bg-[#82a396] text-white'
                    : 'bg-transparent text-[#a38d7a] border border-[#383838]/10 hover:border-[#82a396] hover:text-[#82a396]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Event Cards */}
          <div className="flex flex-col gap-5">
            {filtered.map((event) => {
              const { month, day, weekday, full } = formatEventDate(event.date);
              return (
                <div
                  key={event.id}
                  className={`ep-card group bg-white/60 backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-[#82a396]/5 hover:border-[#82a396]/20 ${
                    event.featured ? 'border-[#82a396]/30' : 'border-[#383838]/5'
                  }`}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Date block */}
                    <div className={`flex-shrink-0 w-full md:w-32 flex md:flex-col items-center justify-center gap-2 md:gap-1 py-5 md:py-10 ${
                      event.featured ? 'bg-[#82a396]/5' : 'bg-[#f5f2ed]'
                    }`}>
                      <span className="text-[#82a396] text-[10px] tracking-[0.2em] uppercase font-[var(--font-mono)] font-medium">{month}</span>
                      <span className="font-[var(--font-display)] text-[#383838] text-5xl md:text-6xl font-light leading-none">{day}</span>
                      <span className="text-[#a38d7a]/50 text-[9px] tracking-[0.15em] uppercase font-[var(--font-mono)] mt-1 hidden md:block">{weekday}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <span className="text-[9px] tracking-[0.15em] uppercase font-medium font-[var(--font-mono)] text-[#82a396] bg-[#82a396]/10 px-2.5 py-1 rounded-full">
                            {event.type}
                          </span>
                          {event.featured && (
                            <span className="text-[9px] tracking-[0.15em] uppercase font-medium font-[var(--font-mono)] text-[#ecc292] bg-[#ecc292]/10 px-2.5 py-1 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                        <h2 className="font-[var(--font-heading)] text-[#383838] text-2xl mb-2">{event.title}</h2>
                        <p className="font-[var(--font-body)] text-[#a38d7a] text-sm font-light leading-relaxed mb-3">{event.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-[#a38d7a]/60 text-xs font-[var(--font-mono)]">
                          <span>{full}</span>
                          <span>{event.time}</span>
                          <span>{event.location}</span>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex-shrink-0 flex flex-col items-start md:items-end gap-2">
                        {event.spotsLeft !== null && (
                          <span className="text-[10px] font-[var(--font-mono)] tracking-wider uppercase text-[#a38d7a]/60">
                            {event.spotsLeft} spots left
                          </span>
                        )}
                        <a
                          href={`mailto:hello@akconfluence.com?subject=RSVP: ${event.title}`}
                          className="inline-flex items-center gap-2 bg-[#82a396] text-white text-[10px] tracking-[0.15em] uppercase font-medium px-5 py-2.5 rounded-full hover:bg-[#6b8f80] active:scale-[0.98] transition-all"
                        >
                          {event.spotsLeft !== null ? 'Reserve a spot' : 'Register free'}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#a38d7a]/60 text-sm font-light font-[var(--font-body)]">No upcoming events in this category.</p>
            </div>
          )}

          {/* Bottom note */}
          <div className="mt-14 text-center">
            <p className="text-[#a38d7a]/60 text-sm font-light font-[var(--font-body)] max-w-lg mx-auto leading-relaxed">
              Want to be notified about future events? <a href="mailto:hello@akconfluence.com?subject=Event Updates" className="text-[#82a396] underline underline-offset-2 hover:text-[#6b8f80] transition-colors">Get on the list</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
