import { gsap } from 'gsap';

// Page-load sequence: AI & → DATA → SCIENCE → supporting text. No bounce.
export function playHeroIntro(root) {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  tl.fromTo(
    root.querySelectorAll('.hero__line > span'),
    { yPercent: 110 },
    { yPercent: 0, duration: 1.1, stagger: 0.12 }
  ).fromTo(
    root.querySelectorAll('[data-hero-fade]'),
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
    '-=0.5'
  );
  return tl;
}

// Title drifts 2px opposite to the pointer. Desktop only.
export function initHeroParallax(root) {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || reduce) return () => {};
  const title = root.querySelector('.hero__title');
  const x = gsap.quickTo(title, 'x', { duration: 0.8, ease: 'power3' });
  const y = gsap.quickTo(title, 'y', { duration: 0.8, ease: 'power3' });
  const move = (e) => {
    x(-(e.clientX / window.innerWidth - 0.5) * 4);
    y(-(e.clientY / window.innerHeight - 0.5) * 4);
  };
  window.addEventListener('mousemove', move, { passive: true });
  return () => window.removeEventListener('mousemove', move);
}
