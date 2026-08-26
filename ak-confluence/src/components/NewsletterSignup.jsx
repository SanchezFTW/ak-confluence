import { useState } from 'react';
import { CheckCircle } from '@phosphor-icons/react';

//
// ─────────────── FOOTER BLUEPRINT SIGNUP (MailerLite embed) ───────────────
//
export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('fields[email]', email);
      formData.append('ml-submit', '1');
      formData.append('anticsrf', 'true');
      fetch('https://assets.mailerlite.com/jsonp/2382319/forms/193826477630817348/subscribe', {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

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
          <div className="flex items-center gap-3 bg-[#82a396]/20 border border-[#82a396]/40 rounded-full px-6 py-3.5 text-[#f5f2ed] max-w-md w-full animate-fadeUp">
            <CheckCircle size={22} weight="fill" className="text-[#82a396] flex-shrink-0" />
            <span className="font-[var(--font-body)] text-sm font-light">
              Your Boundaries Blueprint is on its way to your inbox!
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-[#f5f2ed]/10 border border-[#f5f2ed]/20 rounded-2xl sm:rounded-full p-2 sm:p-1.5 sm:pl-5 max-w-md w-full focus-within:border-[#82a396] transition-colors"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              required
              className="w-full bg-transparent border-none text-[#f5f2ed] placeholder-[#f5f2ed]/50 text-sm font-[var(--font-body)] px-3 py-2 sm:p-0 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#82a396] text-white text-xs font-medium font-[var(--font-body)] px-6 py-3 rounded-full hover:bg-[#6b8f80] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Get Guide'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}


