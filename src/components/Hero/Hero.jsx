import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { playHeroIntro, initHeroParallax } from '../../animations/heroAnimations';
import { prefersReducedMotion } from '../../animations/scrollAnimations';

export default function Hero({ ready }) {
  const root = useRef(null);

  // Hide before first paint (the loader covers it); content stays visible without JS / with reduced motion.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.set('.hero__line > span', { yPercent: 110 });
      gsap.set('[data-hero-fade]', { opacity: 0 });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!ready || prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => playHeroIntro(root.current), root);
    const off = initHeroParallax(root.current);
    return () => {
      ctx.revert();
      off();
    };
  }, [ready]);

  return (
    <section className="hero theme-dark" id="top" ref={root} aria-label="Introduction">
      <h1 className="hero__title" aria-label="AI and Data Science">
        {['AI &', 'DATA', 'SCIENCE'].map((t) => (
          <span className="hero__line" aria-hidden="true" key={t}>
            <span>{t}</span>
          </span>
        ))}
      </h1>
      <div className="hero__bottom">
        <div data-hero-fade>
          <p className="meta hero__role">SOFTWARE · DATA · APPLIED AI</p>
          <p className="hero__lead">
            Building tools for complex workflows.
          </p>
        </div>
        <div className="hero__scroll" data-hero-fade aria-hidden="true">
          <span className="meta">SCROLL ↓</span>
          <span className="hero__scroll-line" />
        </div>
      </div>
    </section>
  );
}
