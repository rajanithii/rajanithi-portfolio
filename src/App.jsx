import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useLenis from './hooks/useLenis';
import useCursor from './hooks/useCursor';
import { initScrollAnimations } from './animations/scrollAnimations';
import { projects } from './data/projects';
import Loader from './components/Loader/Loader';
import Navbar from './components/Navigation/Navbar';
import Hero from './components/Hero/Hero';
import Intro from './components/Intro/Intro';
import WorkIntro from './components/Work/WorkIntro';
import ProjectSection from './components/Work/ProjectSection';
import ProjectCaseStudy from './components/Work/ProjectCaseStudy';
import ProjectNav from './components/Work/ProjectNav';
import Technologies from './components/Technologies/Technologies';
import About from './components/About/About';
import Education from './components/Education/Education';
import Achievements from './components/Achievements/Achievements';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

export default function App() {
  const [ready, setReady] = useState(false);
  const [caseId, setCaseId] = useState(null);
  const cursorRef = useRef(null);

  useLenis(ready);
  useCursor(cursorRef);

  useEffect(() => {
    document.documentElement.classList.toggle('is-loading', !ready);
  }, [ready]);

  useEffect(() => {
    if (!ready) return undefined;
    const off = initScrollAnimations();
    ScrollTrigger.refresh();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
    return off;
  }, [ready]);

  const openProject = projects.find((p) => p.id === caseId) || null;

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Loader onReveal={() => setReady(true)} />
      <Navbar ready={ready} />

      <main id="main" tabIndex={-1}>
        <Hero ready={ready} />
        <Intro />
        <WorkIntro />
        <ProjectSection project="CareConnect" onOpenCaseStudy={setCaseId} />
        <ProjectSection project="ClimatePulse" onOpenCaseStudy={setCaseId} />
        <ProjectSection project="CropSure AI" onOpenCaseStudy={setCaseId} />
        <Technologies />
        <About />
        <Education />
        <Achievements />
        <Contact />
      </main>

      <Footer />
      <ProjectNav />
      {openProject && <ProjectCaseStudy project={openProject} onClose={() => setCaseId(null)} />}
      <div className="cursor" ref={cursorRef} aria-hidden="true">
        <span className="cursor__label" />
      </div>
    </>
  );
}
