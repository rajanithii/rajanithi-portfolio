// Single source of truth for the three chapters.
// Anything set to `null` renders as a clearly-marked placeholder — fill in only verified facts.
// To add a 4th project, append an object here (visual.type: 'flow' | 'chart').

export const projects = [
  {
    id: 'careconnect',
    name: 'CareConnect',
    category: 'SYSTEMS',
    year: '2026',
    titleLines: ['CARE', 'CONNECT'],
    subtitle: ['Emergency Healthcare', 'Coordination Platform'],
    statement: null,
    description:
      'A healthcare coordination platform designed around structured data, backend services and intelligent matching.',
    // Confirm each entry is actually used in the project.
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Firebase', 'React', 'Data Engineering'],
    visual: {
      type: 'flow',
      label: 'CareConnect system architecture',
      caption: '[SYSTEM ARCHITECTURE]',
      layers: [['DONORS'], ['FASTAPI'], ['POSTGRESQL', 'AI / DATA'], ['HOSPITALS']],
    },
    caseStudy: { problem: null, approach: null, architecture: null, status: null, github: null },
  },
  {
    id: 'climatepulse',
    name: 'ClimatePulse',
    category: 'DATA',
    year: null,
    titleLines: ['CLIMATE', 'PULSE'],
    subtitle: ['Turning climate data', 'into visual stories.'],
    statement: ['DATA', "SHOULDN'T", 'JUST SIT', 'THERE.'],
    description: 'It should reveal patterns, relationships and change.',
    // Confirm Pandas / Plotly are part of the real project; remove anything that is not.
    technologies: ['Python', 'Pandas', 'Data Analysis', 'Data Visualization', 'Plotly'],
    visual: {
      type: 'chart',
      label: 'ClimatePulse line chart',
      caption: '[CLIMATE DATA VISUALIZATION]',
      // PLACEHOLDER SHAPE. Replace `points` with real { year, value } rows, then set placeholder: false.
      // `y` is the normalised 0–1 height used for drawing.
      placeholder: true,
      points: [
        { year: null, value: null, y: 0.18 },
        { year: null, value: null, y: 0.26 },
        { year: null, value: null, y: 0.22 },
        { year: null, value: null, y: 0.36 },
        { year: null, value: null, y: 0.42 },
        { year: null, value: null, y: 0.4 },
        { year: null, value: null, y: 0.55 },
        { year: null, value: null, y: 0.62 },
        { year: null, value: null, y: 0.6 },
        { year: null, value: null, y: 0.78 },
      ],
    },
    caseStudy: { problem: null, approach: null, architecture: null, status: null, github: null },
  },
  {
    id: 'cropsure-ai',
    name: 'CropSure AI',
    category: 'INTELLIGENCE',
    year: null,
    titleLines: ['CROPSURE', 'AI'],
    subtitle: ['AI-assisted', 'crop insurance claim analysis.'],
    statement: ['FROM DATA', 'TO DECISION.'],
    description: 'A claim, its crop, its location and the data around it move through analysis to a decision.',
    technologies: ['Python', 'Machine Learning', 'Data Analysis', 'AI'],
    visual: {
      type: 'flow',
      label: 'CropSure AI claim pipeline',
      caption: '[CLAIM PIPELINE]',
      layers: [['CLAIM'], ['CROP'], ['LOCATION'], ['DATA'], ['ANALYSIS'], ['DECISION']],
    },
    caseStudy: { problem: null, approach: null, architecture: null, status: null, github: null },
  },
];

export const pad = (n) => String(n).padStart(2, '0');
