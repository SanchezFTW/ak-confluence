import { useEffect } from 'react';

//
// ─────────────── NEWSLETTER SIGNUP (MailerLite embed) ───────────────
//
// Renders the MailerLite embedded form (account 2382319, form UGY1bC).
// The universal script lives in index.html; this re-injects the form-specific
// JSONP script in case MailerLite's initial scan ran before React mounted.
//
// IMPORTANT: only one instance of this component should render per page —
// duplicate `data-form` containers will fight over the same embed.
//
export default function NewsletterSignup({ variant = 'section' }) {
  useEffect(() => {
    const el = document.querySelector('.ml-embedded[data-form="UGY1bC"]');
    if (!el || el.hasChildNodes()) return;
    document.querySelectorAll('script[src*="forms/UGY1bC"]').forEach(s => s.remove());
    const script = document.createElement('script');
    script.src = 'https://assets.mailerlite.com/jsonp/2382319/forms/UGY1bC?callback=ml.fn.renderEmbeddedForm';
    document.head.appendChild(script);
  }, []);

  const dark = variant === 'footer';

  return (
    <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      {/* Text — left */}
      <div className="text-center lg:text-left">
        <p className="text-[9px] tracking-[0.4em] uppercase font-medium mb-4 flex items-center justify-center lg:justify-start gap-2 font-[var(--font-mono)] text-[#82a396]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#82a396] inline-block" /> Free Guide
        </p>
        <h2 className={`font-[var(--font-display)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-light leading-[1.05] mb-4 ${dark ? 'text-[#f5f2ed]' : 'text-[#383838]'}`}>
          Get the free <em className="text-[#82a396] italic">Boundaries Blueprint</em>
        </h2>
        <p className={`font-[var(--font-body)] font-light text-base leading-relaxed ${dark ? 'text-[#f5f2ed]/50' : 'text-[#a38d7a]'}`}>
          A practical guide to setting healthier boundaries. Enter your email and we'll send it straight to your inbox when you sign up for our monthly newsletter.
        </p>
      </div>

      {/* Form — right */}
      <div className="ml-embedded w-full" data-form="UGY1bC"></div>
    </div>
  );
}
