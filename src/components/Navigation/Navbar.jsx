import { useEffect, useState } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';
import { scrollToTarget } from '../../hooks/useLenis';
import Menu from './Menu';

const LINKS = [
  { label: 'WORK', href: '#work' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar({ ready }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('is-locked', open);
    if (window.__lenis) (open ? window.__lenis.stop() : window.__lenis.start());
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (e, href) => {
    e.preventDefault();
    scrollToTarget(href);
  };

  return (
    <>
      <header className={`nav ${ready ? 'is-ready' : ''}`} aria-hidden={!ready}>
        <a className="nav__logo" href="#top" onClick={(e) => go(e, '#main')}>
          RAJANITHI N
        </a>
        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>
              {l.label}
            </a>
          ))}
        </nav>
        <button
          className="nav__burger"
          type="button"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={26} strokeWidth={1.5} /> : <MenuIcon size={26} strokeWidth={1.5} />}
        </button>
      </header>
      <Menu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
