import Lines from '../common/Lines';
import { projects, pad } from '../../data/projects';

export default function WorkIntro() {
  return (
    <section className="workintro theme-dark section" id="work" aria-labelledby="work-title">
      <div className="workintro__meta meta">
        <span>SELECTED WORK</span>
        <span>{pad(projects.length)} PROJECTS</span>
      </div>
      <Lines as="h2" id="work-title" className="display display--md" lines={['SYSTEMS.', 'DATA.', 'INTELLIGENCE.']} />
      <p className="lead workintro__lead" data-fade>
        From emergency coordination to climate datasets and claim review.
      </p>
    </section>
  );
}
