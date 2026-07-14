import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlass } from '@phosphor-icons/react';
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
  const revealRef = usePageReveal();

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
      {/* Hero */}
      <section ref={revealRef} className="pt-32 pb-12 lg:pt-40 lg:pb-16 px-6 lg:px-20 bg-[#e8e4dc]">
        <div className="max-w-4xl mx-auto">
          <p className="reveal-up text-[#82a396] text-[9px] tracking-[0.4em] uppercase font-medium mb-6 flex items-center gap-2 font-[var(--font-mono)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#82a396] inline-block" /> From the Confluence Couch
          </p>
          <h1 className="reveal-up font-[var(--font-display)] text-[clamp(1.8rem,5vw,4.5rem)] font-light text-[#383838] leading-[1.05] mb-6">
            Real talk from <em className="text-[#82a396] italic">our counselors</em>
          </h1>
          <p className="reveal-up font-[var(--font-body)] text-[#a38d7a] font-light text-base lg:text-lg leading-relaxed max-w-2xl">
            Straightforward advice, practical tips, and real-life strategies for everyday life, from the team at akConfluence.
          </p>
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
