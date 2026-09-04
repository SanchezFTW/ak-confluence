import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlass, CheckCircle } from '@phosphor-icons/react';
import { getPosts } from '../lib/sanity';
import { usePageReveal } from '../lib/usePageReveal';

const SUBJECT_FILTERS = [
  'Relationships',
  'Communication',
  'Emotional Wellness',
  'Self-Care',
  'Anxiety',
  'Parenting',
  'Workplace',
];

function formatDate(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function PostCard({ post }) {
  return (
    <Link
      to={`/newsletter/${post.slug}`}
      className="group flex flex-col bg-white border border-[#82a396]/15 rounded-2xl p-6 hover:border-[#82a396]/40 hover:shadow-[0_4px_24px_-8px_rgba(130,163,150,0.18)] transition-all duration-300"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="font-[var(--font-mono)] text-[9px] tracking-[0.3em] uppercase text-[#82a396]">
          {formatDate(post.date)}
        </span>
      </div>
      <h2 className="font-[var(--font-display)] text-[1.25rem] font-light text-[#383838] leading-[1.2] mb-3 group-hover:text-[#82a396] transition-colors duration-200">
        {post.title}
      </h2>
      <p className="font-[var(--font-body)] text-[#a38d7a] text-sm font-light leading-relaxed mb-5 flex-1">
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between">
        <span className="font-[var(--font-mono)] text-[9px] tracking-[0.2em] uppercase text-[#a38d7a]/70">
          {post.author}
        </span>
        <span className="font-[var(--font-body)] text-[#82a396] text-xs font-medium group-hover:translate-x-1 transition-transform duration-200 inline-block">
          Read →
        </span>
      </div>
    </Link>
  );
}

export default function NewsletterPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubject, setActiveSubject] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const revealRef = usePageReveal();

  function handleSubmit() {
    // Defer the success swap so the form isn't unmounted mid-submit — unmounting
    // a form synchronously inside onSubmit can abort the iframe POST.
    setTimeout(() => setSubmitted(true), 500);
  }

  useEffect(() => {
    let active = true;
    getPosts()
      .then((data) => { if (active) setPosts(data); })
      .catch((err) => console.error('Failed to load posts', err))
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  const filtered = sorted.filter((post) => {
    const tags = post.tags ?? [];
    const matchesSubject = !activeSubject || tags.includes(activeSubject);
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      (post.excerpt ?? '').toLowerCase().includes(q);
    return matchesSubject && matchesSearch;
  });

  return (
    <>
      {/* Hidden iframe absorbs MailerLite JSON response for the hero signup */}
      <iframe name="ml-newsletter-page-frame" title="" style={{ display: 'none' }} />

      {/* Hero */}
      <section ref={revealRef} className="pt-32 pb-12 lg:pt-40 lg:pb-16 px-6 lg:px-20 bg-[#e8e4dc]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-start">
          <div className="max-w-2xl">
            <p className="reveal-up text-[#82a396] text-[9px] tracking-[0.4em] uppercase font-medium mb-6 flex items-center gap-2 font-[var(--font-mono)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#82a396] inline-block" /> From the Confluence Couch
            </p>
            <h1 className="reveal-up font-[var(--font-display)] text-[clamp(1.8rem,5vw,4.5rem)] font-light text-[#383838] leading-[1.05] mb-6">
              Real talk from <em className="text-[#82a396] italic">our counselors</em>
            </h1>
            <p className="reveal-up font-[var(--font-body)] text-[#a38d7a] font-light text-base lg:text-lg leading-relaxed">
              Straightforward advice, practical tips, and real-life strategies for everyday life, from the team at akConfluence.
            </p>
          </div>

          {/* Newsletter signup card */}
          <div className="reveal-up w-full lg:w-[340px] bg-white border border-[#82a396]/20 rounded-2xl p-6 shadow-[0_8px_30px_-12px_rgba(56,56,56,0.12)]">
            <p className="font-[var(--font-mono)] text-[9px] tracking-[0.25em] uppercase text-[#82a396] font-medium mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#82a396] inline-block" /> Monthly Newsletter
            </p>
            <h2 className="font-[var(--font-heading)] text-[#383838] text-xl mb-1">Join our newsletter</h2>
            <p className="font-[var(--font-body)] text-[#a38d7a] text-sm font-light leading-relaxed mb-5">
              Notes on boundaries &amp; anxiety. 1 email a month.
            </p>

            {submitted ? (
              <div className="flex items-center gap-2 bg-[#82a396]/15 border border-[#82a396]/30 rounded-xl p-3 text-[#383838]">
                <CheckCircle size={20} weight="fill" className="text-[#82a396] flex-shrink-0" />
                <span className="font-[var(--font-body)] text-xs font-normal">
                  You're subscribed! Thanks for joining.
                </span>
              </div>
            ) : (
              <form
                action="https://assets.mailerlite.com/jsonp/2382319/forms/188567234692515097/subscribe"
                method="post"
                target="ml-newsletter-page-frame"
                onSubmit={handleSubmit}
                className="flex flex-col gap-3"
              >
                <input type="hidden" name="ml-submit" value="1" />
                <input type="hidden" name="anticsrf" value="true" />
                <input
                  type="email"
                  name="fields[email]"
                  placeholder="Enter your email..."
                  autoComplete="email"
                  required
                  className="w-full bg-[#f5f2ed] border border-[#82a396]/30 text-[#383838] placeholder-[#a38d7a] text-sm font-[var(--font-body)] rounded-full px-4 py-2.5 focus:outline-none focus:border-[#82a396] transition-colors"
                />
                <label className="flex items-start gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 flex-shrink-0 w-4 h-4 rounded accent-[#82a396] cursor-pointer"
                  />
                  <span className="font-[var(--font-body)] text-xs text-[#a38d7a] leading-relaxed group-hover:text-[#383838] transition-colors">
                    Opt in to receive news and updates.
                  </span>
                </label>
                <button
                  type="submit"
                  className="w-full bg-[#82a396] text-white text-[10px] tracking-[0.18em] uppercase font-medium font-[var(--font-mono)] px-5 py-2.5 rounded-full hover:bg-[#6b8f80] active:scale-[0.98] transition-all cursor-pointer shadow-sm hover:shadow"
                >
                  Subscribe Free
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Post grid */}
      <section className="py-16 lg:py-24 px-6 lg:px-20 bg-[#f5f2ed]">
        <div className="max-w-6xl mx-auto">

          {/* Filter bar */}
          <div className="mb-10 flex flex-col gap-4">
            {/* Search */}
            <div className="relative max-w-sm mx-auto w-full">
              <MagnifyingGlass
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a38d7a] pointer-events-none"
              />
              <input
                type="search"
                placeholder="Search posts…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-full bg-white border border-[#82a396]/20 text-[#383838] text-sm font-[var(--font-body)] placeholder:text-[#a38d7a]/50 focus:outline-none focus:border-[#82a396]/60 transition-colors"
              />
            </div>

            {/* Subject pills */}
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setActiveSubject('')}
                className={`text-[10px] tracking-[0.15em] uppercase font-medium font-[var(--font-mono)] px-4 py-2 rounded-full transition-all ${
                  activeSubject === ''
                    ? 'bg-[#82a396] text-white'
                    : 'bg-transparent text-[#a38d7a] border border-[#383838]/10 hover:border-[#82a396] hover:text-[#82a396]'
                }`}
              >
                All topics
              </button>
              {SUBJECT_FILTERS.map((subject) => (
                <button
                  key={subject}
                  onClick={() => setActiveSubject(activeSubject === subject ? '' : subject)}
                  className={`text-[10px] tracking-[0.15em] uppercase font-medium font-[var(--font-mono)] px-4 py-2 rounded-full transition-all ${
                    activeSubject === subject
                      ? 'bg-[#82a396] text-white'
                      : 'bg-transparent text-[#a38d7a] border border-[#383838]/10 hover:border-[#82a396] hover:text-[#82a396]'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          <p className="font-[var(--font-mono)] text-[9px] tracking-[0.4em] uppercase text-[#a38d7a]/60 mb-8 text-center">
            {loading
              ? 'Loading…'
              : `${filtered.length} ${filtered.length === 1 ? 'post' : 'posts'}${(activeSubject || searchQuery) ? ' matching' : ''}`}
          </p>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-44 rounded-2xl bg-white/60 border border-[#82a396]/10 animate-pulse"
                />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center font-[var(--font-body)] text-[#a38d7a] font-light text-sm py-12">
              No posts match your search. <button onClick={() => { setSearchQuery(''); setActiveSubject(''); }} className="text-[#82a396] underline underline-offset-2 hover:text-[#6b8f80] transition-colors cursor-pointer">Clear filters</button>
            </p>
          )}
        </div>
      </section>
    </>
  );
}
