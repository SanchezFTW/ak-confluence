import { useEffect } from 'react';

//
// ─────────────── FOOTER BLUEPRINT SIGNUP (MailerLite embed) ───────────────
//
// Renders the MailerLite embedded form for the Free Boundaries Blueprint (form P5BeST).
// The universal script lives in index.html; this re-injects the form-specific
// JSONP script in case MailerLite's initial scan ran before React mounted.
//
export default function NewsletterSignup() {
  useEffect(() => {
    const el = document.querySelector('.ml-embedded[data-form="193826477630817348"]');
    if (!el || el.hasChildNodes()) return;
    document.querySelectorAll('script[src*="forms/193826477630817348"]').forEach(s => s.remove());
    const script = document.createElement('script');
    script.src = 'https://assets.mailerlite.com/jsonp/2382319/forms/193826477630817348?callback=ml.fn.renderEmbeddedForm';
    document.head.appendChild(script);
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
      <div className="lg:order-1 text-center lg:text-left">
        <p className="font-[var(--font-mono)] text-[10px] tracking-[0.25em] uppercase text-[#82a396] mb-3">
          Free Lead Magnet Guide
        </p>
        <h2 className="font-[var(--font-display)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-light leading-[1.05] mb-4 text-[#f5f2ed]">
          Get your free <em className="italic text-[#82a396]">Boundaries Blueprint</em>
        </h2>
        <p className="font-[var(--font-body)] font-light text-base leading-relaxed mb-6 lg:mb-0 text-[#f5f2ed]/70">
          A practical guide to setting limits calmly and confidently, written by our therapists in Anchorage. Enter your email below to get instant access.
        </p>
      </div>
      <div className="lg:order-2">
        <div className="ml-embedded ml-embedded-pill w-full" data-form="193826477630817348"></div>
      </div>
    </div>
  );
}

