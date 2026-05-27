import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../data/posts';

function formatDate(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function NewsletterSignup() {
  useEffect(() => {
    if (window.ml) window.ml('show', 'UGY1bC', true);
  }, []);

  return (
    <section className="py-16 lg:py-20 px-6 lg:px-20 bg-[#82a396]/10 border-y border-[#82a396]/20">
      <div className="max-w-[580px] mx-auto text-center">
        <p className="text-[#82a396] text-[9px] tracking-[0.4em] uppercase font-medium mb-4 flex items-center justify-center gap-2 font-[var(--font-mono)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#82a396] inline-block" /> Stay Connected
        </p>
        <h2 className="font-[var(--font-display)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-light text-[#383838] leading-[1.05] mb-4">
          Get updates from <em className="text-[#82a396] italic">our practice</em>
        </h2>
        <p className="font-[var(--font-body)] text-[#a38d7a] font-light text-base leading-relaxed mb-8">
          Occasional insights, resources, and workshop announcements — no spam, ever.
        </p>
        <div className="ml-embedded" data-form="UGY1bC"></div>
      </div>
    </section>
  );
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
  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 lg:pt-44 lg:pb-20 px-6 lg:px-20 bg-[#f5f2ed]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-[var(--font-mono)] text-[9px] tracking-[0.4em] uppercase text-[#82a396] mb-5 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#82a396] inline-block" /> From the Confluence Couch
          </p>
          <h1 className="font-[var(--font-display)] text-[clamp(2.5rem,6vw,4rem)] font-light text-[#383838] leading-[1.0] mb-6">
            Real talk from<br /><em className="text-[#82a396] italic">our counselors</em>
          </h1>
          <p className="font-[var(--font-body)] text-[#a38d7a] font-light text-base lg:text-lg leading-relaxed max-w-xl mx-auto">
            Straightforward advice, practical tips, and real-life strategies for everyday life — from the team at AK Confluence.
          </p>
        </div>
      </section>

      {/* Signup embed */}
      <NewsletterSignup />

      {/* Post grid */}
      <section className="py-16 lg:py-24 px-6 lg:px-20 bg-[#f5f2ed]">
        <div className="max-w-6xl mx-auto">
          <p className="font-[var(--font-mono)] text-[9px] tracking-[0.4em] uppercase text-[#a38d7a]/60 mb-10 text-center">
            {sorted.length} posts
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sorted.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
