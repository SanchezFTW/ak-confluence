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
export default function NewsletterSignup() {
  useEffect(() => {
    const el = document.querySelector('.ml-embedded[data-form="UGY1bC"]');
    if (!el || el.hasChildNodes()) return;
    document.querySelectorAll('script[src*="forms/UGY1bC"]').forEach(s => s.remove());
    const script = document.createElement('script');
    script.src = 'https://assets.mailerlite.com/jsonp/2382319/forms/UGY1bC?callback=ml.fn.renderEmbeddedForm';
    document.head.appendChild(script);
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
      <div className="lg:order-1 text-center lg:text-left">
        <h2 className="font-[var(--font-display)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-light leading-[1.05] mb-4 text-[#f5f2ed]">
          Sign up for our email newsletter
        </h2>
        <p className="font-[var(--font-body)] font-light text-base leading-relaxed mb-6 lg:mb-0 text-[#f5f2ed]/50">
          Notes from our therapists on boundaries and anxiety. One email a month, nothing more.
        </p>
      </div>
      <div className="lg:order-2">
        <div className="ml-embedded ml-embedded-pill w-full" data-form="UGY1bC"></div>
      </div>
    </div>
  );
}
