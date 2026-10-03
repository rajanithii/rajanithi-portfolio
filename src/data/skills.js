import { projects } from './projects';

// Editorial groups — no percentages. Only list what is really part of the profile.
export const skillGroups = [
  { id: '01', title: 'PROGRAMMING', items: ['Python', 'JavaScript', 'SQL'] },
  { id: '02', title: 'DATABASES', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
  { id: '03', title: 'DATA & AI', items: ['Data Engineering', 'Data Analysis', 'Machine Learning', 'Prompt Engineering'] },
  { id: '04', title: 'DEVELOPMENT', items: ['React', 'FastAPI', 'Firebase', 'Streamlit'] },
];

const technologyAliases = {
  firebase: ['firebase cloud messaging'],
};

// Associations are derived from project technologies, with only verified name variants.
export const projectsUsing = (skill) => {
  const names = [skill.toLowerCase(), ...(technologyAliases[skill.toLowerCase()] || [])];
  return projects
    .filter((project) => project.technologies.some((technology) => names.includes(technology.toLowerCase())))
    .map((project) => project.name);
};
