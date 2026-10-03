import Lines from '../common/Lines';

export default function Intro() {
  return (
    <section className="intro theme-light" id="intro" aria-label="Introduction">
      <div className="intro__bg" data-bg-reveal />
      <div className="intro__inner">
        <Lines as="h2" className="display intro__title" lines={['WORKFLOW.', 'DATA.', 'TOOLS.']} />
        <p className="lead intro__lead" data-fade>
          I&apos;m drawn to coordination-heavy workflows and datasets that need a clearer way to explore.
        </p>
        <ul className="intro__words" data-scrub-words aria-label="Areas of work">
          <li>AI</li>
          <li>DATA</li>
          <li>SYSTEMS</li>
        </ul>
      </div>
    </section>
  );
}
