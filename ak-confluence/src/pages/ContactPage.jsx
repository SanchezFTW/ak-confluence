import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { counselors } from '../data/counselors';

const INTAKE_URL = 'https://elly.clientsecure.me/contact-widget';

// Counselor names for the dropdown (kept in sync with the roster in src/data/counselors.js).
// Founder (Elly) is excluded — she isn't taking new client inquiries through this form.
const COUNSELOR_OPTIONS = counselors.filter((c) => c.role !== 'Founder').map((c) => c.name);

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-white border border-[#82a396]/20 text-[#383838] text-sm font-[var(--font-body)] placeholder:text-[#a38d7a]/50 focus:outline-none focus:border-[#82a396]/60 transition-colors';

export default function ContactPage() {
  const containerRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    counselor: '',
    message: '',
  });

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
    // TODO: wire up delivery to info@akconfluence.com (Web3Forms / Formspree / etc.).
    // Intentionally no network request yet — this is the UI-only stub.
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
            Tell us a little about what you're looking for and we'll be in touch. Sessions are available
            in-person in Anchorage and virtually across Alaska — most private health plans accepted.
          </p>
        </div>
      </section>

      {/* Two-column: form + info panel */}
      <section className="py-14 lg:py-20 px-6 lg:px-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">

          {/* Form */}
          <div className="cp-reveal lg:col-span-3">
            {submitted ? (
              <div className="bg-white rounded-2xl border border-[#82a396]/20 p-8 lg:p-10 text-center">
                <div className="mx-auto mb-5 w-12 h-12 rounded-full bg-[#82a396]/10 flex items-center justify-center text-[#82a396]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h2 className="font-[var(--font-display)] text-2xl font-light text-[#383838] mb-3">Thank you for reaching out</h2>
                <p className="font-[var(--font-body)] text-[#a38d7a] font-light text-sm leading-relaxed max-w-md mx-auto">
                  We've received your note and will be in touch soon. If you'd like to reach us directly in
                  the meantime, email{' '}
                  <a href="mailto:info@akconfluence.com" className="text-[#82a396] underline underline-offset-2 hover:text-[#6b8f80] transition-colors">info@akconfluence.com</a>
                  {' '}or call{' '}
                  <a href="tel:9073134433" className="text-[#82a396] underline underline-offset-2 hover:text-[#6b8f80] transition-colors">907-313-4433</a>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#383838]/5 p-6 lg:p-8 flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="cp-name" className="block font-[var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-[#a38d7a] mb-2">Name</label>
                    <input id="cp-name" type="text" required value={form.name} onChange={update('name')} className={inputClass} placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="cp-email" className="block font-[var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-[#a38d7a] mb-2">Email</label>
                    <input id="cp-email" type="email" required value={form.email} onChange={update('email')} className={inputClass} placeholder="you@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="cp-phone" className="block font-[var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-[#a38d7a] mb-2">Phone <span className="normal-case tracking-normal text-[#a38d7a]/50">(optional)</span></label>
                    <input id="cp-phone" type="tel" value={form.phone} onChange={update('phone')} className={inputClass} placeholder="(907) 000-0000" />
                  </div>
                  <div>
                    <label htmlFor="cp-counselor" className="block font-[var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-[#a38d7a] mb-2">Preferred counselor</label>
                    <select id="cp-counselor" value={form.counselor} onChange={update('counselor')} className={`${inputClass} appearance-none cursor-pointer`}>
                      <option value="">No preference / not sure</option>
                      {COUNSELOR_OPTIONS.map((name) => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="cp-message" className="block font-[var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-[#a38d7a] mb-2">How can we help?</label>
                  <textarea id="cp-message" required rows={5} value={form.message} onChange={update('message')} className={`${inputClass} resize-y`} placeholder="Tell us a little about what brings you here…" />
                </div>

                <button
                  type="submit"
                  className="btn-primary uppercase text-[10px] tracking-[0.2em] px-8 py-4 self-start"
                >
                  Send message
                </button>
                <p className="font-[var(--font-body)] text-[#a38d7a]/50 text-xs font-light leading-relaxed">
                  This form is private. We typically respond within one business day.
                </p>
              </form>
            )}
          </div>

          {/* Info / intake panel */}
          <aside className="cp-reveal lg:col-span-2 flex flex-col gap-6">
            {/* New client intake */}
            <div className="rounded-2xl bg-[#82a396]/5 border border-[#82a396]/20 p-6">
              <h2 className="font-[var(--font-heading)] text-[#383838] text-lg mb-2">New client?</h2>
              <p className="font-[var(--font-body)] text-[#a38d7a] text-sm font-light leading-relaxed mb-4">
                Ready to get started? Complete our secure new client intake to begin — it helps us understand
                your background and match you with the right counselor.
              </p>
              <a
                href={INTAKE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#82a396] text-white text-[10px] tracking-[0.15em] uppercase font-medium px-5 py-3 rounded-full hover:bg-[#6b8f80] active:scale-[0.98] transition-all font-[var(--font-mono)]"
              >
                New Client Intake →
              </a>
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
