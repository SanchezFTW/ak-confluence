import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="min-h-[100dvh] flex items-center justify-center bg-[#f5f2ed] px-6 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="font-[var(--font-mono)] font-bold text-[#82a396]/10 leading-none"
          style={{ fontSize: 'clamp(8rem, 30vw, 22rem)' }}
          aria-hidden="true"
        >
          404
        </span>
      </div>

      <div className="relative z-10 text-center max-w-lg mx-auto">
        <p className="font-[var(--font-mono)] text-[10px] tracking-[0.4em] uppercase text-[#82a396] mb-6 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#82a396] inline-block" />
          Page not found
        </p>
        <h1 className="font-[var(--font-heading)] text-[clamp(2rem,5vw,3.5rem)] text-[#383838] leading-tight mb-5">
          You've found<br />
          <em className="italic text-[#82a396]">uncharted territory.</em>
        </h1>
        <p className="font-[var(--font-body)] text-[#a38d7a] font-light text-lg leading-relaxed mb-10">
          The page you're looking for doesn't exist — but your path forward does.
        </p>
        <Link to="/" className="btn-primary">
          Back to home
        </Link>
      </div>
    </section>
  );
}
