export default function About() {
  return (
    <section className="about theme-light section" id="about" aria-labelledby="about-title">
      <div className="about__grid">
        <h2 className="display" id="about-title" data-fade>
          ABOUT
        </h2>
        <div className="about__body">
          <p className="lead about__lead" data-fade>
            I&apos;m Rajanithi, studying Artificial Intelligence and Data Science at Dhanalakshmi Srinivasan University.
          </p>
          <dl className="about__facts" data-stagger>
            <div>
              <dt className="meta">CURRENTLY</dt>
              <dd>
                B.Tech
                <br />
                Artificial Intelligence &amp; Data Science
                <br />
                Dhanalakshmi Srinivasan University
                <br />
                2024 — 2028
              </dd>
            </div>
            <div>
              <dt className="meta">BASED IN</dt>
              <dd>Tamil Nadu, India</dd>
            </div>
            <div>
              <dt className="meta">FOCUS</dt>
              <dd>Software · Data · Applied AI</dd>
            </div>
            <div>
              <dt className="meta">CURRENTLY LEARNING</dt>
              <dd>
                System Design
                <br />
                Machine Learning
                <br />
                Data Engineering
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
