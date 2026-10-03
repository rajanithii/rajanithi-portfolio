import { projects } from './projects';

// Editorial groups — no percentages. Only list what is really part of the profile.
export const skillGroups = [
  { id: '01', title: 'PROGRAMMING', items: ['Python', 'JavaScript', 'SQL'] },
  { id: '02', title: 'DATABASES', items: ['PostgreSQL'] },
  { id: '03', title: 'DATA & AI', items: ['Data Engineering', 'Data Analysis', 'Machine Learning', 'Prompt Engineering'] },
  { id: '04', title: 'DEVELOPMENT', items: ['React', 'FastAPI', 'Firebase', 'Streamlit'] },
];

// Associations are derived from projects.js, so they can never drift from the project data.
export const projectsUsing = (skill) =>
  projects.filter((p) => p.technologies.some((t) => t.toLowerCase() === skill.toLowerCase())).map((p) => p.name);
