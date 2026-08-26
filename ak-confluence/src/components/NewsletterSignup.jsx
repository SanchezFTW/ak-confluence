import { useState, useEffect } from 'react';
import { CheckCircle } from '@phosphor-icons/react';

//
// ─────────────── FOOTER BLUEPRINT SIGNUP ───────────────
// Form ID: 44077565  |  Group: Boundaries Blueprint
// MailerLite's webforms.min.js handles submission via AJAX.
// We hook into window.ml_webform_success_44077565 for inline success state.
//
export default function NewsletterSignup() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Register success callback BEFORE the script initialises
    window.ml_webform_success_44077565 = () => setSubmitted(true);

    // Inform MailerLite this form has been viewed
    fetch('https://assets.mailerlite.com/jsonp/2382319/forms/193826477630817348/takel').catch(() => {});

    // Load MailerLite webforms script once per page
    if (!document.getElementById('ml-webforms-js')) {
      const s = document.createElement('script');
      s.id = 'ml-webforms-js';
      s.src = 'https://groot.mailerlite.com/js/w/webforms.min.js?v83147fa8ce2d95cb73ece7f28b469519';
      s.async = true;
      document.body.appendChild(s);
    }

    return () => {
      delete window.ml_webform_success_44077565;
    };
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      <div className="lg:order-1 text-center lg:text-left">
        <h2 className="font-[var(--font-display)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-light leading-[1.05] mb-4 text-[#f5f2ed]">
          Get your free <em className="italic text-[#82a396]">Boundaries Blueprint</em>
        </h2>
        <p className="font-[var(--font-body)] font-light text-base leading-relaxed mb-6 lg:mb-0 text-[#f5f2ed]/70">
          A practical guide to setting limits calmly and confidently, written by our therapists in Anchorage. Enter your email below to get instant access.
        </p>
      </div>

      <div className="lg:order-2 flex justify-center lg:justify-end">
        {submitted ? (
          <div className="flex items-center gap-3 bg-[#82a396]/20 border border-[#82a396]/40 rounded-full px-6 py-3.5 text-[#f5f2ed] max-w-md w-full">
            <CheckCircle size={22} weight="fill" className="text-[#82a396] flex-shrink-0" />
            <span className="font-[var(--font-body)] text-sm font-light">
              Your Boundaries Blueprint is on its way to your inbox!
            </span>
          </div>
        ) : (
          <form
            className="ml-block-form flex flex-col gap-3 max-w-md w-full"
            action="https://assets.mailerlite.com/jsonp/2382319/forms/193826477630817348/subscribe"
            data-code=""
            method="post"
          >
            <input type="hidden" name="ml-submit" value="1" />
            <input type="hidden" name="anticsrf" value="true" />

            {/* Email + submit pill */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-[#f5f2ed]/10 border border-[#f5f2ed]/20 rounded-2xl sm:rounded-full p-2 sm:p-1.5 sm:pl-5 w-full focus-within:border-[#82a396] transition-colors">
              <input
                type="email"
                name="fields[email]"
                placeholder="Enter your email..."
                autoComplete="email"
                required
                className="w-full bg-transparent border-none text-[#f5f2ed] placeholder-[#f5f2ed]/50 text-sm font-[var(--font-body)] px-3 py-2 sm:p-0 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#82a396] text-white text-xs font-medium font-[var(--font-body)] px-6 py-3 rounded-full hover:bg-[#6b8f80] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
              >
                Get Guide
              </button>
            </div>

            {/* Required opt-in checkbox */}
            <label className="flex items-start gap-2.5 cursor-pointer group">
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  required
                  className="peer sr-only"
                />
                <div className="w-4 h-4 rounded border border-[#f5f2ed]/30 bg-transparent peer-checked:bg-[#82a396] peer-checked:border-[#82a396] transition-colors flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white hidden peer-checked:block" fill="none" viewBox="0 0 8 8">
                    <path fill="currentColor" d="M6.564.75L2.974 4.362l-1.538-1.55L0 4.26 2.974 7.25 8 2.193z"/>
                  </svg>
                </div>
              </div>
              <span className="font-[var(--font-body)] text-xs text-[#f5f2ed]/50 leading-relaxed group-hover:text-[#f5f2ed]/70 transition-colors">
                Opt in to receive news and updates.
              </span>
            </label>
          </form>
        )}
      </div>
    </div>
  );
}
