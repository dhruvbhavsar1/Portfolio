import { portfolioData } from '../data/portfolio.js';
import { elements } from '../utils/dom.js';

const detailFileMap = {
    'charity-marketplace': 'charity.txt',
    'monginis-crm': 'Monginis_CRM.txt',
    'flutter-ios-check': 'flutter-ios-check.txt',
    'priority-ping': 'Priority-Ping.txt'
};

const projectAliasMap = {
    'charity-app': 'charity-marketplace',
    'charity': 'charity-marketplace',
    'marketplace': 'charity-marketplace',
    'ios-check': 'flutter-ios-check',
    'flutter': 'flutter-ios-check',
    'priorityping': 'priority-ping',
    'priority-ping': 'priority-ping',
    'monginis': 'monginis-crm',
    'crm': 'monginis-crm'
};

function normalizeProjectKey(input = '') {
    return (input || '').trim().toLowerCase().replace(/[\s_]+/g, '-').replace(/[^a-z0-9-]/g, '');
}

const normalizedAliasMap = Object.fromEntries(
    Object.entries(projectAliasMap).map(([key, value]) => [normalizeProjectKey(key), value])
);

function getProjectCommandName(projectId) {
    return projectId === 'charity-marketplace' ? 'charity-app' : projectId;
}

export let projectCommandInvoker = null;
export function setProjectCommandInvoker(fn) {
    projectCommandInvoker = fn;
}

export function resolveProjectId(input = '') {
    const raw = normalizeProjectKey(input);
    if (!raw) return null;
    const byId = portfolioData.projects.find((project) => normalizeProjectKey(project.id) === raw);
    if (byId) return byId.id;
    const byName = portfolioData.projects.find((project) => normalizeProjectKey(project.name) === raw);
    if (byName) return byName.id;
    return normalizedAliasMap[raw] || null;
}

export function hasProjectDetails(projectId) {
    return Boolean(detailFileMap[projectId]);
}

export function getProjectAutocompleteOptions(prefix = '') {
    const input = (prefix || '').trim().toLowerCase();
    const results = [];
    const seen = new Set();
    const addCandidate = (value) => {
        const normalized = (value || '').trim().toLowerCase();
        if (!normalized || seen.has(normalized)) return;
        if (!input || normalized.startsWith(input)) {
            seen.add(normalized);
            results.push(value);
        }
    };
    portfolioData.projects.forEach((project) => addCandidate(getProjectCommandName(project.id)));
    Object.keys(projectAliasMap).forEach((alias) => addCandidate(alias));
    return results.sort();
}

function appendLinkifiedText(container, text) {
    const parts = text.split(/(https?:\/\/[^\s]+)/g);
    parts.forEach((part) => {
        if (!part) return;
        if (/^https?:\/\/[^\s]+$/.test(part)) {
            const link = document.createElement('a');
            link.href = part;
            link.target = '_blank';
            link.rel = 'noreferrer';
            link.className = 'text-secondary underline break-all';
            link.textContent = part;
            container.appendChild(link);
        } else {
            container.appendChild(document.createTextNode(part));
        }
    });
}

function renderDocumentBody(container, text) {
    const body = document.createElement('pre');
    body.className = 'p-4 border border-outline-variant bg-surface-container-lowest/50 font-code-sm whitespace-pre-wrap text-on-surface break-words leading-relaxed';
    const lines = text.replace(/\r/g, '').split('\n');
    lines.forEach((line, index) => {
        if (index > 0) body.appendChild(document.createTextNode('\n'));
        appendLinkifiedText(body, line);
    });
    container.appendChild(body);
}

function renderSummaryOnlyState(container, project) {
    const title = document.createElement('div');
    title.className = 'text-primary text-lg font-bold';
    title.textContent = project.name.toUpperCase();
    container.appendChild(title);

    const message = document.createElement('div');
    message.className = 'border border-outline-variant bg-surface-container-lowest/50 p-4 text-on-surface-variant';
    message.innerHTML = '<div class="text-secondary mb-3">PROJECT DOCUMENTATION</div><div class="mb-3">Detailed project documentation is not currently available for this project.</div><div class="mb-3">SUMMARY</div><div class="mb-2">' + (project.description || 'Summary information is available in the project browser.') + '</div><div class="mb-3">STACK</div><div>' + (project.stack?.join(', ') || 'Not listed') + '</div><div class="mt-4 text-on-surface-variant">Use:</div><div class="text-secondary">projects</div><div class="mt-2">to view the available project summary.</div>';
    container.appendChild(message);
}

async function loadProjectDetailText(projectId) {
    const detailFile = detailFileMap[projectId];
    if (!detailFile) return null;
    const response = await fetch(new URL(`../../${detailFile}`, import.meta.url));
    if (!response.ok) throw new Error(`Unable to load ${detailFile}`);
    return response.text();
}

export async function renderProjectDetailsCommand(projectId) {
    const project = portfolioData.projects.find((entry) => entry.id === projectId);
    if (!project) {
        const output = elements.whoamiOutput();
        output?.replaceChildren();
        const message = document.createElement('pre');
        message.className = 'p-4 border border-outline-variant bg-surface-container-lowest/50 font-code-sm whitespace-pre-wrap text-error';
        message.textContent = 'PROJECT NOT FOUND\n\nUse the available project names from:\n\nprojects';
        output?.appendChild(message);
        return;
    }

    const output = elements.whoamiOutput();
    output?.replaceChildren();

    const wrapper = document.createElement('div');
    wrapper.className = 'flex flex-col gap-4';

    const path = document.createElement('div');
    path.className = 'text-secondary text-[11px] uppercase tracking-widest';
    path.textContent = `~/projects/${getProjectCommandName(project.id)}/`;
    wrapper.appendChild(path);

    if (!hasProjectDetails(project.id)) {
        renderSummaryOnlyState(wrapper, project);
        output?.appendChild(wrapper);
        return;
    }

    try {
        const detailText = await loadProjectDetailText(project.id);
        if (!detailText) throw new Error('No detail text available');
        const title = document.createElement('div');
        title.className = 'text-primary text-lg font-bold';
        title.textContent = project.name.toUpperCase();
        wrapper.appendChild(title);
        const divider = document.createElement('div');
        divider.className = 'h-px bg-outline-variant';
        wrapper.appendChild(divider);
        renderDocumentBody(wrapper, detailText);
        output?.appendChild(wrapper);
    } catch (error) {
        const message = document.createElement('pre');
        message.className = 'p-4 border border-outline-variant bg-surface-container-lowest/50 font-code-sm whitespace-pre-wrap text-error';
        message.textContent = `ERROR\n\nDetailed project documentation could not be loaded.\n\nExpected file: ${detailFileMap[project.id] || 'unknown'}\n\nThe project summary is still available through:\n\nprojects`;
        output?.appendChild(message);
    }
}

export function renderProjectList(){
    const projectListEl = elements.projectList();
    projectListEl.innerHTML = '';
    portfolioData.projects.forEach((p, idx) => {
        const item = document.createElement('div');
        item.className = 'group flex flex-col p-3 border border-transparent hover:border-outline-variant hover:bg-surface-container-low cursor-pointer transition-colors';
        item.dataset.projectId = p.id;
        item.tabIndex = 0;
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `Open ${p.name}`);
        item.innerHTML = `<div class="flex items-start gap-3"><span class="text-primary mt-0.5">${String(idx+1).padStart(2,'0')}</span><div class="flex flex-col"><span class="text-on-surface font-semibold group-hover:text-primary transition-colors">${p.name}</span><span class="text-on-surface-variant text-[11px] mt-1">${p.type || p.stack?.join(', ') || ''}</span></div></div>`;
        item.addEventListener('click', () => {
            renderProjectDetails(p.id);
        });
        item.addEventListener('focus', () => item.classList.add('project-selected'));
        item.addEventListener('blur', () => item.classList.remove('project-selected'));
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

    if (hasProjectDetails(p.id)) {
        const action = document.createElement('button');
        action.className = 'text-secondary text-[11px] underline self-start';
        action.textContent = '[MORE DETAILS]';
        action.addEventListener('click', async (event) => {
            event.stopPropagation();
            if (typeof projectCommandInvoker === 'function') {
                await projectCommandInvoker(`details ${getProjectCommandName(p.id)}`);
            }
        });
        projectDetailsEl.appendChild(action);
    }
}

