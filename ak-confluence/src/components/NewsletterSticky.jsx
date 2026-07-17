import { useState } from 'react';
import { X, EnvelopeSimple } from '@phosphor-icons/react';

const DISMISS_KEY = 'nl-sticky-dismissed';

//
// ─────────────── STICKY NEWSLETTER PROMPT ───────────────
//
// Small dismissible card in the bottom-right corner. Closing it hides it for
// the rest of the visit (sessionStorage) — it returns on a fresh session.
// Its CTA scrolls to the footer signup (#newsletter) rather than embedding the
// MailerLite form again (duplicate `data-form` containers conflict). It can
// later be swapped for a dedicated MailerLite popup form.
//
// Entrance uses a CSS keyframe (not GSAP) so the card's visibility never
// depends on requestAnimationFrame ticking — animation-fill-mode keeps it
// visible even if the tab is backgrounded when it mounts.
//
export default function NewsletterSticky() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(DISMISS_KEY) !== '1';
  });

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, '1');
    setVisible(false);
  }

  function goToSignup() {
    const el = document.querySelector('#newsletter');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    dismiss();
  }

  if (!visible) return null;

  return (
    <div
      className="nl-sticky fixed bottom-4 right-4 z-[50] w-[min(20rem,calc(100vw-2rem))] bg-white rounded-2xl border border-[#82a396]/25 shadow-[0_8px_30px_-8px_rgba(56,56,56,0.25)] p-5"
      role="complementary"
      aria-label="Newsletter signup"
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
      <button
        onClick={dismiss}
        className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full text-[#a38d7a] hover:text-[#383838] hover:bg-[#f5f2ed] transition-colors cursor-pointer"
        aria-label="Dismiss newsletter signup"
      >
        <X size={16} weight="bold" />
      </button>
      <div className="flex items-start gap-3 pr-4">
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#82a396]/10 flex items-center justify-center text-[#82a396] mt-0.5">
          <EnvelopeSimple size={18} weight="light" />
        </div>
        <div>
          <p className="font-[var(--font-heading)] text-[#383838] text-base leading-snug mb-1">Get the free Boundaries Blueprint</p>
          <p className="font-[var(--font-body)] text-[#a38d7a] text-xs font-light leading-relaxed">
            A practical guide to setting healthier boundaries, straight to your inbox. Free.
          </p>
        </div>
      </div>
      <button
        onClick={goToSignup}
        className="mt-4 w-full bg-[#82a396] text-white text-[10px] tracking-[0.2em] uppercase font-medium font-[var(--font-mono)] px-5 py-3 rounded-full hover:bg-[#6b8f80] active:scale-[0.98] transition-all cursor-pointer"
      >
        Get the guide
      </button>
    </div>
  );
}
