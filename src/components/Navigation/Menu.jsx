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
  const go = (e, href) => {
    e.preventDefault();
    onClose();
    setTimeout(() => scrollToTarget(href), 60);
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
