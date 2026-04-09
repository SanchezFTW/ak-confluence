import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/*
  ─────────────────────────────────────────────────────────
  FORMS PAGE — JotForm Integration
  ─────────────────────────────────────────────────────────

  HOW TO ADD YOUR JOTFORM FORMS:

  1. In JotForm, open the form you want to embed.
  2. Click "Publish" → "Embed" → copy the form ID from the URL.
     (e.g., if the URL is https://form.jotform.com/241234567890 → the ID is "241234567890")
  3. Replace the `jotformId` value below with your real form ID.
  4. That's it — the form will embed directly on the page.

  Each form entry in the FORMS array below controls one card on the page.
  ─────────────────────────────────────────────────────────
*/

const FORMS = [
  {
    id: 'intake',
    title: 'New Client Intake',
    description: 'For first-time clients. This helps us understand your background, what brings you to therapy, and how we can best support you.',
    timing: 'Complete before your first session',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    // ← Replace with your real JotForm form ID
    jotformId: null,
  },
  {
    id: 'consent',
    title: 'Informed Consent',
    description: 'Reviews your rights as a client, confidentiality policies, and what to expect from the therapeutic relationship.',
    timing: 'Required before starting therapy',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    jotformId: null,
  },
  {
    id: 'screening',
    title: 'Screening Questionnaire',
    description: 'A brief set of questions to help us match you with the right counselor based on your needs and preferences.',
    timing: 'Optional — helps us find your best fit',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    jotformId: null,
  },
];

export default function FormsPage() {
  const containerRef = useRef(null);
  const [activeForm, setActiveForm] = useState(null);
  const formSectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.fp-heading',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out' }
    );
    gsap.fromTo('.fp-card',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.3 }
    );
  }, { scope: containerRef });

  function handleSelectForm(formId) {
    setActiveForm(activeForm === formId ? null : formId);
    // Scroll to the embedded form after a short delay
    if (activeForm !== formId) {
      setTimeout(() => {
        formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

  const selectedForm = FORMS.find(f => f.id === activeForm);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#f5f2ed]">
      {/* Page Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 px-6 lg:px-20 bg-[#e8e4dc]">
        <div className="max-w-4xl mx-auto">
          <p className="fp-heading text-[#82a396] text-[9px] tracking-[0.4em] uppercase font-medium mb-6 flex items-center gap-2 font-[var(--font-mono)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#82a396] inline-block" /> Client Forms
          </p>
          <h1 className="fp-heading font-[var(--font-display)] text-[clamp(2.5rem,5vw,4.5rem)] font-light text-[#383838] leading-[1.05] mb-6">
            Paperwork, <em className="text-[#82a396] italic">simplified</em>
          </h1>
          <p className="fp-heading font-[var(--font-body)] text-[#a38d7a] font-light text-lg leading-relaxed max-w-2xl">
            Complete your forms here at your own pace — from your couch, your car, wherever you're most comfortable. Everything is secure and confidential.
          </p>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-8 px-6 lg:px-20 bg-[#f5f2ed] border-b border-[#383838]/5">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-8 text-[#a38d7a]/50 text-[10px] tracking-[0.15em] uppercase font-[var(--font-mono)]">
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Encrypted & Secure
          </span>
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            HIPAA Compliant
          </span>
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Private & Confidential
          </span>
        </div>
      </section>

      {/* Form Selection Cards */}
      <section className="py-16 lg:py-24 px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Step indicator */}
          <div className="mb-10">
            <p className="font-[var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-[#a38d7a]/60 mb-2">
              {activeForm ? 'Step 2 — Complete the form below' : 'Step 1 — Choose a form to get started'}
            </p>
            <div className="w-full h-0.5 bg-[#383838]/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#82a396] rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ width: activeForm ? '100%' : '0%' }}
              />
            </div>
          </div>

          {/* Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            {FORMS.map((form) => {
              const isActive = activeForm === form.id;
              const hasForm = form.jotformId !== null;

              return (
                <button
                  key={form.id}
                  onClick={() => hasForm ? handleSelectForm(form.id) : null}
                  className={`fp-card text-left rounded-2xl p-6 border transition-all duration-500 ${
                    isActive
                      ? 'bg-[#82a396]/5 border-[#82a396]/30 shadow-lg shadow-[#82a396]/5'
                      : hasForm
                        ? 'bg-white/60 border-[#383838]/5 hover:border-[#82a396]/20 hover:shadow-md hover:shadow-[#82a396]/5 cursor-pointer'
                        : 'bg-white/30 border-[#383838]/5 opacity-50 cursor-default'
                  }`}
                >
                  <div className={`mb-4 transition-colors ${isActive ? 'text-[#82a396]' : 'text-[#a38d7a]/40'}`}>
                    {form.icon}
                  </div>
                  <h3 className="font-[var(--font-heading)] text-[#383838] text-lg mb-2">{form.title}</h3>
                  <p className="font-[var(--font-body)] text-[#a38d7a] text-sm font-light leading-relaxed mb-3">
                    {form.description}
                  </p>
                  <span className="inline-block text-[9px] tracking-[0.15em] uppercase font-medium font-[var(--font-mono)] text-[#82a396] bg-[#82a396]/10 px-2.5 py-1 rounded-full">
                    {form.timing}
                  </span>

                  {!hasForm && (
                    <p className="mt-3 text-[10px] tracking-[0.1em] uppercase font-[var(--font-mono)] text-[#a38d7a]/40">
                      Coming soon
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          {/* Embedded JotForm */}
          {activeForm && selectedForm && (
            <div ref={formSectionRef} className="mt-12 scroll-mt-28">
              {selectedForm.jotformId ? (
                <div className="bg-white rounded-2xl border border-[#383838]/5 overflow-hidden shadow-lg shadow-[#383838]/5">
                  {/* Form header */}
                  <div className="px-6 py-4 border-b border-[#383838]/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-[#82a396]">{selectedForm.icon}</div>
                      <div>
                        <p className="font-[var(--font-heading)] text-[#383838] text-sm">{selectedForm.title}</p>
                        <p className="text-[#a38d7a]/60 text-xs font-[var(--font-body)] font-light">Take your time — your progress is saved automatically</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveForm(null)}
                      className="w-7 h-7 flex items-center justify-center rounded-full text-[#a38d7a] hover:text-[#383838] cursor-pointer bg-[#f5f2ed] border-none transition-colors text-lg leading-none flex-shrink-0"
                      aria-label="Close form"
                    >
                      &times;
                    </button>
                  </div>

                  {/* JotForm iframe */}
                  <iframe
                    title={selectedForm.title}
                    src={`https://form.jotform.com/${selectedForm.jotformId}`}
                    style={{
                      width: '100%',
                      minHeight: '700px',
                      border: 'none',
                    }}
                    allow="geolocation; camera"
                  />
                </div>
              ) : (
                <div className="bg-white/60 rounded-2xl border border-[#383838]/5 p-12 text-center">
                  <p className="text-[#a38d7a] font-[var(--font-body)] font-light">
                    This form is being set up. Check back soon or <a href="mailto:hello@akconfluence.com?subject=Forms" className="text-[#82a396] underline underline-offset-2 hover:text-[#6b8f80] transition-colors">contact us</a> if you need it right away.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Help note */}
          <div className="mt-14 text-center">
            <p className="text-[#a38d7a]/60 text-sm font-light font-[var(--font-body)] max-w-lg mx-auto leading-relaxed">
              Having trouble with a form? <a href="mailto:hello@akconfluence.com?subject=Help with Forms" className="text-[#82a396] underline underline-offset-2 hover:text-[#6b8f80] transition-colors">We're here to help</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
