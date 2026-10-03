import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Smooth scroll, synced with ScrollTrigger. Stopped until `active` is true (loader).
export default function useLenis(active) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.stop();
    ref.current = lenis;
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = null;
      ref.current = null;
    };
  }, []);

  useEffect(() => {
    const l = ref.current;
    if (!l) return;
    if (active) l.start();
    else l.stop();
  }, [active]);
}

// Works with or without Lenis (reduced motion).
export function scrollToTarget(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  const l = window.__lenis;
  if (l) {
    l.scrollTo(typeof target === 'number' ? target : el, { duration: 1.4, force: true });
    return;
  }
  if (typeof target === 'number') window.scrollTo(0, target);
  else if (el) el.scrollIntoView();
}
