import { portfolioData } from '../data/portfolio.js';
import { elements } from '../utils/dom.js';
export function renderEducation(){
    const whoamiOutput = elements.whoamiOutput();
    whoamiOutput.innerHTML = '';
    const el = document.createElement('div');
    el.className = 'p-4 border border-outline-variant bg-surface-container-lowest/50 font-code-sm whitespace-pre-wrap';
    let html = 'EDUCATION\n\n';
    portfolioData.education.forEach((edu, idx) => {
        html += `[0${idx+1}]\n\n${edu.degree}\n${edu.institution}\n`;
        if (edu.period) html += `${edu.period}\n`;
        if (edu.cgpa) html += `\nCGPA:\n${edu.cgpa}\n`;
        html += '\n';
    });
    el.textContent = html;
    whoamiOutput.appendChild(el);
}
