import { useState } from 'react';
import { CheckCircle } from '@phosphor-icons/react';

// Boundaries Blueprint form (embed key "P5BeST"). We post straight to
// MailerLite's JSONP subscribe endpoint through a hidden iframe instead of the
// `ml-embedded` universal.js embed — universal.js scans the DOM once at init and
// races React's mount, which left the footer form blank. The iframe POST is
// deterministic and needs no third-party script.
const ML_SUBSCRIBE_URL =
  'https://assets.mailerlite.com/jsonp/2382319/forms/193826477630817348/subscribe';

export default function NewsletterSignup() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    // Defer the success swap so the form isn't unmounted mid-submit — unmounting
    // a form synchronously inside onSubmit can abort the iframe POST.
    setTimeout(() => setSubmitted(true), 500);
  }

  return (
    <>
      {/* Hidden iframe absorbs MailerLite JSON response */}
      <iframe name="ml-footer-frame" title="" style={{ display: 'none' }} />

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
            <div className="w-full max-w-sm flex flex-col items-center gap-3 text-center">
              <div className="flex items-center justify-center gap-3 bg-[#82a396]/20 border border-[#82a396]/40 rounded-full px-6 py-4 text-[#f5f2ed] w-full">
                <CheckCircle size={22} weight="fill" className="text-[#82a396] flex-shrink-0" />
                <span className="font-[var(--font-body)] text-sm font-light">
                  Your Boundaries Blueprint is on its way to your inbox!
                </span>
              </div>
              <a
                href="https://akconfluence.com/boundaries-blueprint-guide.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[var(--font-body)] text-[#82a396] text-sm underline underline-offset-4 hover:text-[#a8c4b8] transition-colors"
              >
                Can't wait? Download it now →
              </a>
            </div>
          ) : (
            <form
              action={ML_SUBSCRIBE_URL}
              method="post"
              target="ml-footer-frame"
              onSubmit={handleSubmit}
              className="w-full max-w-sm flex flex-col gap-3"
            >
              <input type="hidden" name="ml-submit" value="1" />
              <input type="hidden" name="anticsrf" value="true" />

              {/* Email + button pill */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-[#f5f2ed]/10 border border-white/15 rounded-2xl sm:rounded-full p-2 sm:p-1.5 sm:pl-5 w-full focus-within:border-[#82a396] transition-colors">
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

              {/* Required opt-in */}
              <label className="flex items-start gap-2.5 cursor-pointer group text-left">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 flex-shrink-0 w-4 h-4 rounded accent-[#82a396] cursor-pointer"
                />
                <span className="font-[var(--font-body)] text-xs text-[#f5f2ed]/50 leading-relaxed group-hover:text-[#f5f2ed]/70 transition-colors">
                  Opt in to receive news and updates.
                </span>
              </label>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
