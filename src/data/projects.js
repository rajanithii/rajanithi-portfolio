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
      'A connected system for coordinating emergency blood requests, donor matching, blood-bank operations, and inter-hospital workflows.',
    technologies: [
      'React',
      'Vite',
      'Python',
      'FastAPI',
      'PostgreSQL',
      'SQLAlchemy',
      'Firebase Cloud Messaging',
    ],
    visual: {
      type: 'flow',
      label: 'CareConnect system architecture',
      caption: '[SYSTEM ARCHITECTURE]',
      layers: [['REACT + VITE'], ['FASTAPI'], ['SERVICE MODULES'], ['POSTGRESQL', 'FIREBASE MESSAGING']],
    },
    caseStudy: {
      problem:
        'Emergency blood requests require coordination across donors, hospitals, inventory, and response workflows. CareConnect brings these activities into a connected system for structured emergency coordination.',
      approach:
        'CareConnect combines donor matching, emergency requests, blood-bank operations, notifications, forecasting, and inter-hospital coordination. Matching uses deterministic, explainable rules for compatibility, eligibility, distance, and priority; statistical analysis and LLM assistance support selected workflows.',
      architecture:
        'React + Vite frontend → FastAPI backend → service modules → PostgreSQL, with Firebase notifications and external services supporting selected workflows.',
      status:
        'Active development — core workflows and feature modules are implemented; production deployment and operational validation are still pending.',
      github: 'https://github.com/rajanithii/CareConnect_AI',
    },
  },
  {
    id: 'climatepulse',
    name: 'ClimatePulse',
    category: 'DATA',
    year: '2025',
    titleLines: ['CLIMATE', 'PULSE'],
    subtitle: ['Turning climate data', 'into visual stories.'],
    statement: ['DATA', "SHOULDN'T", 'JUST SIT', 'THERE.'],
    description:
      'ClimatePulse turns bundled climate data into interactive visual stories covering emissions, temperature, sea level, and forest change.',
    technologies: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'NumPy', 'scikit-learn', 'pytest'],
    visual: {
      type: 'chart',
      label: 'ClimatePulse annual adjusted-temperature means from bundled data',
      caption: '[BUNDLED ADJUSTED TEMPERATURE · ANNUAL MEANS]',
      unit: '°C',
      unitSpoken: 'degrees Celsius',
      valueLabel: 'Adjusted temperature',
      yAxisLabel: 'Adjusted temperature (°C)',
      placeholder: false,
      points: [
        { year: 1900, value: 18.63, y: 0.15 },
        { year: 1925, value: 18.71, y: 0.175 },
        { year: 1950, value: 18.65, y: 0.156 },
        { year: 1975, value: 18.85, y: 0.22 },
        { year: 2000, value: 19.48, y: 0.42 },
        { year: 2024, value: 20.84, y: 0.85 },
      ],
      methodology:
        "Temperature trend based on yearly averages calculated from the project's bundled dataset across available country/month records.",
      methodologyNote: 'Dataset-derived aggregation — not a standard global temperature index.',
    },
    caseStudy: {
      problem:
        'Climate datasets can contain useful patterns, but raw tables are difficult to explore and interpret. ClimatePulse turns bundled climate data into interactive visual stories covering emissions, temperature, sea level, and forest change.',
      approach:
        'The Streamlit dashboard uses Python, Pandas, Plotly, NumPy, and scikit-learn to clean, aggregate, visualize, and analyse climate datasets through interactive maps, charts, warming stripes, trend analysis, and comparisons.',
      architecture:
        'Bundled CSV datasets → Pandas data processing → Streamlit application → Plotly visualizations and interactive dashboard views.',
      status:
        'Completed project with interactive dashboards, bundled datasets, data-processing tests, and statistical trend analysis. Trend lines are statistical fits to loaded data, not climate-model predictions.',
      github: 'https://github.com/rajanithii/ClimatePulse',
      demo: 'https://climate-dashboard-story.streamlit.app/',
    },
  },
  {
    id: 'cropsure-ai',
    name: 'CropSure AI',
    category: 'INTELLIGENCE',
    year: '2025',
    titleLines: ['CROPSURE', 'AI'],
    subtitle: ['Crop insurance claim', 'support prototype.'],
    statement: ['CLAIM', 'SUPPORT.'],
    description:
      'A hackathon prototype for collecting crop claims, generating an initial assessment, and organizing administrative review.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'HTML', 'JavaScript', 'Axios'],
    visual: {
      type: 'flow',
      label: 'CropSure AI claim pipeline',
      caption: '[CLAIM PIPELINE]',
      layers: [['CLAIM'], ['BACKEND STORAGE'], ['PROTOTYPE ASSESSMENT'], ['REVIEW STATUS'], ['CLAIM MANAGEMENT']],
    },
    caseStudy: {
      problem:
        'Crop insurance claim handling can involve collecting claim details, assessing reported damage, prioritising cases, and organising administrative review. CropSure AI explores this workflow through a hackathon prototype for crop-damage claim support.',
      approach:
        'The Node.js and Express backend accepts crop claim details and optional images, stores claims, runs a background prototype assessment, generates an initial priority and explanation, and supports claim-status review through an API. Optional Groq/OpenAI integrations can generate LLM explanations. The vision step is simulated and does not inspect image pixels; the HTML pages are mockups and are not connected to the API.',
      architecture:
        'Claim submission → backend storage → background assessment → severity and priority processing → review status → claim retrieval and management.',
      status:
        'Hackathon prototype — backend workflow implemented; frontend integration and production-grade claim assessment remain future work. Image assessment is simulated, not pixel analysis; no production insurance automation is claimed.',
      github: 'https://github.com/rajanithii/CropSure-AI',
    },
  },
];

export const pad = (n) => String(n).padStart(2, '0');
