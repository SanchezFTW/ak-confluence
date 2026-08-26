import { useState, useEffect } from 'react';
import { X, EnvelopeSimple, ArrowsOutSimple } from '@phosphor-icons/react';

const DISMISS_KEY = 'nl-sticky-dismissed';

//
// ─────────────── STICKY MONTHLY NEWSLETTER SIGNUP ───────────────
//
// Small dismissible card in the bottom-right corner for the Monthly Newsletter.
// Embeds MailerLite form UGY1bC directly in the sticky bubble or interactive modal.
// Closing it hides it for the rest of the visit (sessionStorage).
//
export default function NewsletterSticky() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(DISMISS_KEY) !== '1';
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const el = document.querySelectorAll('.ml-embedded[data-form="188567234692515097"]');
    if (!el.length) return;
    document.querySelectorAll('script[src*="forms/188567234692515097"]').forEach((s) => s.remove());
    const script = document.createElement('script');
    script.src = 'https://assets.mailerlite.com/jsonp/2382319/forms/188567234692515097?callback=ml.fn.renderEmbeddedForm';
    document.head.appendChild(script);
  }, [visible, isModalOpen]);

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, '1');
    setVisible(false);
    setIsModalOpen(false);
  }

  if (!visible) return null;

  return (
    <>
      <div
        className="nl-sticky fixed bottom-4 right-4 z-[50] w-[min(21rem,calc(100vw-2rem))] bg-white/95 backdrop-blur-md rounded-2xl border border-[#82a396]/30 shadow-[0_12px_40px_-12px_rgba(56,56,56,0.22)] p-5"
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
        <div className="flex items-start gap-3 mb-4">
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

        {/* Action Button to Open Clean Form Modal */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-[#82a396] text-white text-[10px] tracking-[0.2em] uppercase font-medium font-[var(--font-mono)] px-5 py-3 rounded-full hover:bg-[#6b8f80] active:scale-[0.98] transition-all cursor-pointer shadow-sm hover:shadow"
        >
          Sign Up for Free
        </button>
      </div>

      {/* Expanded Modal Overlay with Clean Form */}
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
            
            <div className="ml-embedded ml-embedded-pill w-full" data-form="188567234692515097"></div>
          </div>
        </div>
      )}
    </>
  );
}

