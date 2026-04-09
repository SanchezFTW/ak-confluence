import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedLogo } from '../components/brand/AnimatedLogo';
import CounselorGrid from '../components/CounselorGrid';

gsap.registerPlugin(ScrollTrigger);

const WORDS = ['Clarity.', 'Connection.', 'Wholeness.'];

//
// ─────────────── HERO SECTION ───────────────
//
function Hero() {
  const containerRef = useRef(null);
  const wordRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(wordRef.current, {
        y: 15, opacity: 0, duration: 0.6, ease: 'expo.inOut',
        onComplete: () => {
          setWordIndex((prev) => (prev + 1) % WORDS.length);
          gsap.fromTo(wordRef.current,
            { y: -15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' }
          );
        },
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    gsap.fromTo('.gsap-reveal-hero',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.6,
        stagger: 0.1,
        ease: 'expo.out',
        delay: 1.2
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#f5f2ed] px-6 lg:px-20">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10 pointer-events-none reveal-img-container"
      >
        <div
          className="absolute inset-0 bg-cover bg-center reveal-img"
          style={{ backgroundImage: 'url("https://picsum.photos/seed/confluence-forest/2560/1440")' }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#f5f2ed] via-white/70 to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1100px] mx-auto pt-24">
        <div className="gsap-reveal-hero mb-8 text-[#82a396]">
          <AnimatedLogo animation="draw" variant="horizontal" size={160} colorMode="light" />
        </div>

        <p className="gsap-reveal-hero text-[#82a396] text-[10px] tracking-[0.4em] uppercase font-medium mb-6 flex items-center gap-2 font-[var(--font-mono)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#82a396] inline-block" />
          Therapy & Counseling — Anchorage, AK
        </p>

        <h1 className="flex flex-col text-[#383838] mb-8">
          <span className="gsap-reveal-hero font-[var(--font-heading)] text-[clamp(3.5rem,8vw,6.5rem)] font-normal tracking-tight leading-[1.05] block">
            Finding your way
          </span>
          <span className="gsap-reveal-hero font-[var(--font-heading)] text-[clamp(3.5rem,8vw,6.5rem)] font-normal tracking-tight leading-[1.05] block">
            back to <span className="font-[var(--font-display)] text-[#82a396] italic" ref={wordRef}>{WORDS[wordIndex]}</span>
          </span>
        </h1>

        <p className="gsap-reveal-hero text-[#a38d7a] font-light text-lg max-w-lg leading-relaxed mb-8">
          A collaborative, empowering practice that meets you where you are and guides you to where you want to be.
        </p>

        <div className="gsap-reveal-hero flex items-center gap-8 mt-8">
          <a href="#contact" className="btn-primary uppercase text-[10px] tracking-[0.2em] px-8 py-4">Begin here</a>
          <a href="#approach" className="text-[#383838] text-[10px] tracking-[0.2em] uppercase hover:text-[#82a396] transition-colors border-b border-[#383838]/30 pb-1">Our approach &rarr;</a>
        </div>
      </div>
    </section>
  );
}

//
// ─────────────── SERVICES SECTION ───────────────
//
const SERVICES = [
  { title: 'Individual Therapy', desc: 'One-on-one sessions tailored to your unique story.', type: 'wide' },
  { title: 'Couples Counseling', desc: 'Rebuilding connection together.', type: 'tall' },
  { title: 'Trauma Recovery', desc: 'From surviving toward genuine healing.', type: 'dark' },
  { title: 'Workshops', desc: 'Learn, grow, and connect in a group setting.', type: 'light' },
];

function Capabilities() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.bento-item',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'expo.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
      }
    );

  }, { scope: containerRef });

  const bentoTypeStyles = {
    wide: 'md:col-span-2 bg-[#d5dee4] min-h-[280px]',
    tall: 'md:row-span-2 bg-[#e8e4dc] min-h-[280px] md:min-h-0',
    dark: 'bg-[#1a1a1a] text-[#f5f2ed] min-h-[280px]',
    light: 'bg-white min-h-[280px]',
  };

  return (
    <section ref={containerRef} id="services" className="py-16 lg:py-24 px-6 lg:px-20 bg-[#f5f2ed]">
      <div className="max-w-[1100px] mx-auto">

        <div id="approach" className="scroll-mt-24 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <p className="text-[#82a396] text-[9px] tracking-[0.4em] uppercase font-medium mb-4 flex items-center gap-2 font-[var(--font-mono)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#82a396] inline-block" /> Services
            </p>
            <h2 className="font-[var(--font-display)] text-[clamp(2.5rem,5vw,4rem)] font-light text-[#383838] leading-[1.05]">
              How we work<br/><em className="text-[#82a396] italic">together</em>
            </h2>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className={`bento-item rounded-2xl flex flex-col justify-end p-8 transition-transform duration-500 hover:scale-[1.02] ${bentoTypeStyles[s.type]}`}
            >
              <h3 className={`font-[var(--font-heading)] text-2xl mb-1 ${s.type === 'dark' ? 'text-[#f5f2ed]' : 'text-[#383838]'}`}>{s.title}</h3>
              <p className={`text-sm font-light font-[var(--font-body)] ${s.type === 'dark' ? 'text-[#f5f2ed]/60' : 'text-[#a38d7a]'}`}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

//
// ─────────────── FAQ SECTION ───────────────
//
const FAQ_DATA = [
  {
    question: 'Is Therapy Right For Me?',
    answer: "If you find yourself having the same conversations in your head with little forward movement, therapy might be right for you. It's a place where you can sort through your thoughts and figure out how to move past the circular thinking, with someone who has been trained to help you do just that.",
  },
  {
    question: 'Do I Really Need Therapy?',
    answer: 'Many things in life can be "handled" alone, but there are times when you may want company as you unpack certain aspects of your life. When it becomes clear that you need outside support, it may be better to sort things out with professionals who are prepared to help. If you are still on the fence about therapy and feel like you can "push through" it alone, just remember that counseling can only help.',
  },
  {
    question: 'What Is Therapy Like?',
    answer: "Our aim is for therapy with us to feel like having an educated friend who's got your back, but will also call you out if we know you're moving in a direction you won't be proud of a year from now. If you are seeking ideas to expedite your goals, we help by offering some. If you have plenty of ideas and need someone to help you organize them, we do that too. We help you process major traumatic events in your childhood or current life, and if you require more professional and direct support, such as EMDR, we do that as well!",
  },
  {
    question: 'How Will Therapy Help Me?',
    answer: "We have received feedback on many ways in which therapy has helped people. Specifically, it can help with confidence, anger, relationships, and quality of life. The American Psychological Association suggests that counseling can improve many aspects of your life, including learning effective strategies to cope with stress, changing habits that have a negative impact on your career or relationships, and increasing overall quality of life.",
  },
  {
    question: 'What Is The Length And Frequency Of Sessions?',
    answer: 'In the spirit of our "we lead together" mantra here at Confluence Counseling, this will vary from client to client. The variables we take into account include, but are not limited to, the issue you\'ve decided to address, as well as the frequency, intensity, and duration of your symptoms.',
  },
  {
    question: 'Do You Accept Insurance?',
    answer: "We do accept insurance and can bill them on your behalf as a courtesy. Usually, we'll check your coverage within the first week of your free consultation, so by the time you know you're a good fit with your counselor, we'll have all that information lined up and ready for you to consider as you plan future sessions. We will honor what the insurance company says and only charge you what the insurance company states is your portion.",
  },
  {
    question: 'Is There A Sliding Fee?',
    answer: 'Confluence does not have a sliding fee at this time, but we do have out-of-pocket options. Feel free to contact us and inquire.',
  },
  {
    question: 'Is Therapy Confidential?',
    answer: "Client confidentiality is the requirement that therapists, psychiatrists, psychologists, and most other mental health professionals protect their clients' privacy by not revealing the contents of therapy. Confidentiality includes not just the contents of therapy, but often the fact that a client is in therapy. However, we can and must break confidentiality in some circumstances, such as when a client is a threat to themselves or others.",
  },
  {
    question: 'Can We Do Sessions Over Video?',
    answer: 'Yes, we can. We offer telehealth sessions via a HIPAA-compliant platform.',
  },
  {
    question: 'How Much Is The Session Fee?',
    answer: 'Therapy sessions start at $150. Some factors that can affect the price include: training of the therapist, length of therapy session, specialization, and insurance coverage.',
  },
  {
    question: 'What Is EMDR?',
    answer: "Eye Movement Desensitization and Reprocessing (EMDR) is a psychotherapy treatment originally designed to alleviate the distress associated with traumatic memories. In short: it helps you feel much more neutral about the traumatic events that have occurred in your long-ago past (and even the not-so-long-ago past).",
  },
];

function FaqItem({ item, isOpen, onToggle }) {
  const contentRef = useRef(null);

  return (
    <div className="border-b border-[#383838]/8">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left cursor-pointer bg-transparent border-none group"
      >
        <span className="font-[var(--font-heading)] text-lg text-[#82a396] group-hover:text-[#6b8f80] transition-colors pr-4">
          {item.question}
        </span>
        <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center text-[#a38d7a] transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="8" y1="2" x2="8" y2="14" />
            <line x1="2" y1="8" x2="14" y2="8" />
          </svg>
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
        style={{
          maxHeight: isOpen ? contentRef.current?.scrollHeight + 'px' : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="font-[var(--font-body)] text-[#a38d7a] font-light text-[15px] leading-relaxed pb-6 pr-12">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

function FAQ() {
  const containerRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  const midpoint = Math.ceil(FAQ_DATA.length / 2);
  const leftColumn = FAQ_DATA.slice(0, midpoint);
  const rightColumn = FAQ_DATA.slice(midpoint);

  useGSAP(() => {
    gsap.fromTo('.faq-heading',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 75%' }}
    );
    gsap.fromTo('.faq-col',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 65%' }}
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="faq" className="py-16 lg:py-24 px-6 lg:px-20 bg-[#f5f2ed]">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <p className="faq-heading text-[#82a396] text-[9px] tracking-[0.4em] uppercase font-medium mb-6 flex items-center gap-2 font-[var(--font-mono)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#82a396] inline-block" /> Common Questions
          </p>
          <h2 className="faq-heading font-[var(--font-display)] text-[clamp(2.5rem,5vw,4rem)] font-light text-[#383838] leading-[1.05] mb-6">
            Frequently <em className="text-[#82a396] italic">asked</em>
          </h2>
          <p className="faq-heading font-[var(--font-body)] text-[#a38d7a] font-light text-lg leading-relaxed">
            We know starting therapy can bring up questions. Here are some answers to help you feel more at ease.
          </p>
        </div>

        {/* Two-column FAQ */}
        <div className="grid md:grid-cols-2 gap-x-16">
          <div className="faq-col">
            {leftColumn.map((item, i) => (
              <FaqItem
                key={i}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
          <div className="faq-col">
            {rightColumn.map((item, i) => {
              const globalIndex = i + midpoint;
              return (
                <FaqItem
                  key={globalIndex}
                  item={item}
                  isOpen={openIndex === globalIndex}
                  onToggle={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                />
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-[#a38d7a]/60 text-sm font-light font-[var(--font-body)] max-w-lg mx-auto leading-relaxed">
            Still have questions? <a href="mailto:hello@akconfluence.com?subject=Question" className="text-[#82a396] underline underline-offset-2 hover:text-[#6b8f80] transition-colors">We're happy to help</a>
          </p>
        </div>
      </div>
    </section>
  );
}

//
// ─────────────── EVENTS PREVIEW (HOMEPAGE) ───────────────
//
const EVENTS_PREVIEW = [
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
];

function formatEventDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = date.getDate();
  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
  return { month, day, weekday };
}

function EventsPreview() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.events-heading',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 75%' }}
    );
    gsap.fromTo('.event-card',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 65%' }}
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="events" className="py-16 lg:py-24 px-6 lg:px-20 bg-[#e8e4dc] scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <p className="events-heading text-[#82a396] text-[9px] tracking-[0.4em] uppercase font-medium mb-6 flex items-center gap-2 font-[var(--font-mono)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#82a396] inline-block" /> Events & Workshops
          </p>
          <h2 className="events-heading font-[var(--font-display)] text-[clamp(2.5rem,5vw,4rem)] font-light text-[#383838] leading-[1.05] mb-6">
            Grow in <em className="text-[#82a396] italic">community</em>
          </h2>
          <p className="events-heading font-[var(--font-body)] text-[#a38d7a] font-light text-lg leading-relaxed">
            Workshops, groups, and gatherings designed to support your journey alongside others.
          </p>
        </div>

        {/* Preview Cards (top 3) */}
        <div className="flex flex-col gap-4">
          {EVENTS_PREVIEW.map((event) => {
            const { month, day, weekday } = formatEventDate(event.date);
            return (
              <div
                key={event.id}
                className={`event-card group bg-white/60 backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-[#82a396]/5 hover:border-[#82a396]/20 ${
                  event.featured ? 'border-[#82a396]/30' : 'border-[#383838]/5'
                }`}
              >
                <div className="flex flex-col md:flex-row">
                  <div className={`flex-shrink-0 w-full md:w-28 flex md:flex-col items-center justify-center gap-2 md:gap-0 py-4 md:py-8 ${
                    event.featured ? 'bg-[#82a396]/5' : 'bg-[#f5f2ed]'
                  }`}>
                    <span className="text-[#82a396] text-[10px] tracking-[0.2em] uppercase font-[var(--font-mono)] font-medium">{month}</span>
                    <span className="font-[var(--font-display)] text-[#383838] text-4xl md:text-5xl font-light leading-none">{day}</span>
                  </div>

                  <div className="flex-1 p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="text-[9px] tracking-[0.15em] uppercase font-medium font-[var(--font-mono)] text-[#82a396] bg-[#82a396]/10 px-2.5 py-1 rounded-full">
                          {event.type}
                        </span>
                        {event.featured && (
                          <span className="text-[9px] tracking-[0.15em] uppercase font-medium font-[var(--font-mono)] text-[#ecc292] bg-[#ecc292]/10 px-2.5 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="font-[var(--font-heading)] text-[#383838] text-xl mb-1">{event.title}</h3>
                      <p className="font-[var(--font-body)] text-[#a38d7a] text-sm font-light leading-relaxed mb-2">{event.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-[#a38d7a]/60 text-xs font-[var(--font-mono)]">
                        <span>{weekday} · {event.time}</span>
                        <span>{event.location}</span>
                      </div>
                    </div>

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

        {/* Link to full events page */}
        <div className="mt-12 text-center">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-[#82a396] text-[10px] tracking-[0.2em] uppercase font-medium font-[var(--font-mono)] border-b border-[#82a396]/30 pb-1 hover:border-[#82a396] hover:text-[#6b8f80] transition-colors"
          >
            View all events &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

//
// ─────────────── HOME PAGE ───────────────
//
export default function Home() {
  return (
    <>
      <Hero />
      <Capabilities />
      <CounselorGrid />
      <EventsPreview />
      <FAQ />
    </>
  );
}
