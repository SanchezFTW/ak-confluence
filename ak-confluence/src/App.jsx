import { useEffect, useRef, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { List, X } from '@phosphor-icons/react';
import { AnimatedLogo } from './components/brand/AnimatedLogo';
import NewsletterSignup from './components/NewsletterSignup';
import NewsletterSticky from './components/NewsletterSticky';
import Home from './pages/Home';
import ContactPage from './pages/ContactPage';
import NewsletterPage from './pages/NewsletterPage';
import NewsletterPostPage from './pages/NewsletterPostPage';
import BoundariesBlueprintPage from './pages/BoundariesBlueprintPage';
import NotFoundPage from './pages/NotFoundPage';

gsap.registerPlugin(ScrollTrigger);

const INTAKE_URL = 'https://elly.clientsecure.me/contact-widget';
const LOADER_SEEN_KEY = 'ak_loader_seen';

//
// ─────────────── LOADER ───────────────
//
function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => onComplete()
    });

    tl.fromTo(textRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
    )
    .to(textRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.6,
      ease: 'expo.in',
      delay: 0.8
    })
    .to(loaderRef.current, {
      yPercent: -100,
      duration: 1,
      ease: 'expo.inOut'
    });
  }, { scope: loaderRef });

  return (
    <div ref={loaderRef} className="fixed inset-0 z-[100] bg-[#82a396] flex items-center justify-center overflow-hidden">
      <div ref={textRef} className="text-[#f5f2ed]">
        <AnimatedLogo animation="growth" variant="vertical" size={200} colorMode="dark" />
      </div>
    </div>
  );
}

//
// ─────────────── MOBILE NAV ───────────────
//
function MobileNav({ isOpen, onClose }) {
  const navRef = useRef(null);
  const linksRef = useRef(null);

  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(navRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo('.mobile-nav-link',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'expo.out', delay: 0.15 }
      );
    }
  }, { dependencies: [isOpen], scope: navRef });

  if (!isOpen) return null;

  const navLinks = [
    { label: 'Services', href: '/#services' },
    { label: 'Counselors', href: '/#counselors' },
    { label: 'Newsletter', to: '/newsletter' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <div ref={navRef} className="fixed inset-0 z-[60] bg-[#0a0a0a]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-[#f5f2ed]/60 hover:text-[#f5f2ed] transition-colors cursor-pointer"
        aria-label="Close navigation"
      >
        <X size={28} weight="light" />
      </button>
      <nav ref={linksRef} className="flex flex-col items-center gap-6">
        {navLinks.map((link) =>
          link.to ? (
            <Link
              key={link.label}
              to={link.to}
              onClick={onClose}
              className="mobile-nav-link font-[var(--font-heading)] text-[#f5f2ed] text-4xl hover:text-[#82a396] transition-colors"
            >
              {link.label}
            </Link>
          ) : (
            <a
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="mobile-nav-link font-[var(--font-heading)] text-[#f5f2ed] text-4xl hover:text-[#82a396] transition-colors"
            >
              {link.label}
            </a>
          )
        )}
        <a
          href={INTAKE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="mobile-nav-link mt-4 bg-[#82a396] text-[#0a0a0a] px-8 py-3 text-[10px] tracking-[0.2em] uppercase font-medium font-[var(--font-mono)] hover:bg-[#90b8a0] transition-colors"
        >
          Book Now
        </a>
      </nav>
    </div>
  );
}

//
// ─────────────── FOOTER ───────────────
//
function Footer() {
  const location = useLocation();
  // Skip the duplicate embed on the dedicated lead-magnet page — it has its own MailerLite form.
  const hideNewsletter = location.pathname === '/boundaries-blueprint';

  return (
    <footer id="contact" data-nav-dark className="text-[#f5f2ed] scroll-mt-24">
      {/* Newsletter signup */}
      {!hideNewsletter && (
        <div id="newsletter" className="bg-[#383838] py-14 lg:py-16 px-6 lg:px-20 scroll-mt-24">
          <NewsletterSignup />
        </div>
      )}

      {/* Footer Info */}
      <div className="bg-[#2a2a2a] py-14 px-6 lg:px-20">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
            {/* Brand column */}
            <div className="md:col-span-4">
              <div className="mb-3">
                <AnimatedLogo animation="flow" variant="horizontal" size={140} colorMode="dark" />
              </div>
              <p className="font-[var(--font-body)] text-[#f5f2ed]/40 text-sm font-light leading-relaxed">
                Together. Making a plan for intentional change.
              </p>
            </div>

            {/* Location */}
            <div className="md:col-span-2 md:col-start-6">
              <h4 className="font-[var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-[#82a396] mb-4">Location</h4>
              <div className="flex flex-col gap-2 font-[var(--font-body)] text-[#f5f2ed]/50 text-sm">
                <span>Anchorage, Alaska</span>
                <span>Virtual across AK</span>
              </div>
            </div>

            {/* Contact */}
            <div className="md:col-span-3">
              <h4 className="font-[var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-[#82a396] mb-4">Contact</h4>
              <div className="flex flex-col gap-2 font-[var(--font-body)] text-[#f5f2ed]/50 text-sm">
                <a href="mailto:info@akconfluence.com" className="hover:text-[#f5f2ed] transition-colors">info@akconfluence.com</a>
                <a href="tel:9073134433" className="hover:text-[#f5f2ed] transition-colors">907-313-4433</a>
              </div>
            </div>

            {/* Hours */}
            <div className="md:col-span-2">
              <h4 className="font-[var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-[#82a396] mb-4">Hours</h4>
              <div className="flex flex-col gap-2 font-[var(--font-body)] text-[#f5f2ed]/50 text-sm">
                <span>Mon–Fri: 7am–7pm</span>
                <span>Sat: 8am–3pm</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Footer */}
      <div className="bg-[#222222] py-5 px-6 lg:px-20">
        <div className="max-w-[1100px] mx-auto flex justify-center items-center text-[#f5f2ed]/20 text-xs font-[var(--font-body)]">
          <span>&copy; {new Date().getFullYear()} Confluence LLC. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

//
// ─────────────── SCROLL TO HASH ON NAVIGATE ───────────────
//
function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on page change (non-hash navigation)
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }

    // If there's a hash, scroll to it after a short delay for rendering
    const timer = setTimeout(() => {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timer);
  }, [location]);

  return null;
}

//
// ─────────────── MAIN APP ───────────────
//
function App() {
  const seenLoader = sessionStorage.getItem(LOADER_SEEN_KEY) === '1';
  const [loading, setLoading] = useState(!seenLoader);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [navDark, setNavDark] = useState(false);
  const location = useLocation();

  // Only show loader on the home page, first load of the session
  const isHome = location.pathname === '/';
  const [hasLoaded, setHasLoaded] = useState(seenLoader);
  const showLoader = isHome && !hasLoaded;

  function handleLoaderComplete() {
    setLoading(false);
    setHasLoaded(true);
    sessionStorage.setItem(LOADER_SEEN_KEY, '1');
  }

  // Skip loader on non-home pages
  useEffect(() => {
    if (!isHome && loading) {
      setLoading(false);
      setHasLoaded(true);
    }
  }, [isHome, loading]);

  // Watch for nav overlapping dark sections (footer, events)
  useEffect(() => {
    const nav = document.querySelector('.nav-pill');
    if (!nav) return;

    const checkNavOverlap = () => {
      const navRect = nav.getBoundingClientRect();
      const navMid = navRect.top + navRect.height / 2;

      const darkSections = document.querySelectorAll('[data-nav-dark]');
      let overDark = false;
      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (navMid >= rect.top && navMid <= rect.bottom) {
          overDark = true;
        }
      });
      setNavDark(overDark);
    };

    window.addEventListener('scroll', checkNavOverlap, { passive: true });
    checkNavOverlap();
    return () => window.removeEventListener('scroll', checkNavOverlap);
  }, [loading, location]);

  useGSAP(() => {
    gsap.utils.toArray('.reveal-img').forEach(img => {
      gsap.fromTo(img,
        { scale: 1.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 90%',
          }
        }
      );
    });
  }, { dependencies: [loading] });

  const desktopNavLinks = [
    { label: 'Services', href: '/#services' },
    { label: 'Counselors', href: '/#counselors' },
    { label: 'Newsletter', to: '/newsletter' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <div className={`noise-overlay-container ${showLoader && loading ? 'min-h-[100dvh] overflow-hidden' : ''}`}>
      {showLoader && loading && <Loader onComplete={handleLoaderComplete} />}
      <div className="noise-overlay" />

      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <ScrollToHash />
      {!(showLoader && loading) && location.pathname !== '/boundaries-blueprint' && <NewsletterSticky />}

      <div className={showLoader && loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}>
        {/* Fixed Pill Navigation */}
        <nav className={`nav-pill fixed top-4 left-1/2 -translate-x-1/2 z-[40] w-[calc(100%-2rem)] max-w-6xl flex items-center justify-between backdrop-blur-xl border rounded-full px-4 md:px-8 py-3 transition-all duration-500 ${
          navDark
            ? 'bg-[#383838]/80 border-[#f5f2ed]/10 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.3)]'
            : 'bg-white/70 border-[#82a396]/20 shadow-[0_4px_20px_-6px_rgba(130,163,150,0.12)]'
        }`} role="navigation" aria-label="Main navigation">
          <Link to="/" className="flex items-center">
            <span className="hidden md:block">
              <AnimatedLogo animation="flow" variant="horizontal" size={90} colorMode={navDark ? 'dark' : 'light'} />
            </span>
            <span className="block md:hidden">
              <AnimatedLogo animation="flow" variant="mark" size={36} colorMode={navDark ? 'dark' : 'light'} />
            </span>
          </Link>
          <div className="hidden md:flex md:gap-4 lg:gap-8 items-center">
            {desktopNavLinks.map(t =>
              t.to ? (
                <Link key={t.label} to={t.to} className={`text-[12px] tracking-widest uppercase font-medium transition-colors font-[var(--font-heading)] ${
                  navDark ? 'text-[#f5f2ed] hover:text-[#82a396]' : 'text-[#82a396] hover:text-[#dd9e6f]'
                }`}>{t.label}</Link>
              ) : (
                <a key={t.label} href={t.href} className={`text-[12px] tracking-widest uppercase font-medium transition-colors font-[var(--font-heading)] ${
                  navDark ? 'text-[#f5f2ed] hover:text-[#82a396]' : 'text-[#82a396] hover:text-[#dd9e6f]'
                }`}>{t.label}</a>
              )
            )}
            <a href={INTAKE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '8px 24px' }}>Book now</a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileNavOpen(true)}
            className={`md:hidden transition-colors cursor-pointer ${navDark ? 'text-[#f5f2ed] hover:text-[#82a396]' : 'text-[#383838] hover:text-[#82a396]'}`}
            aria-label="Open navigation menu"
          >
            <List size={24} weight="light" />
          </button>
        </nav>

        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/newsletter" element={<NewsletterPage />} />
            <Route path="/newsletter/:slug" element={<NewsletterPostPage />} />
            <Route path="/boundaries-blueprint" element={<BoundariesBlueprintPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
