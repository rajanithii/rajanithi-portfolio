import { useState } from 'react';
import { skillGroups, projectsUsing } from '../../data/skills';

// Editorial list. Hover / focus / tap reveals which projects actually use the technology
// (derived from projects.js — never hand-written).
export default function Technologies() {
  const [open, setOpen] = useState(null);
  return (
    <section className="tech theme-dark section" id="technologies" aria-labelledby="tech-title">
      <h2 className="display display--sm" id="tech-title" data-fade>
        TECHNOLOGIES
      </h2>
      <div className="tech__groups">
        {skillGroups.map((g) => (
          <div className="tech__group" key={g.id} data-fade>
            <h3 className="meta tech__label">
              {g.id} / {g.title}
            </h3>
            <ul className="tech__list">
              {g.items.map((item) => {
                const used = projectsUsing(item);
                const key = `${g.id}-${item}`;
                return (
                  <li key={key}>
                    {used.length ? (
                      <button
                        type="button"
                        className={`tech__item ${open === key ? 'is-open' : ''}`}
                        aria-expanded={open === key}
                        onClick={() => setOpen(open === key ? null : key)}
                      >
                        <span className="tech__name">{item}</span>
                        <span className="tech__rel meta">{used.join(' / ')}</span>
                      </button>
                    ) : (
                      <span className="tech__item tech__item--static">
                        <span className="tech__name">{item}</span>
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
