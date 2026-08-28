import { useEffect, useState } from 'react';
import { CheckCircle } from '@phosphor-icons/react';

export default function NewsletterSignup() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.ml = window.ml || function (...args) {
      (window.ml.q = window.ml.q || []).push(args);
    };

    window.ml('account', '2382319');

    if (!document.getElementById('mailerlite-universal-js')) {
      const script = document.createElement('script');
      script.id = 'mailerlite-universal-js';
      script.async = true;
      script.src = 'https://assets.mailerlite.com/js/universal.js';
      document.head.appendChild(script);
    }

    const checkForSuccess = () => {
      const successMessage = document.querySelector(
        '.ml-form-successBody, .ml-form-successContent, .ml-form-success'
      );

      if (successMessage) {
        setSubmitted(true);
      }
    };

    const observer = new MutationObserver(checkForSuccess);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
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
        {submitted ? (
          <div className="flex items-center gap-3 bg-[#82a396]/20 border border-[#82a396]/40 rounded-full px-6 py-3.5 text-[#f5f2ed] max-w-md w-full">
            <CheckCircle
              size={22}
              weight="fill"
              className="text-[#82a396] flex-shrink-0"
            />

            <span className="font-[var(--font-body)] text-sm font-light">
              Your Boundaries Blueprint is on its way to your inbox!
            </span>
          </div>
        ) : (
          <div className="max-w-md w-full">
            <div className="ml-embedded" data-form="P5BeST"></div>
          </div>
        )}
      </div>
    </div>
  );
}
