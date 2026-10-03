import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, pad } from '../../data/projects';
import { scrollToTarget } from '../../hooks/useLenis';

gsap.registerPlugin(ScrollTrigger);

// Fixed 01 / 02 / 03 indicator (desktop) and "01 / 03" counter (mobile).
export default function ProjectNav() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const wraps = gsap.utils.toArray('.project-wrap');
    if (!wraps.length) return undefined;
    const triggers = wraps.map((w, i) =>
      ScrollTrigger.create({
        trigger: w,
        start: 'top center',
        end: 'bottom center',
        onToggle: (s) => s.isActive && setActive(i),
      })
    );
    triggers.push(
      ScrollTrigger.create({
        trigger: wraps[0],
        endTrigger: wraps[wraps.length - 1],
        start: 'top center',
        end: 'bottom center',
        onToggle: (s) => setVisible(s.isActive),
      })
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <nav className={`pnav ${visible ? 'is-visible' : ''}`} aria-label="Projects">
      <ul className="pnav__list">
        {projects.map((p, i) => (
          <li key={p.id}>
            <button
              type="button"
              className="pnav__btn"
              aria-label={`Go to project ${i + 1}: ${p.name}`}
              aria-current={active === i ? 'true' : undefined}
              onClick={() => scrollToTarget(document.getElementById(`project-${pad(i + 1)}`))}
            >
              {pad(i + 1)}
            </button>
          </li>
        ))}
      </ul>
      <p className="pnav__count meta" aria-hidden="true">
        {pad(active + 1)} / {pad(projects.length)}
      </p>
    </nav>
  );
}
