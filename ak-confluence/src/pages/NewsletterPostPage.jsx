import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
import { getPostBySlug, urlFor } from '../lib/sanity';
import { PortableText } from '../lib/portableText';

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function NewsletterPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loadedSlug, setLoadedSlug] = useState(null);

  useEffect(() => {
    let active = true;
    getPostBySlug(slug)
      .then((data) => { if (active) setPost(data ?? null); })
      .catch((err) => { console.error('Failed to load post', err); if (active) setPost(null); })
      .finally(() => { if (active) setLoadedSlug(slug); });
    return () => { active = false; };
  }, [slug]);

  // Derived (not synchronous setState): true until this slug's fetch settles.
  const loading = loadedSlug !== slug;

  if (loading) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#f5f2ed]">
        <p className="font-[var(--font-mono)] text-[9px] tracking-[0.4em] uppercase text-[#82a396] animate-pulse">
          Loading…
        </p>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#f5f2ed]">
        <p className="font-[var(--font-mono)] text-[9px] tracking-[0.4em] uppercase text-[#82a396] mb-4">404</p>
        <h1 className="font-[var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-light text-[#383838] mb-6">
          Post not found
        </h1>
        <Link to="/newsletter" className="btn-primary">
          Back to Newsletter
        </Link>
      </section>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-10 lg:pt-44 lg:pb-12 px-6 lg:px-20 bg-[#f5f2ed]">
        <div className="max-w-2xl mx-auto">
          <Link
            to="/newsletter"
            className="inline-flex items-center gap-2 font-[var(--font-mono)] text-[9px] tracking-[0.3em] uppercase text-[#82a396] hover:text-[#dd9e6f] transition-colors mb-10"
          >
            <ArrowLeft size={12} weight="bold" /> All Posts
          </Link>
          <p className="font-[var(--font-mono)] text-[9px] tracking-[0.4em] uppercase text-[#a38d7a]/70 mb-4">
            {formatDate(post.date)}
          </p>
          <h1 className="font-[var(--font-display)] text-[clamp(2rem,5vw,3.25rem)] font-light text-[#383838] leading-[1.05] mb-5">
            {post.title}
          </h1>
          <p className="font-[var(--font-mono)] text-[10px] tracking-[0.25em] uppercase text-[#82a396]">
            {post.author}
          </p>
        </div>
      </section>

      {/* Cover image */}
      {post.coverImage && (
        <div className="px-6 lg:px-20 pb-2">
          <img
            src={urlFor(post.coverImage)?.width(1400).fit('max').auto('format').url()}
            alt={post.title}
            className="max-w-2xl mx-auto w-full rounded-2xl"
          />
        </div>
      )}

      {/* Divider */}
      <div className="px-6 lg:px-20">
        <div className="max-w-2xl mx-auto border-t border-[#82a396]/20" />
      </div>

      {/* Body */}
      <section className="py-12 lg:py-16 px-6 lg:px-20 bg-[#f5f2ed]">
        <div className="max-w-2xl mx-auto prose-newsletter">
          <PortableText value={post.body} />
        </div>
      </section>

      {/* Back link */}
      <section className="pb-20 px-6 lg:px-20 bg-[#f5f2ed]">
        <div className="max-w-2xl mx-auto">
          <div className="border-t border-[#82a396]/20 pt-10 flex items-center justify-between">
            <Link
              to="/newsletter"
              className="inline-flex items-center gap-2 font-[var(--font-mono)] text-[10px] tracking-[0.3em] uppercase text-[#82a396] hover:text-[#dd9e6f] transition-colors"
            >
              <ArrowLeft size={12} weight="bold" /> Back to all posts
            </Link>
            <Link
              to="/contact"
              className="btn-primary"
              style={{ padding: '10px 24px', fontSize: '11px' }}
            >
              Book a session
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .prose-newsletter p {
          font-family: var(--font-body);
          color: #4a4a4a;
          font-size: 1.0625rem;
          line-height: 1.75;
          font-weight: 300;
          margin-bottom: 1.5rem;
        }
        .prose-newsletter h3 {
          font-family: var(--font-display);
          color: #383838;
          font-size: 1.375rem;
          font-weight: 400;
          line-height: 1.2;
          margin-top: 2.5rem;
          margin-bottom: 0.875rem;
        }
        .prose-newsletter ul,
        .prose-newsletter ol {
          font-family: var(--font-body);
          color: #4a4a4a;
          font-size: 1.0625rem;
          line-height: 1.75;
          font-weight: 300;
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .prose-newsletter li {
          margin-bottom: 0.5rem;
        }
        .prose-newsletter strong {
          color: #383838;
          font-weight: 500;
        }
        .prose-newsletter em {
          color: #82a396;
        }
      `}</style>
    </>
  );
}
