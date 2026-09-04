import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { usePageReveal } from '../lib/usePageReveal';

//
// ─────────────── WHAT THERAPY MIGHT I NEED ───────────────
// Helps potential clients recognize why they might want therapy, and points
// them toward the counselors whose filters match. Copy supplied by the client.
//

const QUOTES = [
  "I should be able to handle this, but I can't.",
  "I know something needs to change.",
  "I don't know where to start.",
  "We keep doing this over and over.",
  "On paper my life is fine, so why don't I feel fine?",
  "I know what I should do. I just don't seem to do it.",
];

const THERAPY_BOXES = [
  {
    title: 'Anxiety',
    quote: 'My brain will not shut off.',
    body: 'Maybe you replay conversations, think ten steps ahead, assume something is about to go wrong, or spend a ridiculous amount of energy preparing for things that may never happen. You may look completely capable from the outside while your mind is running nonstop on the inside.',
    help: 'We help you catch the spiral earlier, and give your brain something else to do instead of running the worst case on a loop.',
    filter: 'Anxiety',
  },
  {
    title: 'Depression',
    quote: "I don't feel like myself.",
    body: 'Things that used to feel easy take more effort. You may be working, parenting and showing up while still feeling disconnected, flat, irritated, exhausted, or like everything is harder than it should be.',
    help: "We start with something small enough to actually do, and build from there — until getting through the day doesn't take everything you've got.",
    filter: 'Depression',
  },
  {
    title: 'Relationships & Family',
    quote: "I don't know how to deal with this person anymore.",
    body: "Maybe you love them and they drive you absolutely nuts. Maybe you keep explaining yourself and still don't feel understood. Maybe you want to stay connected without losing yourself in the process.",
    help: "We help you say what you mean without it turning into the same fight, and figure out what you're actually willing to put up with.",
    filter: 'Relationship & Family',
  },
  {
    title: 'Couples Counseling',
    quote: 'We keep having the same fight.',
    body: 'The subject changes, but somehow you end up in the same place. Someone gets louder, someone shuts down, someone feels criticized, someone feels ignored — and both of you leave wondering how you got there again.',
    help: "We slow it down enough that you can both catch it while it's happening, not just after — so it stops running on autopilot.",
    filter: null,
  },
  {
    title: 'Major Life Changes',
    quote: "Everything changed and I don't know what I'm doing now.",
    body: "A new job. A breakup. Marriage. Divorce. A baby. A move. A career shift. A loss. A version of your life ending before you've figured out what comes next. Even good change can throw you off.",
    help: "We help you get your footing back, and figure out what you actually want now — not just what you thought you'd want.",
    filter: 'Major Life Changes',
  },
  {
    title: 'Grief & Loss',
    quote: "I thought I'd be handling this better by now.",
    body: "Grief doesn't care about your schedule. Sometimes it's obvious. Sometimes it shows up as numbness, irritation, anxiety, exhaustion or the strange feeling that everyone else has gone back to normal except you.",
    help: "You don't have to be handling it better by now, and you don't have to sit with it alone.",
    filter: 'Grief & Loss',
  },
  {
    title: 'Trauma Recovery',
    quote: 'Something that happened to me is still affecting me.',
    body: 'You may understand intellectually that something is over while your mind or body seems unconvinced. Certain situations, memories, people or reactions can pull you right back into something you thought you had already handled.',
    help: 'So your body eventually catches up to what your mind already knows, and stops hijacking you out of nowhere.',
    filter: null,
  },
  {
    title: 'EMDR & Brainspotting',
    quote: "I understand why I react this way. Understanding it just hasn't made it stop.",
    body: "Sometimes insight gets you part of the way there, but the reaction is still happening. Some of our clinicians use EMDR and Brainspotting when those approaches fit the person and the work.",
    help: 'You do not need to know whether you need either approach before you come in. We can help you figure that out.',
    filter: 'EMDR & Brainspotting',
  },
  {
    title: 'Individual Therapy',
    quote: 'I need to figure some stuff out.',
    body: "That's enough of a reason. You may be dealing with one specific problem or ten things that somehow became tangled together.",
    help: "That gives us room to slow down, actually look at what's going on, and figure out what to do about it — instead of just thinking about it on a loop.",
    filter: null,
  },
];

function counselorsLink(filter) {
  return filter
    ? `/?filter=${encodeURIComponent(filter)}#counselors`
    : '/#counselors';
}

export default function WhatTherapyPage() {
  const revealRef = usePageReveal();

  return (
    <div ref={revealRef} className="min-h-screen bg-[#f5f2ed]">
      {/* Hero */}
      <section className="pt-28 pb-14 lg:pt-36 lg:pb-20 px-6 lg:px-20 bg-[#e8e4dc]">
        <div className="max-w-[1100px] mx-auto">
          <Link
            to="/#counselors"
            className="reveal-up inline-flex items-center gap-2 text-[#82a396] text-[11px] tracking-[0.2em] uppercase font-medium font-[var(--font-mono)] mb-10 hover:text-[#6b8f80] transition-colors"
          >
            <ArrowLeft size={14} weight="bold" /> Back to counselors
          </Link>

          <h1 className="reveal-up font-[var(--font-display)] text-[clamp(2rem,5.5vw,4.5rem)] font-light text-[#383838] leading-[1.05] mb-8 max-w-3xl">
            What therapy <em className="text-[#82a396] italic">might I need</em>
          </h1>

          <p className="reveal-up font-[var(--font-body)] text-[#a38d7a] font-light text-base lg:text-lg leading-relaxed max-w-2xl mb-4">
            You've been thinking about it. Talking yourself out of it. Trying to fix it on your own.
          </p>
          <p className="reveal-up font-[var(--font-display)] italic text-[#383838] text-xl lg:text-2xl">
            And now you're tired.
          </p>
        </div>
      </section>

      {/* Quotes + callout */}
      <section className="py-16 lg:py-24 px-6 lg:px-20 bg-[#f5f2ed]">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {QUOTES.map((quote) => (
              <div
                key={quote}
                className="reveal-up bg-white border border-[#82a396]/15 rounded-2xl p-6 lg:p-8"
              >
                <p className="font-[var(--font-display)] italic text-[#383838] text-lg leading-relaxed">
                  &ldquo;{quote}&rdquo;
                </p>
              </div>
            ))}
          </div>

          <p className="reveal-up mt-14 font-[var(--font-body)] text-[#a38d7a] font-light text-lg leading-relaxed max-w-2xl">
            You do not need the perfect explanation for what's wrong before you come in. Sometimes the first thing we do together is simply figure out:
          </p>

          <div className="reveal-up mt-8 bg-[#82a396] rounded-3xl px-8 py-12 lg:px-16 lg:py-16 text-center">
            <p className="font-[var(--font-display)] italic text-[#f5f2ed] text-[clamp(1.75rem,4vw,3rem)] leading-tight">
              What are we working with?
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 px-6 lg:px-20 bg-[#e8e4dc]">
        <div className="max-w-[1100px] mx-auto text-center">
          <h2 className="reveal-up font-[var(--font-display)] text-[clamp(1.75rem,4vw,2.75rem)] font-light text-[#383838] leading-[1.05] mb-3">
            Seeing yourself somewhere in this page?
          </h2>
          <p className="reveal-up font-[var(--font-body)] text-[#a38d7a] font-light text-base lg:text-lg mb-8">
            That's enough information to take the next step.
          </p>
          <a
            href="/#counselors"
            className="reveal-up btn-primary uppercase text-[10px] tracking-[0.2em] px-8 py-4 inline-flex items-center gap-2"
          >
            See counselors <ArrowRight size={14} weight="bold" />
          </a>
        </div>
      </section>

      {/* What therapy with us is actually like */}
      <section className="py-16 lg:py-24 px-6 lg:px-20 bg-[#f5f2ed]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <p className="reveal-up text-[#82a396] text-[9px] tracking-[0.4em] uppercase font-medium mb-6 flex items-center gap-2 font-[var(--font-mono)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#82a396] inline-block" /> What therapy with us is actually like
            </p>
            <h2 className="reveal-up font-[var(--font-display)] text-[clamp(2rem,4.5vw,3.5rem)] font-light text-[#383838] leading-[1.05] mb-8">
              Warm and human.<br /><em className="text-[#82a396] italic">Not passive.</em>
            </h2>
            <div className="reveal-up font-[var(--font-body)] text-[#a38d7a] font-light text-base leading-relaxed space-y-4">
              <p>
                We take our work seriously. We just don't believe therapy has to feel stiff, mysterious, or like you suddenly became a hospital patient because you walked through the door.
              </p>
              <p>
                Our therapists are highly trained and thoughtful about what they do. They're also real people.
              </p>
              <p>
                You can expect us to listen carefully, ask good questions, explain what we're seeing, and work with you rather than simply telling you what to do.
              </p>
              <p className="text-[#383838]">
                And when something needs to be said, we'll say it. <span className="text-[#82a396]">Kindly. Respectfully. Clearly.</span>
              </p>
            </div>
          </div>

          <div>
            <div className="reveal-up bg-white border border-[#82a396]/15 rounded-3xl p-8 lg:p-10 space-y-6">
              <p className="font-[var(--font-display)] italic text-[#383838] text-lg leading-relaxed">
                &ldquo;Sometimes support sounds like: &lsquo;That makes complete sense.&rsquo;&rdquo;
              </p>
              <p className="font-[var(--font-display)] italic text-[#383838] text-lg leading-relaxed">
                &ldquo;And sometimes support sounds like: &lsquo;Okay — but you told me you wanted this to change. Are we doing something different, or are we doing the same thing and hoping for a different result?&rsquo;&rdquo;
              </p>
            </div>
            <p className="reveal-up mt-8 font-[var(--font-body)] text-[#a38d7a] font-light text-base leading-relaxed">
              Think of it as having a very knowledgeable, grounded person in your corner — someone who has your back, understands the work, and is willing to help you stay focused on the changes you said matter to you.
            </p>
          </div>
        </div>
      </section>

      {/* Therapy boxes */}
      <section className="py-16 lg:py-24 px-6 lg:px-20 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <p className="reveal-up text-[#82a396] text-[9px] tracking-[0.4em] uppercase font-medium mb-6 flex items-center gap-2 font-[var(--font-mono)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#82a396] inline-block" /> What we work with
          </p>
          <h2 className="reveal-up font-[var(--font-display)] text-[clamp(2rem,4.5vw,3.5rem)] font-light text-[#383838] leading-[1.05] mb-12 max-w-2xl">
            Find the words <em className="text-[#82a396] italic">that fit</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {THERAPY_BOXES.map((box) => (
              <Link
                key={box.title}
                to={counselorsLink(box.filter)}
                className="reveal-up group flex flex-col bg-[#f5f2ed] border border-[#82a396]/15 rounded-2xl p-6 lg:p-7 hover:border-[#82a396]/40 hover:shadow-[0_4px_24px_-8px_rgba(130,163,150,0.18)] transition-all duration-300"
              >
                <h3 className="font-[var(--font-heading)] text-[#383838] text-xl mb-1">{box.title}</h3>
                <p className="font-[var(--font-display)] italic text-[#82a396] text-base mb-4">
                  &ldquo;{box.quote}&rdquo;
                </p>
                <p className="font-[var(--font-body)] text-[#a38d7a] text-sm font-light leading-relaxed">
                  {box.body}
                </p>
                <p className="mt-4 font-[var(--font-body)] text-[#383838] text-sm font-light leading-relaxed">
                  {box.help}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 font-[var(--font-body)] text-[#82a396] text-xs font-medium transition-all duration-300 group-hover:gap-2.5">
                  See counselors <ArrowRight size={14} weight="bold" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
