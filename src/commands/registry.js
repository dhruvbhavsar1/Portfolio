import { renderWhoami } from '../renderers/whoami.js';
import { renderAbout } from '../renderers/about.js';
import { renderExperience } from '../renderers/experience.js';
import { renderSkills } from '../renderers/skills.js';
import { renderEducation } from '../renderers/education.js';
import { renderCertifications } from '../renderers/certifications.js';
import { renderServices } from '../renderers/services.js';
import { renderContact } from '../renderers/contact.js';
import { renderProjectList, renderProjectDetails, renderProjectDetailsCommand, resolveProjectId, getProjectAutocompleteOptions } from '../renderers/projects.js';
import { portfolioData } from '../data/portfolio.js';
import { elements } from '../utils/dom.js';
console.debug('module loaded: src/commands/registry.js');

export const commandRegistry = {
    'whoami': { execute: renderWhoami },
    'about': { execute: renderAbout },
    'cat about.md': { execute: renderAbout },
    'projects': { execute: () => { const view = elements.projectsView(); if (view) { elements.whoamiOutput()?.appendChild(view); view.classList.remove('hidden'); } renderProjectList(); renderProjectDetails(portfolioData.projects[0].id); } },
    './projects.sh': { execute: () => { const view = elements.projectsView(); if (view) { elements.whoamiOutput()?.appendChild(view); view.classList.remove('hidden'); } renderProjectList(); renderProjectDetails(portfolioData.projects[0].id); } },
    'project': { execute: (args = []) => {
        const projectName = args.join(' ').trim();
        if (!projectName) {
            const output = elements.whoamiOutput();
            output?.replaceChildren();
            const help = document.createElement('pre');
            help.className = 'p-4 border border-outline-variant bg-surface-container-lowest/50 font-code-sm whitespace-pre-wrap text-on-surface';
            const lines = [
                'USAGE',
                '',
                'project <project-name>',
                '',
                'AVAILABLE PROJECTS',
                ''
            ];
            const documentedProjects = new Set(['charity-marketplace', 'monginis-crm', 'flutter-ios-check', 'priority-ping']);
            const projects = portfolioData.projects.map((project, index) => {
                const marker = documentedProjects.has(project.id) ? '[DETAILS AVAILABLE]' : '[SUMMARY ONLY]';
                const displayName = project.id === 'charity-marketplace' ? 'charity-app' : project.id;
                return `${String(index + 1).padStart(2, '0')} ${displayName.padEnd(20)} ${marker}`;
            });
            help.textContent = [...lines, ...projects].join('\n');
            output?.appendChild(help);
            return;
        }
        const resolvedId = resolveProjectId(projectName);
        if (!resolvedId) {
            const output = elements.whoamiOutput();
            output?.replaceChildren();
            const message = document.createElement('pre');
            message.className = 'p-4 border border-outline-variant bg-surface-container-lowest/50 font-code-sm whitespace-pre-wrap text-error';
            message.textContent = `PROJECT NOT FOUND\n\nUnknown project: ${projectName}\n\nUse the available project names from:\n\nprojects`;
            output?.appendChild(message);
            return;
        }
        renderProjectDetailsCommand(resolvedId);
    } },
    'details': { execute: (args = []) => { const projectName = args.join(' ').trim(); const resolvedId = resolveProjectId(projectName); if (!resolvedId) { const output = elements.whoamiOutput(); output?.replaceChildren(); const message = document.createElement('pre'); message.className = 'p-4 border border-outline-variant bg-surface-container-lowest/50 font-code-sm whitespace-pre-wrap text-error'; message.textContent = `PROJECT NOT FOUND\n\nUnknown project: ${projectName}\n\nUse the available project names from:\n\nprojects`; output?.appendChild(message); return; } renderProjectDetailsCommand(resolvedId); } },
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

export const commandNames = ['help', 'whoami', 'about', 'projects', 'project', 'details', 'skills', 'experience', 'education', 'certifications', 'services', 'contact', 'github', 'clear'];

export function parseCommand(input = '') {
    const trimmed = input.trim();
    const [name = '', ...args] = trimmed.split(/\s+/);
    return { raw: trimmed, command: name.toLowerCase(), args };
}
