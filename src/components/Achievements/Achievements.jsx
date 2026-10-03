import { achievements } from '../../data/achievements';

export default function Achievements() {
  return (
    <section className="ach theme-dark section" id="achievements" aria-labelledby="ach-title">
      <h2 className="display display--sm" id="ach-title" data-fade>
        ACHIEVEMENTS
      </h2>
      <ol className="ach__list">
        {achievements.map((a) => (
          <li className="ach__row" key={a.title}>
            <span className="ach__rule" data-draw aria-hidden="true" />
            <p className="meta ach__year">{a.year}</p>
            <p className="ach__mark" aria-hidden="true">
              {a.mark}
            </p>
            <div className="ach__text">
              <h3 className="ach__title">{a.title}</h3>
              {a.org && <p className="ach__org">{a.org}</p>}
              {a.detail && <p className="meta">{a.detail}</p>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
