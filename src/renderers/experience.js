import { portfolioData } from '../data/portfolio.js';
import { elements } from '../utils/dom.js';
export function renderExperience(){
    const whoamiOutput = elements.whoamiOutput();
    whoamiOutput.innerHTML = '';
    const el = document.createElement('div');
    el.className = 'p-4 border border-outline-variant bg-surface-container-lowest/50 font-code-sm';
    let html = 'EXPERIENCE.LOG\n\n';
    portfolioData.experience.forEach((exp, idx) => {
        html += `[0${idx+1}] ${exp.title}\n\n     PERIOD\n     ${exp.period}\n\n     RESPONSIBILITIES\n`;
        exp.responsibilities.forEach(r => {
            html += `     ├── ${r}\n`;
        });
        html += '\n';
    });
    el.textContent = html;
    whoamiOutput.appendChild(el);
}
