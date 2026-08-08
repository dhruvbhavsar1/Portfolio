import { portfolioData } from '../data/portfolio.js';
import { elements } from '../utils/dom.js';
export function renderServices(){
    const whoamiOutput = elements.whoamiOutput();
    whoamiOutput.innerHTML = '';
    const el = document.createElement('div');
    el.className = 'p-4 border border-outline-variant bg-surface-container-lowest/50 font-code-sm whitespace-pre-wrap';
    let html = 'SERVICES\n\n';
    portfolioData.services.forEach((s, idx) => html += `[0${idx+1}] ${s}\n\n`);
    el.textContent = html;
    whoamiOutput.appendChild(el);
}
