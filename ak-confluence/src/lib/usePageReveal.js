import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Fade-up entrance for a page's main blocks — same feel as the contact page hero.
// Attach the returned ref to a wrapper and add `reveal-up` to elements you want staggered in.
// Pass `deps` when the revealed content mounts after an async load (e.g. a post fetch),
// so the animation re-runs once those elements are in the DOM.
export function usePageReveal(deps = []) {
  const scope = useRef(null);
  useGSAP(() => {
    gsap.fromTo('.reveal-up',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, stagger: 0.08, ease: 'power3.out' }
    );
  }, { scope, dependencies: deps });
  return scope;
}
