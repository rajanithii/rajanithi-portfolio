import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Pinned storytelling only on large screens with motion allowed. Keep in sync with index.css.
export const PINNED_QUERY = '(min-width: 1024px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)';

// Generic, restrained reveals driven by data attributes:
//   [data-lines]        → masked line-by-line reveal (children: .line > span)
//   [data-fade]         → single fade/slide
//   [data-stagger]      → children fade in sequence
//   [data-scrub-words]  → children light up with scroll
//   [data-bg-reveal]    → background opens up (black → off-white)
//   [data-draw]         → hairline draws itself
export function initScrollAnimations() {
  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.utils.toArray('[data-lines]').forEach((el) => {
      gsap.from(el.querySelectorAll('.line > span'), {
        yPercent: 110,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });

    gsap.utils.toArray('[data-fade]').forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });

    gsap.utils.toArray('[data-stagger]').forEach((el) => {
      gsap.from(el.children, {
        opacity: 0,
        y: 20,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    });

    gsap.utils.toArray('[data-scrub-words]').forEach((el) => {
      gsap.fromTo(
        el.children,
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.4,
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 50%', scrub: true },
        }
      );
    });

    gsap.utils.toArray('[data-bg-reveal]').forEach((el) => {
      gsap.fromTo(
        el,
        { clipPath: 'inset(14% 5% 0% 5%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'top 25%', scrub: true },
        }
      );
    });

    gsap.utils.toArray('[data-draw]').forEach((el) => {
      gsap.from(el, {
        scale: 0,
        transformOrigin: 'left top',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });
  });
  return () => mm.revert();
}
