import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';
import { projects, pad } from '../../data/projects';
import { prefersReducedMotion } from '../../animations/scrollAnimations';
import SmartLink from '../common/SmartLink';

const Placeholder = () => <p className="case__todo">Details to be added.</p>;

// Fullscreen overlay: wipes in from the bottom. Focus is trapped; Escape closes.
export default function ProjectCaseStudy({ project: p, onClose }) {
  const root = useRef(null);
  const closeBtn = useRef(null);
  const idx = projects.findIndex((x) => x.id === p.id);
  const cs = p.caseStudy;

  const architecture =
    cs.architecture ||
    (p.visual.layers ? p.visual.layers.map((l) => l.join(' + ')).join(' → ') : null);

  const close = () => {
    if (prefersReducedMotion()) return onClose();
    gsap.to(root.current, { clipPath: 'inset(100% 0% 0% 0%)', duration: 0.6, ease: 'power4.inOut', onComplete: onClose });
    return undefined;
  };

  useEffect(() => {
    const opener = document.activeElement;
    document.documentElement.classList.add('is-locked');
    if (window.__lenis) window.__lenis.stop();

    if (prefersReducedMotion()) {
      closeBtn.current.focus();
    } else {
      gsap.fromTo(
        root.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power4.inOut', onComplete: () => closeBtn.current.focus() }
      );
    }

    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') {
        const f = root.current.querySelectorAll('a[href], button');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('is-locked');
      if (window.__lenis) window.__lenis.start();
      if (opener && opener.focus) opener.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="case theme-light" ref={root} role="dialog" aria-modal="true" aria-labelledby="case-title" data-lenis-prevent>
      <div className="case__inner">
        <div className="case__top">
          <p className="meta">
            {pad(idx + 1)} / {p.category}
          </p>
          <button type="button" className="case__close" ref={closeBtn} onClick={close} aria-label="Close case study">
            <X size={32} strokeWidth={1.25} />
          </button>
        </div>
        <h2 className="display display--md" id="case-title">
          {p.name.toUpperCase().replace(' ', '')}
        </h2>

        <div className="case__rows">
          <section className="case__row">
            <h3 className="meta">PROBLEM</h3>
            {cs.problem ? <p className="lead">{cs.problem}</p> : <Placeholder />}
          </section>
          <section className="case__row">
            <h3 className="meta">APPROACH</h3>
            {cs.approach ? <p className="lead">{cs.approach}</p> : <Placeholder />}
          </section>
          <section className="case__row">
            <h3 className="meta">ARCHITECTURE</h3>
            {architecture ? <p className="lead">{architecture}</p> : <Placeholder />}
          </section>
          <section className="case__row">
            <h3 className="meta">TECHNOLOGIES</h3>
            <p className="lead">{p.technologies.join(' · ')}</p>
          </section>
          <section className="case__row">
            <h3 className="meta">STATUS</h3>
            {cs.status ? <p className="lead">{cs.status}</p> : <Placeholder />}
          </section>
        </div>

        <div className="case__foot" aria-labelledby="case-proof-title">
          <h3 className="meta case__proof-title" id="case-proof-title">PROJECT PROOF</h3>
          <div className="case__proof-links">
            {cs.demo && (
              <SmartLink
                href={cs.demo}
                className="cta"
                data-cursor="link"
                aria-label={`${p.name} live demo (opens in a new tab)`}
              >
                LIVE DEMO <span aria-hidden="true">↗</span>
              </SmartLink>
            )}
            {cs.github ? (
              <SmartLink
                href={cs.github}
                className="cta"
                data-cursor="link"
                aria-label={`${p.name} source repository (opens in a new tab)`}
              >
                SOURCE / GITHUB <span aria-hidden="true">↗</span>
              </SmartLink>
            ) : (
              <p className="case__todo">Repository link to be added.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
