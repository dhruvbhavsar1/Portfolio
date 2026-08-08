import { portfolioData } from '../data/portfolio.js';
import { elements } from '../utils/dom.js';
export function renderSkills(){
    const whoamiOutput = elements.whoamiOutput();
    whoamiOutput.innerHTML = '';
    const el = document.createElement('div');
    el.className = 'p-4 border border-outline-variant bg-surface-container-lowest/50 font-code-sm whitespace-pre-wrap text-on-surface';
    const sections = [
        {
            title: 'LANGUAGES',
            items: portfolioData.skills.languages
        },
        {
            title: 'FRAMEWORKS',
            items: portfolioData.skills.frameworks
        },
        {
            title: 'BACKEND / DATABASE',
            items: portfolioData.skills.backend
        },
        {
            title: 'TOOLS',
            items: portfolioData.skills.tools
        },
        {
            title: 'CONCEPTS',
            items: portfolioData.skills.concepts
        }
    ];
    let html = 'SKILLS.BIN\n';
    html += '──────────────────────────────\n\n';
    sections.forEach((section, index) => {
        html += `${section.title}\n`;
        section.items.forEach((item) => {
            html += `  • ${item}\n`;
        });
        if (index < sections.length - 1) html += '\n';
    });
    el.textContent = html;
    whoamiOutput.appendChild(el);
}
