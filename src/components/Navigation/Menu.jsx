import { useEffect, useRef } from 'react';
import { scrollToTarget } from '../../hooks/useLenis';
import { profile } from '../../data/profile';
import SmartLink from '../common/SmartLink';

const MAIN = [
  { label: 'WORK', href: '#work' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
];

// Fullscreen mobile menu. Hidden (visibility) when closed so it is never focusable.
export default function Menu({ open, onClose }) {
  const navigateTimer = useRef(null);

  useEffect(() => {
    if (open && navigateTimer.current) {
      clearTimeout(navigateTimer.current);
      navigateTimer.current = null;
    }
  }, [open]);

  useEffect(
    () => () => {
      if (navigateTimer.current) clearTimeout(navigateTimer.current);
    },
    []
  );

  const go = (e, href) => {
    e.preventDefault();
    onClose();
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 460;
    navigateTimer.current = setTimeout(() => {
      navigateTimer.current = null;
      scrollToTarget(href);
    }, delay);
  };
  return (
    <div id="menu" className={`menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <nav aria-label="Mobile">
        <ul className="menu__main">
          {MAIN.map((l, i) => (
            <li key={l.href} style={{ '--i': i }}>
              <a href={l.href} onClick={(e) => go(e, l.href)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <ul className="menu__sub">
        {profile.social.map((l, i) => (
          <li key={l.label} style={{ '--i': i + 3 }}>
            <SmartLink href={l.href} onClick={onClose}>
              {l.label}
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
