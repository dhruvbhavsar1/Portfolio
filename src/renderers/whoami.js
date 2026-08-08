import { portfolioData } from '../data/portfolio.js';
import { elements } from '../utils/dom.js';
console.debug('module loaded: src/renderers/whoami.js');
export function renderWhoami(){
    const whoamiOutput = elements.whoamiOutput();
    whoamiOutput.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'p-4 border border-outline-variant bg-surface-container-lowest/50';
    const nameEl = document.createElement('h1');
    nameEl.className = 'font-headline-lg text-primary mb-1';
    nameEl.textContent = portfolioData.profile.name;
    const titleEl = document.createElement('h2');
    titleEl.className = 'font-headline-md text-on-surface mb-3';
    titleEl.textContent = portfolioData.profile.title;
    const tagsWrap = document.createElement('div');
    tagsWrap.className = 'flex gap-2 mb-4';
    portfolioData.profile.tags.forEach(t => {
        const s = document.createElement('span');
        s.className = 'px-2 py-1 bg-secondary/10 text-secondary border border-secondary/20 text-[11px] uppercase tracking-wider rounded-sm';
        s.textContent = t;
        tagsWrap.appendChild(s);
    });
    const p = document.createElement('p');
    p.className = 'font-body-md text-on-surface-variant max-w-2xl border-l-2 border-outline-variant pl-4 py-1 italic';
    p.textContent = portfolioData.profile.summary;
    container.appendChild(nameEl);
    container.appendChild(titleEl);
    container.appendChild(tagsWrap);
    container.appendChild(p);
    whoamiOutput.appendChild(container);
}
