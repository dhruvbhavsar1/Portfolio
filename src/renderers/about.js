import { portfolioData } from '../data/portfolio.js';
import { elements } from '../utils/dom.js';
export function renderAbout(){
    const whoamiOutput = elements.whoamiOutput();
    whoamiOutput.innerHTML = '';
    const el = document.createElement('div');
    el.className = 'p-4 border border-outline-variant bg-surface-container-lowest/50 whitespace-pre-wrap font-code-sm';
    el.textContent = `ABOUT.MD\n\nNAME:\n${portfolioData.profile.name}\n\nROLE:\n${portfolioData.profile.title}\n\nLOCATION:\n${portfolioData.profile.location}\n\nPROFILE:\n${portfolioData.profile.summary}\n\nFOCUS:\n- Mobile application development\n- Offline-first architecture\n- Firebase optimization\n- Scalable mobile solutions\n- Developer tools\n- Open-source projects\n- Freelance development`;
    whoamiOutput.appendChild(el);
}
