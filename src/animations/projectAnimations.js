import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// One pinned timeline per project. Frames (1 unit each):
//  0 title · 1 visual appears · 2 data flow / chart draws · 3 technologies · 4 description · 5 CTA · 6 chapter exit
// Each movement explains something: the system, the flow, the data.
export function buildProjectTimeline(section, { hasNext }) {
  const $ = (s) => gsap.utils.toArray(section.querySelectorAll(s));
  const nodes = $('[data-node]');
  const links = $('[data-link]');
  const grid = $('[data-grid]');
  const points = $('[data-point]');
  const tech = $('[data-tech]');
  const line = section.querySelector('[data-chart-line]');
  const desc = section.querySelector('[data-desc]');
  const cta = section.querySelector('[data-cta]');
  const caption = section.querySelector('[data-caption]');
  const content = section.querySelector('.project__inner');
  const transition = section.querySelector('[data-transition]');

  if (nodes.length) gsap.set(nodes, { opacity: 0, y: 16 });
  if (links.length) gsap.set(links, { scaleY: 0, transformOrigin: 'top center' });
  if (grid.length) gsap.set(grid, { scaleX: 0, transformOrigin: 'left center' });
  if (points.length) gsap.set(points, { opacity: 0 });
  if (line) gsap.set(line, { strokeDashoffset: 1 });
  gsap.set(tech, { opacity: 0, y: 12 });
  gsap.set([desc, cta, caption].filter(Boolean), { opacity: 0, y: 16 });
  if (transition) gsap.set(transition, { opacity: 0 });

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: section, start: 'top top', end: '+=350%', pin: true, scrub: 0.8, anticipatePin: 1 },
  });

  if (caption) tl.to(caption, { opacity: 1, y: 0, duration: 0.5 }, 1);
  if (grid.length) tl.to(grid, { scaleX: 1, duration: 0.5, stagger: { amount: 0.5 } }, 1);
  if (nodes.length) tl.to(nodes, { opacity: 1, y: 0, duration: 0.3, stagger: { amount: 0.7 } }, 1);
  if (links.length) tl.to(links, { scaleY: 1, duration: 0.3, stagger: { amount: 0.7 } }, 2);
  if (nodes.length) tl.to(nodes, { borderColor: 'rgba(255,255,255,0.95)', duration: 0.2, stagger: { amount: 0.8 } }, 2.1);
  if (line) tl.to(line, { strokeDashoffset: 0, duration: 1 }, 2);
  if (points.length) tl.to(points, { opacity: 1, duration: 0.2, stagger: { amount: 0.5 } }, 2.7);
  tl.to(tech, { opacity: 1, y: 0, duration: 0.3, stagger: { amount: 0.7 } }, 3);
  if (desc) tl.to(desc, { opacity: 1, y: 0, duration: 0.6 }, 4);
  if (cta) tl.to(cta, { opacity: 1, y: 0, duration: 0.6 }, 5);

  if (hasNext && transition) {
    tl.to(content, { opacity: 0, duration: 0.6 }, 6.4);
    tl.to(transition, { opacity: 1, duration: 0.4 }, 6.9);
    tl.to({}, { duration: 0.4 }, 7.3);
  } else {
    tl.to({}, { duration: 1 }, 6);
  }
  return tl;
}

// Mobile projects stay in normal document flow; content reveals as the reader scrolls.
export function buildMobileProjectTimeline(section) {
  const meta = section.querySelector('.project__meta');
  const title = section.querySelector('.project__title');
  const subtitle = section.querySelector('.project__subtitle');
  const visual = section.querySelector('.project__visual');
  const caption = section.querySelector('.project__caption');
  const nodes = gsap.utils.toArray(section.querySelectorAll('[data-node]'));
  const links = gsap.utils.toArray(section.querySelectorAll('[data-link]'));
  const grid = gsap.utils.toArray(section.querySelectorAll('[data-grid]'));
  const points = gsap.utils.toArray(section.querySelectorAll('[data-point]'));
  const line = section.querySelector('[data-chart-line]');
  const statement = section.querySelector('[data-statement]');
  const description = section.querySelector('[data-description]');
  const tech = gsap.utils.toArray(section.querySelectorAll('[data-tech]'));
  const cta = section.querySelector('[data-cta]');
  const steps = [meta, title, subtitle, visual, caption, statement, description, ...tech, cta].filter(Boolean);

  gsap.set(steps, { autoAlpha: 0, y: 14 });
  if (nodes.length) gsap.set(nodes, { autoAlpha: 0, y: 12 });
  if (links.length) gsap.set(links, { scaleY: 0, transformOrigin: 'top center' });
  if (grid.length) gsap.set(grid, { autoAlpha: 0 });
  if (points.length) gsap.set(points, { autoAlpha: 0 });
  if (line) gsap.set(line, { strokeDashoffset: 1 });

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: section,
      start: 'top 82%',
      end: 'bottom 18%',
      scrub: 0.45,
    },
  });

  [meta, title, subtitle].filter(Boolean).forEach((el) => {
    tl.to(el, { autoAlpha: 1, y: 0, duration: 0.55 });
  });
  if (visual) tl.to(visual, { autoAlpha: 1, y: 0, duration: 0.45 });

  if (line) {
    tl.to(grid, { autoAlpha: 1, duration: 0.35 });
    tl.to(line, { strokeDashoffset: 0, duration: 1 });
    tl.to(points, { autoAlpha: 1, duration: 0.2, stagger: 0.08 });
  } else {
    nodes.forEach((node, index) => {
      tl.to(node, { autoAlpha: 1, y: 0, duration: 0.3 });
      if (links[index]) tl.to(links[index], { scaleY: 1, duration: 0.25 });
    });
  }

  if (caption) tl.to(caption, { autoAlpha: 1, y: 0, duration: 0.35 });
  tl.to(tech, { autoAlpha: 1, y: 0, duration: 0.25, stagger: 0.08 });
  if (statement) tl.to(statement, { autoAlpha: 1, y: 0, duration: 0.5 });
  if (description) tl.to(description, { autoAlpha: 1, y: 0, duration: 0.5 });
  if (cta) tl.to(cta, { autoAlpha: 1, y: 0, duration: 0.4 });

  return tl;
}
