import { Fragment, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { projects, pad } from '../../data/projects';
import { buildProjectTimeline } from '../../animations/projectAnimations';
import { PINNED_QUERY } from '../../animations/scrollAnimations';
import FlowVisual from './FlowVisual';
import ChartVisual from './ChartVisual';

const Br = ({ lines }) =>
  lines.map((l, i) => (
    <Fragment key={l}>
      {l}
      {i < lines.length - 1 && <br />}
    </Fragment>
  ));

export default function ProjectSection({ project: name, onOpenCaseStudy }) {
  const idx = projects.findIndex((p) => p.name === name);
  const p = projects[idx];
  const num = pad(idx + 1);
  const hasNext = idx < projects.length - 1;
  const ref = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(PINNED_QUERY, () => {
      buildProjectTimeline(ref.current, { hasNext });
    });
    return () => mm.revert();
  }, [hasNext]);

  if (!p) return null;
  const { visual } = p;

  return (
    <div className="project-wrap" id={`project-${num}`}>
      <section className="project theme-dark" ref={ref} aria-labelledby={`${p.id}-title`}>
        <div className="project__inner">
          <div className="project__text">
            <p className="project__meta meta">
              <span>
                {num} / {p.category}
              </span>
              {p.year && <span>{p.year}</span>}
            </p>
            <h2 className="project__title" id={`${p.id}-title`} aria-label={p.name}>
              {p.titleLines.map((l) => (
                <span key={l} className="project__title-line" aria-hidden="true">
                  {l}
                </span>
              ))}
            </h2>
            <p className="project__subtitle">
              <Br lines={p.subtitle} />
            </p>

            <div className="project__body">
              <div data-desc>
                {p.statement && (
                  <p className="project__statement">
                    <Br lines={p.statement} />
                  </p>
                )}
                <p className="project__desc">{p.description}</p>
              </div>
              <button
                type="button"
                className="cta"
                data-cta
                data-cursor="view"
                onClick={() => onOpenCaseStudy(p.id)}
              >
                VIEW CASE STUDY <span aria-hidden="true">→</span>
              </button>
            </div>

            <ul className="project__tech meta" aria-label={`${p.name} technologies`}>
              {p.technologies.map((t) => (
                <li key={t} data-tech>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="project__visual">
            {visual.type === 'flow' && <FlowVisual layers={visual.layers} label={visual.label} />}
            {visual.type === 'chart' && <ChartVisual points={visual.points} label={visual.label} />}
            <p className="meta project__caption" data-caption>
              {visual.caption}
              {visual.placeholder && ' — ILLUSTRATIVE SHAPE, REAL DATA TO BE ADDED'}
            </p>
          </div>
        </div>

        {hasNext && (
          <div className="project__transition" data-transition aria-hidden="true">
            {num} → {pad(idx + 2)}
          </div>
        )}
      </section>
    </div>
  );
}
