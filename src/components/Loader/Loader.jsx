import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { prefersReducedMotion } from '../../animations/scrollAnimations';

const NAME = 'RAJANITHI N'.split('');

// ~1.8s total: counter 0→100, text exits upward, screen splits vertically, hero begins.
export default function Loader({ onReveal }) {
  const [done, setDone] = useState(false);
  const root = useRef(null);
  const counter = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      onReveal();
      setDone(true);
      return undefined;
    }
    const ctx = gsap.context(() => {
      const obj = { v: 0 };
      const chars = root.current.querySelectorAll('.loader__ch');
      const sub = root.current.querySelector('.loader__sub');
      const tl = gsap.timeline({ onComplete: () => setDone(true) });
      tl.from(chars, { yPercent: 110, duration: 0.6, ease: 'power4.out', stagger: 0.03 }, 0)
        .from(sub, { opacity: 0, duration: 0.5 }, 0.3)
        .to(
          obj,
          {
            v: 100,
            duration: 0.9,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (counter.current) counter.current.textContent = String(Math.round(obj.v)).padStart(3, '0');
            },
          },
          0.1
        )
        .to([chars, sub], { yPercent: -120, opacity: 0, duration: 0.35, ease: 'power3.in', stagger: 0.015 }, 1.05)
        .to('.loader__panel--top', { yPercent: -100, duration: 0.6, ease: 'power4.inOut' }, 1.25)
        .to('.loader__panel--bottom', { yPercent: 100, duration: 0.6, ease: 'power4.inOut' }, 1.25)
        .to('.loader__count', { opacity: 0, duration: 0.2 }, 1.25)
        .call(onReveal, null, 1.5);
    }, root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (done) return null;
  return (
    <div className="loader" ref={root} role="status" aria-label="Loading">
      <div className="loader__panel loader__panel--top" />
      <div className="loader__panel loader__panel--bottom" />
      <div className="loader__center">
        <p className="loader__name" aria-hidden="true">
          {NAME.map((c, i) => (
            <span className="loader__mask" key={i}>
              <span className="loader__ch">{c === ' ' ? '\u00A0' : c}</span>
            </span>
          ))}
        </p>
        <p className="loader__sub meta">AI &amp; DATA SCIENCE</p>
      </div>
      <p className="loader__count meta" aria-hidden="true">
        LOADING <span ref={counter}>000</span>%
      </p>
    </div>
  );
}
