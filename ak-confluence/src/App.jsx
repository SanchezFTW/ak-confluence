import { useEffect, useRef, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { List, X, FacebookLogo, InstagramLogo, CaretDown } from '@phosphor-icons/react';
import { AnimatedLogo } from './components/brand/AnimatedLogo';
import NewsletterSignup from './components/NewsletterSignup';
import NewsletterSticky from './components/NewsletterSticky';
import Home from './pages/Home';
import ContactPage from './pages/ContactPage';
import NewsletterPage from './pages/NewsletterPage';
import NewsletterPostPage from './pages/NewsletterPostPage';
import BoundariesBlueprintPage from './pages/BoundariesBlueprintPage';
import WhatTherapyPage from './pages/WhatTherapyPage';
import EventsPage from './pages/EventsPage';
import CmsPage from './pages/CmsPage';
import ServicePage from './pages/ServicePage';
import WorkshopPage from './pages/WorkshopPage';
import CounselorPage from './pages/CounselorPage';
import NotFoundPage from './pages/NotFoundPage';
import { getSiteSettings, resolveSiteLink } from './lib/sanity';
import {PageMetadataContext} from './lib/usePageMetadata';

gsap.registerPlugin(ScrollTrigger);

const INTAKE_URL = 'https://elly.clientsecure.me/contact-widget';
const LOADER_SEEN_KEY = 'ak_loader_seen';

const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com/akconfluences/', Icon: FacebookLogo },
  { label: 'Instagram', href: 'https://www.instagram.com/akconfluence/', Icon: InstagramLogo },
];

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
function MobileNav({ isOpen, onClose, links, primaryCta }) {
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
        {links.map((link) =>
          link.href.startsWith('/') && !link.openInNewTab ? (
            <Link
              key={link.label}
              to={link.href}
              onClick={onClose}
              className="mobile-nav-link font-[var(--font-heading)] text-[#f5f2ed] text-4xl hover:text-[#82a396] transition-colors"
            >
              {link.label}
            </Link>
          ) : (
            <a
              key={link.label}
              href={link.href}
              target={link.openInNewTab ? '_blank' : undefined}
              rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
              onClick={onClose}
              className="mobile-nav-link font-[var(--font-heading)] text-[#f5f2ed] text-4xl hover:text-[#82a396] transition-colors"
            >
              {link.label}
            </a>
          )
        )}
        {primaryCta.href && <a
          href={primaryCta.href}
          target={primaryCta.openInNewTab ? '_blank' : undefined}
          rel={primaryCta.openInNewTab ? 'noopener noreferrer' : undefined}
          onClick={onClose}
          className="mobile-nav-link mt-4 bg-[#82a396] text-[#0a0a0a] px-8 py-3 text-[10px] tracking-[0.2em] uppercase font-medium font-[var(--font-mono)] hover:bg-[#90b8a0] transition-colors"
        >
          {primaryCta.label}
        </a>}
      </nav>
    </div>
  );
}

//
// ─────────────── FOOTER ───────────────
//
function Footer({settings}) {
  const location = useLocation();
  // Skip the duplicate embed on the dedicated lead-magnet page — it has its own MailerLite form.
  const hideNewsletter = location.pathname === '/boundaries-blueprint';

  return (
    <footer id="contact" data-nav-dark className="text-[#f5f2ed] scroll-mt-24">
      {/* Newsletter signup */}
      {!hideNewsletter && (
        <div id="newsletter" className="bg-[#383838] py-14 lg:py-16 px-6 lg:px-20 scroll-mt-24">
          <NewsletterSignup heading={settings?.newsletterHeading} copy={settings?.newsletterCopy} confirmation={settings?.newsletterConfirmation} />
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
                {settings?.footerTagline || 'Together. Making a plan for intentional change.'}
              </p>
            </div>

            {/* Location */}
            <div className="md:col-span-2 md:col-start-6">
              <h4 className="font-[var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-[#82a396] mb-4">Location</h4>
              <div className="flex flex-col gap-2 font-[var(--font-body)] text-[#f5f2ed]/50 text-sm">
                <span>{[settings?.officeAddress?.street, settings?.officeAddress?.city, settings?.officeAddress?.region, settings?.officeAddress?.postalCode].filter(Boolean).join(', ') || 'Anchorage, Alaska'}</span>
                <span>Virtual across AK</span>
              </div>
            </div>

            {/* Contact */}
            <div className="md:col-span-3">
              <h4 className="font-[var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-[#82a396] mb-4">Contact</h4>
              <div className="flex flex-col gap-2 font-[var(--font-body)] text-[#f5f2ed]/50 text-sm">
                <a href={`mailto:${settings?.publicEmail || 'info@akconfluence.com'}`} className="hover:text-[#f5f2ed] transition-colors">{settings?.publicEmail || 'info@akconfluence.com'}</a>
                <a href={`tel:${(settings?.publicPhone || '907-313-4433').replace(/[^+\d]/g, '')}`} className="hover:text-[#f5f2ed] transition-colors">Call or Text: {settings?.publicPhone || '(907) 313-4433'}</a>
              </div>
            </div>

            {/* Hours */}
            <div className="md:col-span-2">
              <h4 className="font-[var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-[#82a396] mb-4">Hours</h4>
              <div className="flex flex-col gap-2 font-[var(--font-body)] text-[#f5f2ed]/50 text-sm">
                {(settings?.officeHours?.length ? settings.officeHours.map((hours) => `${hours.days}: ${hours.opens}–${hours.closes}`) : ['Mon–Fri: 8am–6pm', 'Sat: 8am–2pm']).map((hours) => <span key={hours}>{hours}</span>)}
              </div>
            </div>
          </div>
          {settings?.footerLinkGroups?.length > 0 && <nav aria-label="Footer links" className="mt-10 border-t border-white/10 pt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {settings.footerLinkGroups.map((group) => <div key={group.title}><h4 className="font-[var(--font-mono)] text-[10px] tracking-[0.2em] uppercase text-[#82a396] mb-3">{group.title}</h4><ul className="space-y-2">{group.links?.map((link) => {
              const href = resolveSiteLink(link)
              return href ? <li key={`${link.label}-${href}`}>{href.startsWith('/') && !link.openInNewTab ? <Link to={href} className="text-sm text-[#f5f2ed]/50 hover:text-[#f5f2ed]">{link.label}</Link> : <a href={href} target={link.openInNewTab ? '_blank' : undefined} rel={link.openInNewTab ? 'noopener noreferrer' : undefined} className="text-sm text-[#f5f2ed]/50 hover:text-[#f5f2ed]">{link.label}</a>}</li> : null
            })}</ul></div>)}
          </nav>}
        </div>
      </div>

      {/* Legal Footer */}
      <div className="bg-[#222222] py-5 px-6 lg:px-20">
        <div className="max-w-[1100px] mx-auto flex flex-col-reverse md:flex-row justify-center md:justify-between items-center gap-3 text-[#f5f2ed]/20 text-xs font-[var(--font-body)]">
          <span>&copy; {new Date().getFullYear()} Confluence LLC. All rights reserved.</span>
          <div className="flex items-center gap-4">
            {(settings?.socialLinks?.length ? settings.socialLinks.map((link) => ({label: link.platform, href: link.url, Icon: link.platform === 'Facebook' ? FacebookLogo : link.platform === 'Instagram' ? InstagramLogo : null})).filter((link) => link.href) : SOCIAL_LINKS).map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-[#f5f2ed]/40 hover:text-[#82a396] transition-colors"
              >
                {Icon ? <Icon size={18} weight="light" /> : <span className="text-xs">{label}</span>}
              </a>
            ))}
          </div>
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

function useAnnouncementActive(announcement) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const nextChange = [announcement?.startsAt, announcement?.endsAt]
      .map((value) => value ? new Date(value).getTime() : null)
      .filter((value) => value && value > Date.now())
      .sort((a, b) => a - b)[0];
    if (!nextChange) return undefined;
    const timer = window.setTimeout(() => setNow(Date.now()), Math.min(nextChange - Date.now() + 20, 2147483647));
    return () => window.clearTimeout(timer);
  }, [announcement?.startsAt, announcement?.endsAt, now]);

  return Boolean(announcement?.enabled && announcement.message
    && (!announcement.startsAt || new Date(announcement.startsAt).getTime() <= now)
    && (!announcement.endsAt || new Date(announcement.endsAt).getTime() > now));
}

function AnnouncementBar({announcement}) {
  const active = useAnnouncementActive(announcement);
  const href = resolveSiteLink(announcement?.link);
  if (!active) return null;

  return (
    <div role="status" aria-live="polite" className="fixed top-0 inset-x-0 z-[35] bg-[#e8e4dc] text-[#383838] text-center px-14 py-3 text-sm">
      {href && announcement.link.openInNewTab
        ? <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{announcement.message}</a>
        : href?.startsWith('/')
          ? <Link to={href} className="underline underline-offset-2">{announcement.message}</Link>
          : href
            ? <a href={href} className="underline underline-offset-2">{announcement.message}</a>
            : announcement.message}
    </div>
  )
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
  const [siteSettings, setSiteSettings] = useState(null);

  useEffect(() => {
    let active = true;
    getSiteSettings()
      .then((data) => { if (active) setSiteSettings(data); })
      .catch((error) => console.error('Failed to load site settings', error));
    return () => { active = false; };
  }, []);

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

  const fallbackNavLinks = [
    {label: 'Services', href: '/#services'},
    {label: 'Counselors', href: '/#counselors'},
    {label: 'Newsletter', href: '/newsletter'},
    {label: 'Contact', href: '/contact'},
  ];
  const desktopNavLinks = siteSettings?.headerNavigation?.length
    ? siteSettings.headerNavigation.map((link) => ({label: link.label, href: resolveSiteLink(link), openInNewTab: link.openInNewTab})).filter((link) => link.href)
    : fallbackNavLinks;
  const primaryCta = siteSettings?.primaryConsultationLink
    ? {label: siteSettings.primaryConsultationLink.label, href: resolveSiteLink(siteSettings.primaryConsultationLink), openInNewTab: siteSettings.primaryConsultationLink.openInNewTab}
    : {label: 'Book now', href: INTAKE_URL, openInNewTab: true};
  const announcementVisible = useAnnouncementActive(siteSettings?.announcement);

  return (
    <div className={`noise-overlay-container ${showLoader && loading ? 'min-h-[100dvh] overflow-hidden' : ''}`}>
      {showLoader && loading && <Loader onComplete={handleLoaderComplete} />}
      <div className="noise-overlay" />

      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} links={desktopNavLinks} primaryCta={primaryCta} />
      <ScrollToHash />
      <AnnouncementBar announcement={siteSettings?.announcement} />
      {!(showLoader && loading) && location.pathname !== '/boundaries-blueprint' && <NewsletterSticky settings={siteSettings} />}

      <div className={showLoader && loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}>
        {/* Fixed Pill Navigation */}
        <nav className={`nav-pill fixed ${announcementVisible ? 'top-[4.5rem]' : 'top-4'} left-1/2 -translate-x-1/2 z-[40] w-[calc(100%-2rem)] max-w-6xl flex items-center justify-between backdrop-blur-xl border rounded-full px-4 md:px-8 py-3 transition-all duration-500 ${
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
            {desktopNavLinks.map((t) => {
              const className = `inline-flex items-center gap-1 text-[12px] tracking-widest uppercase font-medium transition-colors font-[var(--font-heading)] ${
                navDark ? 'text-[#f5f2ed] hover:text-[#82a396]' : 'text-[#82a396] hover:text-[#dd9e6f]'
              }`;
              const content = (
                <>
                  {t.label}
                  {t.caret && <CaretDown size={10} weight="bold" />}
                </>
              );
              return t.href.startsWith('/') && !t.openInNewTab
                ? <Link key={t.label} to={t.href} className={className}>{content}</Link>
                : <a key={t.label} href={t.href} target={t.openInNewTab ? '_blank' : undefined} rel={t.openInNewTab ? 'noopener noreferrer' : undefined} className={className}>{content}</a>;
            })}
            {primaryCta.href && <a href={primaryCta.href} target={primaryCta.openInNewTab ? '_blank' : undefined} rel={primaryCta.openInNewTab ? 'noopener noreferrer' : undefined} className="btn-primary" style={{ padding: '8px 24px' }}>{primaryCta.label}</a>}
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
          <PageMetadataContext.Provider value={siteSettings?.defaultSeo}>
          <Routes>
            <Route path="/what-therapy-might-i-need" element={<WhatTherapyPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactPage settings={siteSettings} />} />
            <Route path="/newsletter" element={<NewsletterPage />} />
            <Route path="/newsletter/:slug" element={<NewsletterPostPage />} />
            <Route path="/boundaries-blueprint" element={<BoundariesBlueprintPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="/workshops/:slug" element={<WorkshopPage />} />
            <Route path="/counselors/:slug" element={<CounselorPage />} />
            <Route path="/:slug" element={<CmsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          </PageMetadataContext.Provider>
        </main>

        <Footer settings={siteSettings} />
      </div>
    </div>
  );
}

export default App;
