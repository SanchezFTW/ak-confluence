import { useState } from 'react';
import { X, EnvelopeSimple, ArrowsOutSimple, CheckCircle } from '@phosphor-icons/react';

const DISMISS_KEY = 'nl-sticky-dismissed';

//
// ─────────────── STICKY MONTHLY NEWSLETTER SIGNUP ───────────────
//
export default function NewsletterSticky() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(DISMISS_KEY) !== '1';
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, '1');
    setVisible(false);
    setIsModalOpen(false);
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  if (!visible) return null;

  return (
    <>
      {/* Hidden iframe for background form processing */}
      <iframe name="ml_sticky_iframe" id="ml_sticky_iframe" style={{ display: 'none' }} title="MailerLite sticky frame" />

      <div
        className="nl-sticky fixed bottom-4 right-4 z-[50] w-[min(22rem,calc(100vw-2rem))] bg-white/95 backdrop-blur-md rounded-2xl border border-[#82a396]/30 shadow-[0_12px_40px_-12px_rgba(56,56,56,0.22)] p-5"
        role="complementary"
        aria-label="Monthly Newsletter signup"
      >
        <style>{`
          .nl-sticky {
            opacity: 0;
            animation: nlStickyIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards;
          }
          @keyframes nlStickyIn {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (prefers-reduced-motion: reduce) {
            .nl-sticky { animation: none; opacity: 1; }
          }
        `}</style>
        
        {/* Header row */}
        <div className="flex items-center justify-between mb-2">
          <span className="font-[var(--font-mono)] text-[9px] tracking-[0.25em] uppercase text-[#82a396] font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#82a396] inline-block animate-pulse"></span>
            Monthly Newsletter
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-6 h-6 flex items-center justify-center rounded-full text-[#a38d7a] hover:text-[#383838] hover:bg-[#f5f2ed] transition-colors cursor-pointer"
              aria-label="Expand newsletter modal"
              title="Expand popup"
            >
              <ArrowsOutSimple size={13} weight="bold" />
            </button>
            <button
              onClick={dismiss}
              className="w-6 h-6 flex items-center justify-center rounded-full text-[#a38d7a] hover:text-[#383838] hover:bg-[#f5f2ed] transition-colors cursor-pointer"
              aria-label="Dismiss newsletter signup"
            >
              <X size={14} weight="bold" />
            </button>
          </div>
        </div>

        {/* Content intro */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#82a396]/12 flex items-center justify-center text-[#82a396] mt-0.5">
            <EnvelopeSimple size={18} weight="light" />
          </div>
          <div>
            <h3 className="font-[var(--font-heading)] text-[#383838] text-base leading-snug font-normal">
              Join our newsletter
            </h3>
            <p className="font-[var(--font-body)] text-[#a38d7a] text-xs font-light leading-relaxed">
              Notes on boundaries & anxiety. 1 email a month.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="flex items-center gap-2 bg-[#82a396]/15 border border-[#82a396]/30 rounded-xl p-3 text-[#383838] mt-2">
            <CheckCircle size={20} weight="fill" className="text-[#82a396] flex-shrink-0" />
            <span className="font-[var(--font-body)] text-xs font-normal">
              You're subscribed! Thanks for joining.
            </span>
          </div>
        ) : (
          <form
            action="https://assets.mailerlite.com/jsonp/2382319/forms/188567234692515097/subscribe"
            method="post"
            target="ml_sticky_iframe"
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 mt-2"
          >
            <input type="hidden" name="ml-submit" value="1" />
            <input type="hidden" name="anticsrf" value="true" />
            <input
              type="email"
              name="fields[email]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              required
              className="w-full bg-[#f5f2ed] border border-[#82a396]/30 text-[#383838] placeholder-[#a38d7a] text-xs font-[var(--font-body)] rounded-full px-4 py-2.5 focus:outline-none focus:border-[#82a396] transition-colors"
            />
            <button
              type="submit"
              className="w-full bg-[#82a396] text-white text-[10px] tracking-[0.18em] uppercase font-medium font-[var(--font-mono)] px-5 py-2.5 rounded-full hover:bg-[#6b8f80] active:scale-[0.98] transition-all cursor-pointer shadow-sm hover:shadow"
            >
              Subscribe Free
            </button>
          </form>
        )}
      </div>

      {/* Expanded Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#383838] text-[#f5f2ed] rounded-3xl p-6 sm:p-10 max-w-md w-full relative shadow-2xl border border-white/10">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-[#f5f2ed]/60 hover:text-[#f5f2ed] hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} weight="bold" />
            </button>
            <p className="font-[var(--font-mono)] text-[10px] tracking-[0.25em] uppercase text-[#82a396] mb-2 font-medium">
              Monthly Newsletter
            </p>
            <h3 className="font-[var(--font-display)] text-2xl sm:text-3xl font-light leading-tight mb-3 text-[#f5f2ed]">
              Join the Confluence Newsletter
            </h3>
            <p className="font-[var(--font-body)] text-[#f5f2ed]/70 text-sm font-light leading-relaxed mb-6">
              Straightforward mental health insights, boundary scripts, and anxiety tools sent once a month by our Anchorage therapy team.
            </p>
            
            {submitted ? (
              <div className="flex items-center gap-3 bg-[#82a396]/20 border border-[#82a396]/40 rounded-full px-6 py-4 text-[#f5f2ed] w-full">
                <CheckCircle size={22} weight="fill" className="text-[#82a396] flex-shrink-0" />
                <span className="font-[var(--font-body)] text-sm font-light">
                  You're on the list! Thank you for subscribing.
                </span>
              </div>
            ) : (
              <form
                action="https://assets.mailerlite.com/jsonp/2382319/forms/188567234692515097/subscribe"
                method="post"
                target="ml_sticky_iframe"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-[#f5f2ed]/10 border border-white/15 rounded-2xl sm:rounded-full p-2 sm:p-1.5 sm:pl-5 w-full focus-within:border-[#82a396] transition-colors"
              >
                <input type="hidden" name="ml-submit" value="1" />
                <input type="hidden" name="anticsrf" value="true" />
                <input
                  type="email"
                  name="fields[email]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  required
                  className="w-full bg-transparent border-none text-[#f5f2ed] placeholder-[#f5f2ed]/50 text-sm font-[var(--font-body)] px-3 py-2 sm:p-0 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#82a396] text-white text-xs font-medium font-[var(--font-body)] px-6 py-3 rounded-full hover:bg-[#6b8f80] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}



