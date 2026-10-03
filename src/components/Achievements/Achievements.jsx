import { achievements } from '../../data/achievements';
import { certificates } from '../../data/certificates';
import SmartLink from '../common/SmartLink';

export default function Achievements() {
  const groups = [
    { id: 'award', title: 'AWARDS', items: achievements.filter((item) => item.category === 'award') },
    { id: 'activity', title: 'PARTICIPATION & ACTIVITIES', items: achievements.filter((item) => item.category === 'activity') },
  ];

  return (
    <section className="ach theme-dark section" id="achievements" aria-labelledby="ach-title">
      <h2 className="display display--sm" id="ach-title" data-fade>
        ACHIEVEMENTS &amp; ACTIVITIES
      </h2>
      {groups.map((group) => (
        <div className="ach__group" key={group.id}>
          <h3 className="meta ach__group-title">{group.title}</h3>
          <ol className="ach__list">
            {group.items.map((a) => (
              <li className="ach__row" key={a.title}>
                <span className="ach__rule" data-draw aria-hidden="true" />
                <p className="meta ach__year">{a.year}</p>
                <p className="ach__mark" aria-hidden="true">
                  {a.mark}
                </p>
                <div className="ach__text">
                  <h4 className="ach__title">{a.title}</h4>
                  {a.org && <p className="ach__org">{a.org}</p>}
                  {a.detail && <p className="meta">{a.detail}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
      <div className="certs" aria-labelledby="certs-title">
        <h2 className="display display--sm" id="certs-title" data-fade>
          COURSERA CERTIFICATES
        </h2>
        <ol className="certs__list">
          {certificates.map((certificate, index) => (
            <li className="certs__row" key={certificate.title}>
              <span className="ach__rule" data-draw aria-hidden="true" />
              <p className="meta certs__number">{String(index + 1).padStart(2, '0')}</p>
              <h3 className="ach__title">{certificate.title}</h3>
              <SmartLink href={certificate.href} className="cta" data-cursor="link">
                VIEW CERTIFICATE <span aria-hidden="true">→</span>
              </SmartLink>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
