import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const INTAKE_URL = 'https://elly.clientsecure.me/contact-widget';

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-white border border-[#82a396]/20 text-[#383838] text-sm font-[var(--font-body)] placeholder:text-[#a38d7a]/50 focus:outline-none focus:border-[#82a396]/60 transition-colors';

export default function ContactPage() {
  const containerRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useGSAP(() => {
    gsap.fromTo('.cp-reveal',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, stagger: 0.08, ease: 'power3.out' }
    );
  }, { scope: containerRef });

  function update(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = 'Question for AK Confluence';
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:info@akconfluence.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#f5f2ed]">
      {/* Hero */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 px-6 lg:px-20 bg-[#e8e4dc]">
        <div className="max-w-4xl mx-auto">
          <p className="cp-reveal text-[#82a396] text-[9px] tracking-[0.4em] uppercase font-medium mb-6 flex items-center gap-2 font-[var(--font-mono)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#82a396] inline-block" /> Get in Touch
          </p>
          <h1 className="cp-reveal font-[var(--font-display)] text-[clamp(1.8rem,5vw,4.5rem)] font-light text-[#383838] leading-[1.05] mb-6">
            The first step is simply <em className="text-[#82a396] italic">reaching out</em>
          </h1>
          <p className="cp-reveal font-[var(--font-body)] text-[#a38d7a] font-light text-base lg:text-lg leading-relaxed max-w-2xl">
            Sessions are available in-person in Anchorage and virtually across Alaska, most private health plans accepted.
          </p>
        </div>
      </section>

      {/* Two-column: intake (primary) + question form (secondary) */}
      <section className="py-14 lg:py-20 px-6 lg:px-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">

          {/* New client intake — primary */}
          <div className="cp-reveal lg:col-span-3">
            <div className="rounded-2xl bg-[#82a396]/8 border border-[#82a396]/25 p-8 lg:p-12 flex flex-col h-full min-h-[420px]">
              <div className="flex-1">
                <p className="font-[var(--font-mono)] text-[10px] tracking-[0.3em] uppercase text-[#82a396] mb-6">New client</p>
                <h2 className="font-[var(--font-display)] text-[clamp(1.8rem,3.5vw,2.8rem)] font-light text-[#383838] leading-[1.1] mb-5">
                  Ready to <em className="italic text-[#82a396]">get started?</em>
                </h2>
                <p className="font-[var(--font-body)] text-[#a38d7a] font-light text-base leading-relaxed mb-8 max-w-md">
                  Complete our secure new client intake to begin. It helps us understand your background
                  and match you with the right counselor.
                </p>
              </div>
              <div className="flex flex-col gap-3 items-start">
                <a
                  href={INTAKE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#82a396] text-white text-[11px] tracking-[0.2em] uppercase font-medium px-8 py-4 rounded-full hover:bg-[#6b8f80] active:scale-[0.98] transition-all font-[var(--font-mono)]"
                >
                  New Client Intake →
                </a>
                <p className="font-[var(--font-body)] text-[#a38d7a]/60 text-xs font-light">
                  Secure &amp; private, takes about 10 minutes
                </p>
              </div>
            </div>
          </div>

          {/* Right column — question form + contact info */}
          <aside className="cp-reveal lg:col-span-2 flex flex-col gap-6">

            {/* Send a question */}
            <div className="rounded-2xl bg-white/70 border border-[#383838]/5 p-6">
              <h3 className="font-[var(--font-heading)] text-[#383838] text-base mb-1">Have a question first?</h3>
              <p className="font-[var(--font-body)] text-[#a38d7a] text-xs font-light leading-relaxed mb-4">
                Send us a message and we'll get back to you within one business day.
              </p>
              {submitted ? (
                <div className="text-center py-4">
                  <div className="mx-auto mb-3 w-10 h-10 rounded-full bg-[#82a396]/10 flex items-center justify-center text-[#82a396]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <p className="font-[var(--font-body)] text-[#a38d7a] text-sm font-light">
                    Your email app should have opened — just hit send and we'll be in touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="cp-name" className="block font-[var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-[#a38d7a] mb-1.5">Name</label>
                    <input id="cp-name" type="text" required value={form.name} onChange={update('name')} className={inputClass} placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="cp-email" className="block font-[var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-[#a38d7a] mb-1.5">Email</label>
                    <input id="cp-email" type="email" required value={form.email} onChange={update('email')} className={inputClass} placeholder="you@example.com" />
                  </div>
                  <div>
                    <label htmlFor="cp-message" className="block font-[var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-[#a38d7a] mb-1.5">Question</label>
                    <textarea id="cp-message" required rows={4} value={form.message} onChange={update('message')} className={`${inputClass} resize-y`} placeholder="What would you like to know?" />
                  </div>
                  <button type="submit" className="btn-primary uppercase text-[10px] tracking-[0.2em] px-6 py-3 self-start">
                    Send message
                  </button>
                </form>
              )}
            </div>

            {/* Contact details */}
            <div className="rounded-2xl bg-white/60 border border-[#383838]/5 p-6 flex flex-col gap-5">
              <div>
                <h3 className="font-[var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-[#82a396] mb-2">Contact</h3>
                <div className="flex flex-col gap-1 font-[var(--font-body)] text-[#383838] text-sm">
                  <a href="mailto:info@akconfluence.com" className="hover:text-[#82a396] transition-colors">info@akconfluence.com</a>
                  <a href="tel:9073134433" className="hover:text-[#82a396] transition-colors">907-313-4433</a>
                </div>
              </div>
              <div>
                <h3 className="font-[var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-[#82a396] mb-2">Hours</h3>
                <div className="flex flex-col gap-1 font-[var(--font-body)] text-[#a38d7a] text-sm font-light">
                  <span>Mon–Fri: 7am–7pm</span>
                  <span>Sat: 8am–3pm</span>
                </div>
              </div>
              <div>
                <h3 className="font-[var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-[#82a396] mb-2">Location</h3>
                <div className="flex flex-col gap-1 font-[var(--font-body)] text-[#a38d7a] text-sm font-light">
                  <span>Anchorage, Alaska</span>
                  <span>Virtual across AK</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
