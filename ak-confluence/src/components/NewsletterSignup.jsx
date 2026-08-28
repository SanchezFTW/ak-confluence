import { useEffect, useRef } from 'react';

export default function NewsletterSignup() {
  const formContainerRef = useRef(null);

  useEffect(() => {
    const initialiseMailerLite = () => {
      if (!formContainerRef.current) return;

      formContainerRef.current.innerHTML =
        '<div class="ml-embedded" data-form="P5BeST"></div>';

      if (typeof window.ml === 'function') {
        window.ml('account', '2382319');
      }
    };

    const existingScript = document.getElementById('mailerlite-universal-js');

    if (existingScript) {
      initialiseMailerLite();
      return;
    }

    window.ml = window.ml || function (...args) {
      (window.ml.q = window.ml.q || []).push(args);
    };

    window.ml('account', '2382319');

    const script = document.createElement('script');
    script.id = 'mailerlite-universal-js';
    script.async = true;
    script.src = 'https://assets.mailerlite.com/js/universal.js';

    script.onload = initialiseMailerLite;

    document.head.appendChild(script);
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      <div className="lg:order-1 text-center lg:text-left">
        <h2 className="font-[var(--font-display)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-light leading-[1.05] mb-4 text-[#f5f2ed]">
          Get your free{' '}
          <em className="italic text-[#82a396]">Boundaries Blueprint</em>
        </h2>

        <p className="font-[var(--font-body)] font-light text-base leading-relaxed mb-6 lg:mb-0 text-[#f5f2ed]/70">
          A practical guide to setting limits calmly and confidently, written by
          our therapists in Anchorage. Enter your email below to get instant
          access.
        </p>
      </div>

      <div className="lg:order-2 flex justify-center lg:justify-end">
        <div
          ref={formContainerRef}
          className="max-w-md w-full"
        />
      </div>
    </div>
  );
}
