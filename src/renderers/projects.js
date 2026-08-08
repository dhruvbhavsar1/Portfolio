import { portfolioData } from '../data/portfolio.js';
import { elements } from '../utils/dom.js';

export function renderProjectList(){
    const projectListEl = elements.projectList();
    projectListEl.innerHTML = '';
    portfolioData.projects.forEach((p, idx) => {
        const item = document.createElement('div');
        item.className = 'group flex flex-col p-3 border border-transparent hover:border-outline-variant hover:bg-surface-container-low cursor-pointer transition-colors';
        item.dataset.projectId = p.id;
        item.innerHTML = `<div class="flex items-start gap-3"><span class="text-primary mt-0.5">${String(idx+1).padStart(2,'0')}</span><div class="flex flex-col"><span class="text-on-surface font-semibold group-hover:text-primary transition-colors">${p.name}</span><span class="text-on-surface-variant text-[11px] mt-1">${p.type || p.stack?.join(', ') || ''}</span></div></div>`;
        item.addEventListener('click', () => {
            // show details
            renderProjectDetails(p.id);
        });
        projectListEl.appendChild(item);
    });
}

export function renderProjectDetails(id){
    const p = portfolioData.projects.find(x => x.id === id);
    if (!p) return;
    const projectDetailsHeader = elements.projectDetailsHeader();
    const projectDetailsEl = elements.projectDetails();
    projectDetailsHeader.querySelector('span').textContent = `~/projects/${p.id}/`;
    projectDetailsEl.innerHTML = '';
    const title = document.createElement('h3');
    title.className = 'text-primary text-lg font-bold';
    title.textContent = p.name;
    projectDetailsEl.appendChild(title);
    if (p.status) {
        const status = document.createElement('div');
        status.className = 'flex gap-2 text-[11px]';
        status.innerHTML = `<span class="text-tertiary border border-tertiary/30 px-1.5 py-0.5 rounded-sm">STATUS: ${p.status}</span>`;
        projectDetailsEl.appendChild(status);
    }
    if (p.type) {
        const typeEl = document.createElement('div');
        typeEl.className = 'text-on-surface-variant mt-2';
        typeEl.textContent = `TYPE: ${p.type}`;
        projectDetailsEl.appendChild(typeEl);
    }
    if (p.stack) {
        const stackWrap = document.createElement('div');
        stackWrap.className = 'mt-2';
        stackWrap.innerHTML = `<div class="text-on-surface-variant text-[11px] mb-1">STACK:</div>` + p.stack.map(s => `<div class="text-on-surface">${s}</div>`).join('');
        projectDetailsEl.appendChild(stackWrap);
    }
    if (p.description) {
        const desc = document.createElement('p');
        desc.className = 'text-on-surface-variant mt-2 max-w-xl';
        desc.textContent = p.description;
        projectDetailsEl.appendChild(desc);
    }
    if (p.features) {
        const feat = document.createElement('div');
        feat.className = 'mt-4';
        feat.innerHTML = '<div class="text-on-surface-variant text-[11px] mb-1">FEATURES:</div>' + '<ol class="list-decimal list-inside">' + p.features.map(f => `<li class="text-on-surface-variant text-[13px] mb-1">${f}</li>`).join('') + '</ol>';
        projectDetailsEl.appendChild(feat);
    }
    if (p.repo) {
        const repo = document.createElement('div');
        repo.className = 'mt-4';
        repo.innerHTML = `REPOSITORY: <a href="${p.repo}" target="_blank" rel="noreferrer" class="text-secondary underline">${p.repo}</a>`;
        projectDetailsEl.appendChild(repo);
    }
}
