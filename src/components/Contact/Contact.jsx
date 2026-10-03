import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PINNED_QUERY } from '../../animations/scrollAnimations';
import { profile } from '../../data/profile';
import SmartLink from '../common/SmartLink';

gsap.registerPlugin(ScrollTrigger);

// Desktop: pinned, "HAVE AN IDEA?" gives way to "LET'S BUILD IT." Mobile/reduced motion: stacked.
export default function Contact() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(PINNED_QUERY, () => {
      const a = root.current.querySelector('.contact__a');
      const b = root.current.querySelector('.contact__b');
      gsap.set(b, { opacity: 0, yPercent: 12 });
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root.current, start: 'top top', end: '+=160%', pin: true, scrub: 0.8, anticipatePin: 1 },
      });
      tl.to({}, { duration: 0.6 })
        .to(a, { opacity: 0, yPercent: -12, duration: 0.8 })
        .to(b, { opacity: 1, yPercent: 0, duration: 0.8 }, '<0.3')
        .to({}, { duration: 0.6 });
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="contact theme-dark" id="contact" ref={root} aria-labelledby="contact-title">
      <h2 className="contact__stage" id="contact-title">
        <span className="contact__big contact__phrase contact__a">
          HAVE
          <br />
          AN
          <br />
          IDEA?
        </span>
        <span className="contact__big contact__phrase contact__b">
          LET&apos;S
          <br />
          BUILD
          <br />
          IT.
        </span>
      </h2>
      <ul className="contact__links">
        {profile.links.map((l) => (
          <li key={l.label}>
            <SmartLink href={l.href} className={`contact__link contact__link--${l.kind}`}>
              <span className="contact__label">{l.label}</span>
              <span className="contact__arrow" aria-hidden="true">
                →
              </span>
            </SmartLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
