import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThumbsUp } from '@phosphor-icons/react';
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
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!wordRef.current) return;
    gsap.set(wordRef.current, { y: -15, opacity: 0 });
    gsap.to(wordRef.current, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' });
  }, [wordIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(wordRef.current, {
        y: 15, opacity: 0, duration: 0.6, ease: 'expo.inOut',
        onComplete: () => {
          setWordIndex((prev) => (prev + 1) % WORDS.length);
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
          <span className="gsap-reveal-hero font-[var(--font-heading)] text-[clamp(2rem,8vw,6.5rem)] font-normal tracking-tight leading-[1.05] block">
            Finding your way
          </span>
          <span className="gsap-reveal-hero font-[var(--font-heading)] text-[clamp(2rem,8vw,6.5rem)] font-normal tracking-tight leading-[1.05] block">
            back to <span className="font-[var(--font-display)] text-[#82a396] italic" style={{ display: 'inline-block' }} ref={wordRef}>{WORDS[wordIndex]}</span>
          </span>
        </h1>

        <p className="gsap-reveal-hero text-[#a38d7a] font-light text-base lg:text-lg max-w-lg leading-relaxed mb-8">
          A collaborative, empowering practice that meets you where you are and guides you to where you want to be.
        </p>

        <div className="gsap-reveal-hero mt-8">
          <a href="#counselors" className="btn-primary uppercase text-[10px] tracking-[0.2em] px-8 py-4">Meet our counselors</a>
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
    wide: 'md:col-span-2 bg-[#d5dee4] min-h-[160px] md:min-h-[260px]',
    tall: 'md:row-span-2 bg-[#e8e4dc] min-h-[160px] md:min-h-0',
    dark: 'bg-[#1a1a1a] text-[#f5f2ed] min-h-[160px] md:min-h-[220px]',
    light: 'bg-white min-h-[160px] md:min-h-[220px]',
  };

  const logoSlots = {
    wide: (
      <div className="opacity-70">
        <AnimatedLogo animation="flow" variant="mark" size={72} colorMode="light" />
      </div>
    ),
    tall: (
      <div className="flex items-center gap-5 opacity-70">
        <AnimatedLogo animation="flow" variant="mark" size={60} colorMode="light" />
        <AnimatedLogo animation="flow" variant="mark" size={60} colorMode="light" />
      </div>
    ),
    light: (
      <div className="flex flex-col items-center gap-3 opacity-70">
        <AnimatedLogo animation="flow" variant="mark" size={40} colorMode="light" />
        <div className="flex gap-4">
          <AnimatedLogo animation="flow" variant="mark" size={40} colorMode="light" />
          <AnimatedLogo animation="flow" variant="mark" size={40} colorMode="light" />
          <AnimatedLogo animation="flow" variant="mark" size={40} colorMode="light" />
        </div>
      </div>
    ),
    dark: (
      <div className="flex flex-col items-center gap-[4px] opacity-80">
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 84, height: 28, overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -i * 28, left: 0 }}>
              <AnimatedLogo animation="flow" variant="mark" size={84} colorMode="dark" />
            </div>
          </div>
        ))}
      </div>
    ),
  };

  return (
    <section ref={containerRef} id="services" className="py-16 lg:py-24 px-6 lg:px-20 bg-[#f5f2ed]">
      <div className="max-w-[1100px] mx-auto">

        <div id="approach" className="scroll-mt-24 mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
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
              className={`bento-item rounded-2xl flex flex-col justify-between p-5 md:p-8 transition-transform duration-500 hover:scale-[1.02] ${bentoTypeStyles[s.type]}`}
            >
              <div className="flex-1 flex items-center justify-center py-4">{logoSlots[s.type]}</div>
              <div>
                <h3 className={`font-[var(--font-heading)] text-2xl mb-1 ${s.type === 'dark' ? 'text-[#f5f2ed]' : 'text-[#383838]'}`}>{s.title}</h3>
                <p className={`text-sm font-light font-[var(--font-body)] ${s.type === 'dark' ? 'text-[#f5f2ed]/60' : 'text-[#a38d7a]'}`}>{s.desc}</p>
              </div>
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
    answer: "Our aim is for therapy with us to feel like having an educated friend who's got your back, but will also call you out if we know you're moving in a direction you won't be proud of a year from now. If you are seeking ideas to expedite your goals, we help by offering some. If you have plenty of ideas and need someone to help you organize them, we do that too. We help you process major traumatic events in your childhood or current life, and if you require more direct support, such as EMDR or Brainspotting, we do that as well!",
  },
  {
    question: 'How Will Therapy Help Me?',
    answer: "You don't have to be in crisis to benefit from therapy. Therapy can help you understand patterns, manage everyday stress, improve relationships, set boundaries, and build coping skills before problems feel overwhelming. Many people wait because they think they need a diagnosis, a major life event, or a breaking point before reaching out, but support can be helpful long before that. Starting therapy early can make it easier to talk about your feelings, notice burnout, and feel more prepared when life becomes stressful. At akConfluence, therapy is a space for growth, reflection, and support—no crisis required.",
  },
  {
    question: 'Do You Accept Insurance?',
    answer: "We do accept most insurance and can bill them most of them on your behalf as a courtesy. Usually, we'll check your coverage within the first week of your consultation, so by the time you know you're a good fit with your counselor, we'll have all that information lined up and ready for you to consider as you plan future sessions.",
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
    question: 'What Is EMDR and Brainspotting?',
    answer: "Brainspotting is considered a somatic therapy technique and uses body-centered interventions designed to calm the nervous system, release stored tension, and process trauma. It is a therapeutic technique designed to alleviate the distress associated with traumatic memories. Eye Movement Desensitization and Reprocessing (EMDR) is a structured, evidence-based psychotherapy designed to alleviate distress from traumatic memories and PTSD. It helps the brain reprocess stuck, painful memories by using bilateral stimulation such as guided eye movement, while focusing on the trauma, reducing the emotional charge and making memories feel less intense. In short: both techniques help you feel much more neutral about the traumatic events that have occurred in your long-ago past (and even the not-so-long-ago past).",
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
            Still have questions? <a href="mailto:info@akconfluence.com?subject=Question" className="text-[#82a396] underline underline-offset-2 hover:text-[#6b8f80] transition-colors">We're happy to help</a>
          </p>
        </div>
      </div>
    </section>
  );
}

//
// ─────────────── REVIEWS + FOUNDER NOTE SECTION ───────────────
//
const REVIEWS = [
  {
    quote: "I have been a licensed psychologist in Anchorage for 22 years and can honestly say that Elly has been one of the highest caliber therapists it has been my pleasure to encounter. Her reassuring and thoughtful demeanor combined with her commitment to possibility of change for the better with each of her clients creates an ideal environment for effective therapy.",
    name: "Danelle R. Winn, PhD",
    title: null,
  },
  {
    quote: "I refer to akConfluence because their clinicians offer high-quality, individualized therapy that respects the complexity of my patients' needs. Their team is responsive, collaborative, and consistently earns the trust of even our most treatment-resistant cases.",
    name: "E. David Hjellen, DO",
    title: "Frontier Health Services",
  },
  {
    quote: "As a recently retired Marriage and Family Therapist with over 50 years of experience, I highly endorse akConfluence, its founder Elly, and her team. They offer exceptional services including individual therapy, couples therapy, group therapy, workshops, and training. Over the years, Elly has effectively supported several of my MFT supervisees through the licensure process. akConfluence is truly here to “help you imagine a future where today’s challenges don’t hold you back from reaching your full potential.”",
    name: "Mercy Dennis",
    title: "Retired Marriage and Family Therapist",
  },
];

function Reviews() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.rv-heading',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }}
    );
    gsap.fromTo('.rv-col',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 70%' }}
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="reviews" className="py-16 lg:py-24 px-6 lg:px-20 bg-[#f5f2ed]">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="rv-heading text-[#82a396] text-[9px] tracking-[0.4em] uppercase font-medium mb-6 flex items-center gap-2 font-[var(--font-mono)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#82a396] inline-block" /> Trusted By Providers
          </p>
          <h2 className="rv-heading font-[var(--font-display)] text-[clamp(1.8rem,5vw,4rem)] font-light text-[#383838] leading-[1.05] mb-5">
            What providers <em className="text-[#82a396] italic">are saying</em>
          </h2>
          <p className="rv-heading font-[var(--font-body)] text-[#a38d7a] font-light text-lg leading-relaxed">
            Endorsements from fellow Alaska clinicians who refer their patients to our team.
          </p>
        </div>

        {/* Two-column: founder note (left, 40%) + reviews (right, 60%) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">

          {/* Founder note — left column */}
          <aside className="rv-col lg:col-span-2 lg:sticky lg:top-28">
            <div className="rounded-2xl bg-white/60 border border-[#82a396]/15 p-7 lg:p-8">
              <p className="text-[#dd9e6f] text-[9px] tracking-[0.4em] uppercase font-medium mb-4 font-[var(--font-mono)]">
                A Note From Our Founder
              </p>
              <div className="font-[var(--font-body)] text-[#383838] font-light text-[15px] leading-relaxed space-y-4">
                <p>
                  You&rsquo;ll notice our reviews are all from fellow healthcare providers &mdash; the people who trust us with their patients. We&rsquo;re honored by that.
                </p>
                <p>
                  You might wonder where the patient reviews are. Most of our new clients come through personal referrals from friends and family, but patient privacy laws mean we can&rsquo;t ethically share those stories &mdash; even with permission.
                </p>
                <p>
                  So if you&rsquo;d like a patient&rsquo;s perspective, ask around. Chances are someone in your circle has heard of us &mdash; and if not, that just means we have room to grow.
                </p>
              </div>
              <p className="mt-6 font-[var(--font-display)] italic text-[#82a396] text-lg">
                &ndash; Elly Sanchez, Founder
              </p>
            </div>
          </aside>

          {/* Reviews — right column */}
          <div className="rv-col lg:col-span-3">
            {REVIEWS.map((r, i) => (
              <div
                key={r.name}
                className={`flex gap-4 items-start ${i === 0 ? '' : 'border-t border-[#383838]/10 pt-7 mt-7'}`}
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#82a396]/10 flex items-center justify-center mt-1">
                  <ThumbsUp size={18} weight="fill" color="#82a396" />
                </div>
                <div className="flex-1">
                  <blockquote className="font-[var(--font-body)] text-[#383838] font-light text-[15px] leading-relaxed mb-3">
                    {r.quote}
                  </blockquote>
                  <p className="font-[var(--font-display)] italic text-[#383838] text-base">
                    &mdash; {r.name}
                  </p>
                  {r.title && (
                    <p className="mt-1 text-[#a38d7a] text-[10px] tracking-[0.3em] uppercase font-medium font-[var(--font-mono)]">
                      {r.title}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
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
      <Reviews />
      <FAQ />
    </>
  );
}
