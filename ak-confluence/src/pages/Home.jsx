import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ThumbsUp } from '@phosphor-icons/react';
import { AnimatedLogo } from '../components/brand/AnimatedLogo';
import CounselorGrid from '../components/CounselorGrid';
import { getHomePage, getServices, getFaqs, getProviderEndorsements, urlFor } from '../lib/sanity';
import {PortableText} from '../lib/portableText';
import {usePageMetadata} from '../lib/usePageMetadata';

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_WORDS = ['Clarity.', 'Connection.', 'Wholeness.'];
const DEFAULT_HERO_IMAGE = 'https://picsum.photos/seed/confluence-forest/2560/1440';
const DEFAULT_HERO_SUBTITLE =
  'Down to earth, and collaborative - supportive enough to sit with you, honest enough to help you actually move forward.';

//
// ─────────────── HERO SECTION ───────────────
//
function Hero({homePage, settings}) {
  const containerRef = useRef(null);
  const wordRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);
  const isFirstRender = useRef(true);

  const words = homePage?.heroAccentWords?.length ? homePage.heroAccentWords : settings?.heroWords?.length ? settings.heroWords : DEFAULT_WORDS;
  const heroImage = homePage?.heroImage
    ? urlFor(homePage.heroImage)?.width(2560).height(1440).fit('crop').auto('format').url()
    : settings?.heroImage
      ? urlFor(settings.heroImage)?.width(2560).height(1440).fit('crop').auto('format').url()
      : DEFAULT_HERO_IMAGE;
  const subtitle = homePage?.heroIntro || settings?.heroSubtitle || DEFAULT_HERO_SUBTITLE;
  const eyebrow = homePage?.heroEyebrow || 'Therapy & Counseling, Anchorage, AK';
  const headingLead = homePage?.heroHeadingLead || 'Finding your way';
  const headingPrefix = homePage?.heroHeadingSecondPrefix || 'to';
  const ctaLabel = homePage?.heroButtonLabel || 'Meet our counselors';
  const ctaHref = homePage?.heroButtonLink?.url || '#counselors';

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
          setWordIndex((prev) => (prev + 1) % words.length);
        },
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [words.length]);

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
          style={{ backgroundImage: `url("${heroImage}")` }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#f5f2ed] via-white/70 to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1100px] mx-auto pt-24">
        <div className="gsap-reveal-hero mb-8 text-[#82a396]">
          <AnimatedLogo animation="draw" variant="horizontal" size={160} colorMode="light" />
        </div>

        <p className="gsap-reveal-hero text-[#82a396] text-[10px] tracking-[0.4em] uppercase font-medium mb-6 flex items-center gap-2 font-[var(--font-mono)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#82a396] inline-block" />
          {eyebrow}
        </p>

        <h1 className="flex flex-col text-[#383838] mb-8">
          <span className="gsap-reveal-hero font-[var(--font-heading)] text-[clamp(2rem,8vw,6.5rem)] font-normal tracking-tight leading-[1.05] block">
            {headingLead}
          </span>
          <span className="gsap-reveal-hero font-[var(--font-heading)] text-[clamp(2rem,8vw,6.5rem)] font-normal tracking-tight leading-[1.05] block">
            {headingPrefix} <span className="font-[var(--font-display)] text-[#82a396] italic" style={{ display: 'inline-block' }} ref={wordRef}>{words[wordIndex % words.length]}</span>
          </span>
        </h1>

        <p className="gsap-reveal-hero text-[#a38d7a] font-light text-base lg:text-lg max-w-lg leading-relaxed mb-8">
          {subtitle}
        </p>

        <div className="gsap-reveal-hero mt-8">
          <a href={ctaHref} className="btn-primary uppercase text-[10px] tracking-[0.2em] px-8 py-4">{ctaLabel}</a>
        </div>
      </div>
    </section>
  );
}

//
// ─────────────── SERVICES SECTION ───────────────
//
// Fallback used until Sanity responds (or if no services are published yet).
const DEFAULT_SERVICES = [
  { id: 'd1', title: 'Individual Therapy', desc: 'One-on-one sessions tailored to your unique story.', type: 'wide', image: null },
  { id: 'd2', title: 'Couples Counseling', desc: 'Rebuilding connection together.', type: 'tall', image: null },
  { id: 'd3', title: 'Trauma Recovery', desc: "For experiences that are over, but don't always feel over.", type: 'dark', image: null },
  { id: 'd4', title: 'Workshops', desc: 'Learn, grow, and connect in a group setting.', type: 'light', image: null },
];

function Capabilities({homePage}) {
  const containerRef = useRef(null);
  const [fetchedServices, setFetchedServices] = useState(DEFAULT_SERVICES);
  const intro = homePage?.servicesIntro || {};
  const services = homePage?.services?.length
    ? homePage.services.map((s) => ({ ...s, type: s.layout }))
    : fetchedServices;

  useEffect(() => {
    if (homePage?.services?.length) return;
    let active = true;
    getServices()
      .then((data) => {
        if (active && data?.configured) {
          setFetchedServices((data.items || []).map((s) => ({ ...s, type: s.layout })));
        }
      })
      .catch((err) => console.error('Failed to load services', err));
    return () => { active = false; };
  }, [homePage?.services]);

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
              <span className="w-1.5 h-1.5 rounded-full bg-[#82a396] inline-block" /> {intro.eyebrow || 'Services'}
            </p>
            <h2 className="font-[var(--font-display)] text-[clamp(2.5rem,5vw,4rem)] font-light text-[#383838] leading-[1.05]">
              {intro.heading || 'How we work'}<br/><em className="text-[#82a396] italic">{intro.accent || 'together'}</em>
            </h2>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((s) => {
            const imgUrl = s.image ? urlFor(s.image)?.width(1000).auto('format').url() : null;
            // With a photo, text sits on a dark overlay so it stays legible.
            const onPhoto = Boolean(imgUrl);
            const cardId = s.id || s.title;
            const Card = s.slug ? Link : 'div';
            return (
            <Card
              {...(s.slug ? {to: `/services/${s.slug}`} : {})}
              key={cardId}
              className={`bento-item group relative overflow-hidden rounded-2xl flex flex-col justify-between p-5 md:p-8 transition-transform duration-500 hover:scale-[1.02] ${bentoTypeStyles[s.type]}`}
            >
              {imgUrl && (
                <>
                  <img
                    src={imgUrl}
                    alt={s.image?.decorative ? '' : s.image?.alt || s.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
                </>
              )}
              <div className={`relative flex-1 flex items-center justify-center py-4 ${onPhoto ? 'opacity-0 pointer-events-none' : ''}`}>{logoSlots[s.type]}</div>
              <div className="relative">
                <h3 className={`font-[var(--font-heading)] text-2xl mb-1 ${onPhoto || s.type === 'dark' ? 'text-[#f5f2ed]' : 'text-[#383838]'}`}>{s.title}</h3>
                <p className={`text-sm font-light font-[var(--font-body)] transition-all duration-500 ease-out overflow-hidden opacity-100 max-h-40 md:opacity-0 md:max-h-0 md:group-hover:opacity-100 md:group-hover:max-h-40 ${onPhoto ? 'text-[#f5f2ed]/80' : s.type === 'dark' ? 'text-[#f5f2ed]/60' : 'text-[#a38d7a]'}`}>{s.desc}</p>
              </div>
            </Card>
            );
          })}
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
    answer: "You don't have to be in crisis to benefit from therapy. Therapy can help you understand patterns, manage everyday stress, improve relationships, set boundaries, and build coping skills before problems feel overwhelming. Many people wait because they think they need a diagnosis, a major life event, or a breaking point before reaching out, but support can be helpful long before that. Starting therapy early can make it easier to talk about your feelings, notice burnout, and feel more prepared when life becomes stressful. At akConfluence, therapy is a space for growth, reflection, and support, no crisis required.",
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
        <div className="font-[var(--font-body)] text-[#a38d7a] font-light text-[15px] leading-relaxed pb-6 pr-12">
          {Array.isArray(item.answer) ? <PortableText value={item.answer} /> : item.answer}
        </div>
      </div>
    </div>
  );
}

function FAQ({homePage}) {
  const containerRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [items, setItems] = useState(FAQ_DATA);
  const intro = homePage?.faqIntro || {};
  const faqSubtitle = homePage?.faqSubtitle || 'We know starting therapy can bring up questions. Here are some answers to help you feel more at ease.';
  const faqBottomNote = homePage?.faqBottomNote || 'Still have questions?';
  const faqLinkText = homePage?.faqLinkText || "We're happy to help";
  const faqLinkUrl = homePage?.faqLinkUrl || 'mailto:info@akconfluence.com?subject=Question';

  useEffect(() => {
    let active = true;
    getFaqs()
      .then((data) => { if (active && data?.configured) setItems(data.items || []); })
      .catch((error) => console.error('Failed to load FAQs', error));
    return () => { active = false; };
  }, []);

  const midpoint = Math.ceil(items.length / 2);
  const leftColumn = items.slice(0, midpoint);
  const rightColumn = items.slice(midpoint);

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
            <span className="w-1.5 h-1.5 rounded-full bg-[#82a396] inline-block" /> {intro.eyebrow || 'Common Questions'}
          </p>
          <h2 className="faq-heading font-[var(--font-display)] text-[clamp(2.5rem,5vw,4rem)] font-light text-[#383838] leading-[1.05] mb-6">
            {intro.heading || 'Frequently'} <em className="text-[#82a396] italic">{intro.accent || 'asked'}</em>
          </h2>
          <p className="faq-heading font-[var(--font-body)] text-[#a38d7a] font-light text-lg leading-relaxed">
            {faqSubtitle}
          </p>
        </div>

        {/* Two-column FAQ */}
        <div className="grid md:grid-cols-2 gap-x-16">
          <div className="faq-col">
            {leftColumn.map((item, i) => (
              <FaqItem
                key={item._id || item.question}
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
                  key={item._id || item.question}
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
            {faqBottomNote} <a href={faqLinkUrl} className="text-[#82a396] underline underline-offset-2 hover:text-[#6b8f80] transition-colors">{faqLinkText}</a>
          </p>
        </div>
      </div>
    </section>
  );
}

//
// ─────────────── REVIEWS + FOUNDER NOTE SECTION ───────────────
//
const DEFAULT_ENDORSEMENTS = [
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

function Reviews({homePage}) {
  const containerRef = useRef(null);
  const [endorsements, setEndorsements] = useState(DEFAULT_ENDORSEMENTS);
  const intro = homePage?.endorsementsIntro || {};
  const subtitle = homePage?.endorsementsSubtitle || 'Endorsements from fellow Alaskan providers who refer their patients to our team.';
  const founderLabel = homePage?.founderNoteLabel || 'A Note From Our Founder';
  const founderParagraphs = homePage?.founderNoteParagraphs?.length ? homePage.founderNoteParagraphs : [
    "You’ll notice our reviews are all from fellow healthcare providers, the people who trust us with their patients. We’re honored by that.",
    "You might wonder where the patient reviews are. Most of our new clients come through personal referrals from friends and family, but patient privacy laws mean we can’t ethically share those stories, even with permission.",
    "So if you’d like a patient’s perspective, ask around. Chances are someone in your circle has heard of us, and if not, that just means we have room to grow.",
  ];
  const founderName = homePage?.founderName || 'Elly Sanchez, Founder';

  useEffect(() => {
    let active = true;
    getProviderEndorsements()
      .then((data) => { if (active && data?.configured) setEndorsements((data.items || []).filter((item) => item.featured)); })
      .catch((error) => console.error('Failed to load provider endorsements', error));
    return () => { active = false; };
  }, []);

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
            <span className="w-1.5 h-1.5 rounded-full bg-[#82a396] inline-block" /> {intro.eyebrow || 'Trusted By Providers'}
          </p>
          <h2 className="rv-heading font-[var(--font-display)] text-[clamp(1.8rem,5vw,4rem)] font-light text-[#383838] leading-[1.05] mb-5">
            {intro.heading || 'What providers'} <em className="text-[#82a396] italic">{intro.accent || 'are saying'}</em>
          </h2>
          <p className="rv-heading font-[var(--font-body)] text-[#a38d7a] font-light text-lg leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Two-column: founder note (left, 40%) + reviews (right, 60%) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">

          {/* Founder note — left column */}
          <aside className="rv-col lg:col-span-2 lg:sticky lg:top-28">
            <div className="rounded-2xl bg-white/60 border border-[#82a396]/15 p-7 lg:p-8">
              <p className="text-[#dd9e6f] text-[9px] tracking-[0.4em] uppercase font-medium mb-4 font-[var(--font-mono)]">
                {founderLabel}
              </p>
              <div className="font-[var(--font-body)] text-[#383838] font-light text-[15px] leading-relaxed space-y-4">
                {founderParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <p className="mt-6 font-[var(--font-display)] italic text-[#82a396] text-lg">
                ({founderName})
              </p>
            </div>
          </aside>

          {/* Reviews — right column */}
          <div className="rv-col lg:col-span-3">
            {endorsements.map((r, i) => (
              <div
                key={r.providerName || r.name}
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
                    ({r.providerName || r.name})
                  </p>
                  {(r.credentials || r.title || r.organization) && (
                    <p className="mt-1 text-[#a38d7a] text-[10px] tracking-[0.3em] uppercase font-medium font-[var(--font-mono)]">
                      {[r.credentials, r.organization || r.title].filter(Boolean).join(' · ')}
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
// ─────────────── WHAT THERAPY BANNER ───────────────
//
function WhatTherapyBanner({homePage}) {
  const containerRef = useRef(null);
  const bannerIntro = homePage?.concernsBandIntro || "You do not need the perfect explanation for what's wrong before you come in. Sometimes the first thing we do together is simply figure out:";
  const bannerAccent = homePage?.concernsBandAccent || 'What are we working with?';
  const bannerLabel = homePage?.concernsBandButtonLabel || 'Click me';
  const bannerHref = homePage?.concernsBandButtonLink?.url || '/what-therapy-might-i-need';
  const bannerIsInternal = bannerHref.startsWith('/');

  useGSAP(() => {
    gsap.fromTo('.wti-banner',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
      }
    );
  }, { scope: containerRef });

  const bannerClassName = 'wti-banner group block bg-[#82a396] rounded-3xl px-8 py-12 lg:px-16 lg:py-16 text-center shadow-[0_8px_30px_-12px_rgba(56,56,56,0.18)] transition-transform duration-300 hover:scale-[1.01]';
  const bannerContent = (
    <>
      <p className="font-[var(--font-body)] text-[#f5f2ed] font-light text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
        {bannerIntro}
      </p>
      <p className="mt-6 font-[var(--font-display)] italic text-[#f5f2ed] text-[clamp(1.75rem,4vw,3rem)] leading-tight">
        {bannerAccent}
      </p>
      <span className="mt-8 inline-flex items-center gap-2 bg-white text-[#383838] rounded-full px-7 py-3.5 text-[10px] tracking-[0.2em] uppercase font-medium font-[var(--font-mono)] shadow-sm transition-all duration-300 group-hover:gap-3">
        {bannerLabel} <ArrowRight size={14} weight="bold" />
      </span>
    </>
  );

  return (
    <section ref={containerRef} className="px-6 lg:px-20 pb-16 lg:pb-24 bg-[#f5f2ed]">
      <div className="max-w-[1100px] mx-auto">
        {bannerIsInternal ? (
          <Link to={bannerHref} className={bannerClassName}>{bannerContent}</Link>
        ) : (
          <a href={bannerHref} className={bannerClassName} target="_blank" rel="noopener noreferrer">{bannerContent}</a>
        )}
      </div>
    </section>
  );
}

//
// ─────────────── HOME PAGE ───────────────
//
export default function Home({settings}) {
  const [homePage, setHomePage] = useState(null);

  usePageMetadata(settings?.pageSeo?.home || null, 'AK Confluence | Therapy in Anchorage, Alaska', settings?.defaultSeo?.description);

  useEffect(() => {
    let active = true;
    getHomePage()
      .then((data) => { if (active) setHomePage(data); })
      .catch((err) => console.error('Failed to load homepage sections', err));
    return () => { active = false; };
  }, []);

  return (
    <>
      <Hero homePage={homePage} settings={settings} />
      <Capabilities homePage={homePage} />
      <WhatTherapyBanner homePage={homePage} />
      <CounselorGrid homePage={homePage} />
      <Reviews homePage={homePage} />
      <FAQ homePage={homePage} />
    </>
  );
}
