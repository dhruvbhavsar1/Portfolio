import { renderWhoami } from '../renderers/whoami.js';
import { renderAbout } from '../renderers/about.js';
import { renderExperience } from '../renderers/experience.js';
import { renderSkills } from '../renderers/skills.js';
import { renderEducation } from '../renderers/education.js';
import { renderCertifications } from '../renderers/certifications.js';
import { renderServices } from '../renderers/services.js';
import { renderContact } from '../renderers/contact.js';
import { renderProjectList, renderProjectDetails } from '../renderers/projects.js';
import { portfolioData } from '../data/portfolio.js';
import { elements } from '../utils/dom.js';
console.debug('module loaded: src/commands/registry.js');

export const commandRegistry = {
    'whoami': { execute: renderWhoami },
    'about': { execute: renderAbout },
    'cat about.md': { execute: renderAbout },
    'projects': { execute: () => { const view = elements.projectsView(); if (view) { elements.whoamiOutput()?.appendChild(view); view.classList.remove('hidden'); } renderProjectList(); renderProjectDetails(portfolioData.projects[0].id); } },
    './projects.sh': { execute: () => { const view = elements.projectsView(); if (view) { elements.whoamiOutput()?.appendChild(view); view.classList.remove('hidden'); } renderProjectList(); renderProjectDetails(portfolioData.projects[0].id); } },
    'skills': { execute: renderSkills },
    './skills.bin': { execute: renderSkills },
    'experience': { execute: renderExperience },
    'cat experience.log': { execute: renderExperience },
    'education': { execute: renderEducation },
    'cat education.txt': { execute: renderEducation },
    'certifications': { execute: renderCertifications },
    'cat certifications.txt': { execute: renderCertifications },
    'services': { execute: renderServices },
    'contact': { execute: renderContact },
    'cat contact.cfg': { execute: renderContact },
    'github': { execute: () => { window.open(portfolioData.contact.github, '_blank'); } },
    'clear': { clear: true },
};

export const commandNames = ['help', 'whoami', 'about', 'projects', 'skills', 'experience', 'education', 'certifications', 'services', 'contact', 'github', 'clear'];

export function parseCommand(input = '') {
    const trimmed = input.trim();
    const [name = '', ...args] = trimmed.split(/\s+/);
    return { raw: trimmed, command: name.toLowerCase(), args };
}
