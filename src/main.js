// Styles are loaded via <link> tags in Portfolio.html
console.debug('module loaded: src/main.js');
import { elements } from './utils/dom.js';
import { executeCommand } from './commands/executor.js';
import { renderWhoami } from './renderers/whoami.js';
import { renderProjectList, renderProjectDetails } from './renderers/projects.js';
import { wireMenuButtons, wireSidebar } from './handlers/handlers.js';
import { portfolioData } from './data/portfolio.js';

// Boot sequence preserved with timings
export async function boot(){
    const typingEl = elements.typingText();
    const cursor = elements.terminalCursor();
    // small initial delay
    await new Promise(r => setTimeout(r, 350));
    // type whoami
    await executeCommand('whoami', { speed: 120 });
    // render whoami explicitly (executor also does it) - keep idempotent
    renderWhoami();
    // reveal menu
    const im = elements.interactiveMenu(); if (im) im.classList.remove('hidden');
    // reveal projects
    const pv = elements.projectsView(); if (pv) { pv.classList.remove('hidden'); renderProjectList(); renderProjectDetails(portfolioData.projects[0].id); }
}

// Initialize handlers and start
document.addEventListener('DOMContentLoaded', () => {
    wireMenuButtons();
    wireSidebar();
    (async () => {
        try {
            await boot();
            // mark boot success for diagnostics
            try { document.body.dataset.booted = '1'; } catch (e) {}
        } catch (err) {
            console.error('Boot failed:', err);
            try { document.body.dataset.bootError = String(err.message || err); } catch (e) {}
            const out = elements.whoamiOutput();
            if (out) {
                out.classList.remove('hidden');
                out.textContent = 'Boot error: ' + (err.message || String(err));
            }
        }
    })();
});

// Fallback: if boot didn't complete within 1.5s, reveal UI and show a timeout note
setTimeout(() => {
    try {
        if (!document.body.dataset.booted && !document.body.dataset.bootError) {
            const im = elements.interactiveMenu(); if (im) im.classList.remove('hidden');
            const pv = elements.projectsView(); if (pv) pv.classList.remove('hidden');
            const out = elements.whoamiOutput();
            if (out && out.innerHTML.trim() === '') out.textContent = 'Boot timeout: open developer console (F12) to inspect errors.';
        }
    } catch (e) { console.warn('Fallback check failed', e); }
}, 1500);

// default export
export default { boot };
