import { portfolioData } from '../data/portfolio.js';
import { elements } from '../utils/dom.js';
export function renderExperience(){
    const whoamiOutput = elements.whoamiOutput();
    whoamiOutput.innerHTML = '';
    const el = document.createElement('div');
    el.className = 'p-4 border border-outline-variant bg-surface-container-lowest/50 font-code-sm whitespace-pre-wrap text-on-surface';
    let html = 'EXPERIENCE.LOG\n';
    html += '──────────────────────────────\n\n';
    portfolioData.experience.forEach((exp, idx) => {
        html += `[0${idx+1}] ${exp.title.toUpperCase()}\n\n`;
        html += 'PERIOD\n';
        html += `  • ${exp.period}\n\n`;
        html += 'RESPONSIBILITIES\n';
        exp.responsibilities.forEach(r => {
            html += `  • ${r}\n`;
        });
        if (idx < portfolioData.experience.length - 1) html += '\n';
    });
    el.textContent = html;
    whoamiOutput.appendChild(el);
}
