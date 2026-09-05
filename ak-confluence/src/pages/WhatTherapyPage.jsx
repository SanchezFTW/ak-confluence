import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { usePageReveal } from '../lib/usePageReveal';

//
// ─────────────── WHAT THERAPY MIGHT I NEED ───────────────
// Points visitors to the counselors whose specialties match what they're
// experiencing. Copy supplied by the client.
//

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
      {/* Minimal header */}
      <section className="pt-28 pb-10 lg:pt-36 lg:pb-14 px-6 lg:px-20 bg-[#e8e4dc]">
        <div className="max-w-[1100px] mx-auto">
          <Link
            to="/#counselors"
            className="reveal-up inline-flex items-center gap-2 text-[#82a396] text-[11px] tracking-[0.2em] uppercase font-medium font-[var(--font-mono)] mb-6 hover:text-[#6b8f80] transition-colors"
          >
            <ArrowLeft size={14} weight="bold" /> Back to counselors
          </Link>

          <h1 className="reveal-up font-[var(--font-display)] text-[clamp(1.75rem,4.5vw,3.25rem)] font-light text-[#383838] leading-[1.05]">
            What therapy <em className="text-[#82a396] italic">might I need</em>
          </h1>
        </div>
      </section>

      {/* Find the words that fit */}
      <section className="py-14 lg:py-20 px-6 lg:px-20 bg-white">
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
