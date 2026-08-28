import { useEffect, useRef } from 'react';

const ML_ACCOUNT_ID = '2382319';
const ML_SCRIPT_SRC = 'https://assets.mailerlite.com/js/universal.js';
const ML_JSONP_BASE = 'https://assets.mailerlite.com/jsonp';

// universal.js is already loaded once via index.html, so we must NOT append a
// second copy. When the script loads again, MailerLite re-initializes and that
// re-init race tears down the embedded form — which is why the footer signup
// rendered on the first visit (loader delays the render) but was empty after a
// refresh (loader is skipped via sessionStorage, changing the timing). This
// guard checks for the existing script by URL instead of an element id
// (index.html's <script> tag has no id), and only loads it ourselves as a
// fallback if it's genuinely absent from the page.
function ensureMailerLiteScript() {
  if (document.querySelector('script[src*="assets.mailerlite.com/js/universal.js"]')) return;

  window.ml =
    window.ml ||
    function (...args) {
      (window.ml.q = window.ml.q || []).push(args);
    };

  const script = document.createElement('script');
  script.id = 'mailerlite-universal-js';
  script.async = true;
  script.src = ML_SCRIPT_SRC;
  document.head.appendChild(script);
}

export default function NewsletterSignup() {
  const formContainerRef = useRef(null);

  useEffect(() => {
    ensureMailerLiteScript();
    // Nudge universal.js to pick up [data-form] embeds after React mounts.
    window.ml('account', ML_ACCOUNT_ID);

    // universal.js scans the DOM for embeds exactly ONCE, during its init. If it
    // initialized before React mounted our container, the form is never injected —
    // and re-asserting `ml('account', ...)` after init only sets the account id, it
    // does NOT re-scan. So if the container is still empty once universal.js is
    // ready, re-fetch the embed using the same JSONP call universal.js makes for
    // `data-form` embeds (idempotent: renderEmbeddedForm no-ops on a filled container).
    const container = formContainerRef.current;
    let cancelled = false;
    let attempts = 0;

    const renderIfEmpty = () => {
      if (cancelled) return;
      if (!container || container.children.length > 0) return;

      if (window.ml?.fn && typeof window.ml.fn.renderEmbeddedForm === 'function') {
        // universal.js already initialized but missed us (it scanned before mount).
        const formId = container.getAttribute('data-form');
        const script = document.createElement('script');
        script.async = true;
        script.src = `${ML_JSONP_BASE}/${ML_ACCOUNT_ID}/forms/${formId}?callback=ml.fn.renderEmbeddedForm`;
        document.head.appendChild(script);
        return;
      }

      // universal.js is still booting — its init scan will find the container
      // (we're already mounted), so this retry is just a safety net.
      if (attempts < 20) {
        attempts += 1;
        setTimeout(renderIfEmpty, 250);
      }
    };

    const timer = setTimeout(renderIfEmpty, 100);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
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
      <div ref={formContainerRef} className="lg:order-2 flex justify-center lg:justify-end">
        <div className="ml-embedded" data-form="P5BeST" />
      </div>
    </div>
  );
}
