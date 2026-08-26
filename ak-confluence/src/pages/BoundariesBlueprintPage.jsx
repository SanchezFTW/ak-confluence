import { useState, useEffect } from 'react';
import { SquaresFour, ChatCircleDots, NotePencil, CheckCircle } from '@phosphor-icons/react';
import { usePageReveal } from '../lib/usePageReveal';

const POINTS = [
  {
    icon: SquaresFour,
    title: 'The three kinds of boundaries',
    body: 'Physical, emotional, and mental boundaries, and how to tell which one you actually need.',
  },
  {
    icon: ChatCircleDots,
    title: "Scripts that don't sound like a fight",
    body: 'A simple structure for stating a limit calmly, plus example phrasing you can borrow word for word.',
  },
  {
    icon: NotePencil,
    title: 'A worksheet to build your own',
    body: "Guided prompts to work through one relationship where you've felt stretched thin, and write the boundary out.",
  },
];

export default function BoundariesBlueprintPage() {
  const revealRef = usePageReveal();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('fields[email]', email);
      formData.append('ml-submit', '1');
      formData.append('anticsrf', 'true');
      fetch('https://assets.mailerlite.com/jsonp/2382319/forms/193826477630817348/subscribe', {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div ref={revealRef} className="min-h-screen bg-[#f5f2ed]">
      {/* Hero */}
      <section className="pt-32 pb-14 lg:pt-40 lg:pb-20 px-6 lg:px-20 bg-[#e8e4dc]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="reveal-up text-[#82a396] text-[9px] tracking-[0.4em] uppercase font-medium mb-6 flex items-center justify-center gap-2 font-[var(--font-mono)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#82a396] inline-block" /> Free Guide
          </p>
          <h1 className="reveal-up font-[var(--font-display)] text-[clamp(2rem,5.5vw,4.5rem)] font-light text-[#383838] leading-[1.05] mb-6">
            The <em className="text-[#82a396] italic">Boundaries Blueprint</em>
          </h1>
          <p className="reveal-up font-[var(--font-body)] text-[#a38d7a] font-light text-base lg:text-lg leading-relaxed max-w-xl mx-auto">
            A short guide to setting boundaries that actually hold, written by our therapists in Anchorage. Enter your email below and it's yours, free.
          </p>
        </div>
      </section>

      {/* What's inside */}
      <section className="py-16 lg:py-20 px-6 lg:px-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-10">
          {POINTS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="reveal-up text-center sm:text-left">
              <div className="w-11 h-11 rounded-full bg-[#82a396]/10 flex items-center justify-center text-[#82a396] mx-auto sm:mx-0 mb-4">
                <Icon size={20} weight="light" />
              </div>
              <h3 className="font-[var(--font-heading)] text-[#383838] text-lg mb-2">{title}</h3>
              <p className="font-[var(--font-body)] text-[#a38d7a] text-sm font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Signup form */}
      <section className="reveal-up py-16 lg:py-20 px-6 lg:px-20 bg-[#383838]">
        <div className="max-w-md mx-auto text-center flex flex-col items-center">
          <h2 className="font-[var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-light text-[#f5f2ed] leading-[1.1] mb-3">
            Get your free copy
          </h2>
          <p className="font-[var(--font-body)] text-[#f5f2ed]/50 text-sm font-light leading-relaxed mb-8">
            We'll send the guide straight to your inbox, along with our monthly newsletter. Unsubscribe anytime.
          </p>
          
          {submitted ? (
            <div className="flex items-center justify-center gap-3 bg-[#82a396]/20 border border-[#82a396]/40 rounded-full px-6 py-4 text-[#f5f2ed] w-full animate-fadeUp">
              <CheckCircle size={22} weight="fill" className="text-[#82a396] flex-shrink-0" />
              <span className="font-[var(--font-body)] text-sm font-light">
                Your Boundaries Blueprint is on its way to your inbox!
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-[#f5f2ed]/10 border border-white/15 rounded-2xl sm:rounded-full p-2 sm:p-1.5 sm:pl-5 w-full focus-within:border-[#82a396] transition-colors text-left"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                required
                className="w-full bg-transparent border-none text-[#f5f2ed] placeholder-[#f5f2ed]/50 text-sm font-[var(--font-body)] px-3 py-2 sm:p-0 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#82a396] text-white text-xs font-medium font-[var(--font-body)] px-6 py-3 rounded-full hover:bg-[#6b8f80] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Get Guide'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

