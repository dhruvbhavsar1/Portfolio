import { portfolioData } from '../data/portfolio.js';
import { elements } from '../utils/dom.js';
export function renderCertifications(){
    const whoamiOutput = elements.whoamiOutput();
    whoamiOutput.innerHTML = '';
    const el = document.createElement('div');
    el.className = 'p-4 border border-outline-variant bg-surface-container-lowest/50 font-code-sm whitespace-pre-wrap';
    let html = 'CERTIFICATIONS\n\n';
    portfolioData.certifications.forEach((c, idx) => html += `[0${idx+1}] ${c}\n\n`);
    el.textContent = html;
    whoamiOutput.appendChild(el);
}
