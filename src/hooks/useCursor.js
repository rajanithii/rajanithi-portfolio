import { useEffect } from 'react';
import { gsap } from 'gsap';

// Custom cursor: small dot, "VIEW" on [data-cursor="view"], arrow on links/buttons.
export default function useCursor(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) {
      el.style.display = 'none';
      return undefined;
    }
    document.documentElement.classList.add('has-cursor');
    const label = el.querySelector('.cursor__label');
    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
    const xTo = gsap.quickTo(el, 'x', { duration: 0.22, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.22, ease: 'power3' });
    let shown = false;

    const move = (e) => {
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { opacity: 1, duration: 0.3 });
        shown = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      const custom = t.closest('[data-cursor]');
      const kind = custom ? custom.dataset.cursor : t.closest('a, button') ? 'link' : '';
      if (kind) {
        el.dataset.state = kind;
        label.textContent = kind === 'view' ? 'VIEW' : '→';
      } else {
        delete el.dataset.state;
        label.textContent = '';
      }
    };
    const leave = () => {
      shown = false;
      gsap.to(el, { opacity: 0, duration: 0.2 });
    };

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', over);
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.documentElement.removeEventListener('mouseleave', leave);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [ref]);
}
