import { education } from '../../data/education';

// Horizontal timeline on desktop, vertical on mobile (CSS only).
export default function Education() {
  return (
    <section className="edu theme-light section" id="education" aria-labelledby="edu-title">
      <h2 className="display display--sm" id="edu-title" data-fade>
        EDUCATION
      </h2>
      <ol className="edu__track">
        <span className="edu__line" data-draw aria-hidden="true" />
        {education.map((e) => (
          <li className="edu__item" key={e.range} data-fade>
            <p className="meta">{e.range}</p>
            <h3 className="edu__title">{e.title}</h3>
            {e.lines.map((l) => (
              <p className="edu__line-text" key={l}>
                {l}
              </p>
            ))}
            <p className="edu__school">{e.school}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
