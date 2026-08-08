import { portfolioData } from '../data/portfolio.js';
import { elements } from '../utils/dom.js';
export function renderSkills(){
    const whoamiOutput = elements.whoamiOutput();
    whoamiOutput.innerHTML = '';
    const el = document.createElement('div');
    el.className = 'p-4 border border-outline-variant bg-surface-container-lowest/50 font-code-sm';
    let html = 'SKILLS.BIN\n\nLANGUAGES\n';
    portfolioData.skills.languages.forEach(l => html += `├── ${l}\n`);
    html += '\nFRAMEWORKS\n';
    portfolioData.skills.frameworks.forEach(f => html += `├── ${f}\n`);
    html += '\nBACKEND & DATABASE\n';
    portfolioData.skills.backend.forEach(b => html += `├── ${b}\n`);
    html += '\nTOOLS\n';
    portfolioData.skills.tools.forEach(t => html += `├── ${t}\n`);
    html += '\nCONCEPTS\n';
    portfolioData.skills.concepts.forEach(c => html += `├── ${c}\n`);
    el.textContent = html;
    whoamiOutput.appendChild(el);
}
