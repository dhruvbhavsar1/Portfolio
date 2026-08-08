// Styles are loaded via <link> tags in Portfolio.html
console.debug('module loaded: src/main.js');
import { elements } from './utils/dom.js';
import { executeCommand } from './commands/executor.js';
import { wireMenuButtons, wireSidebar } from './handlers/handlers.js';
import { commandNames } from './commands/registry.js';

// Boot sequence preserved with timings
export async function boot(){
    await new Promise(r => setTimeout(r, 350));
    await executeCommand('whoami', { focus: false, animate: true });
    const im = elements.interactiveMenu(); if (im) im.classList.remove('hidden');
    elements.projectsView()?.classList.add('hidden');
    elements.terminalCanvas()?.insertBefore(elements.terminalPrompt(), elements.terminalHistory());
    elements.terminalInput()?.focus();
}

function wireTerminalInput() {
    const input = elements.terminalInput();
    const display = elements.terminalInputDisplay();
    const canvas = elements.terminalCanvas();
    if (!input || !display) return;
    let history = [];
    let historyIndex = 0;
    let tabMatches = [];
    let tabIndex = 0;
    let projectMode = false;

    try { history = JSON.parse(sessionStorage.getItem('portfolio-command-history') || '[]'); } catch (_) { history = []; }
    historyIndex = history.length;
    const sync = () => { display.textContent = input.value; };
    const saveHistory = () => { try { sessionStorage.setItem('portfolio-command-history', JSON.stringify(history)); } catch (_) {} };
    const focusInput = () => { projectMode = false; input.focus(); };

    input.addEventListener('input', () => { tabMatches = []; sync(); });
    input.addEventListener('keydown', async (event) => {
        if (event.ctrlKey && event.key.toLowerCase() === 'l') {
            event.preventDefault(); input.value = ''; sync(); await executeCommand('clear'); return;
        }
        if (event.key === 'Enter') {
            event.preventDefault();
            const command = input.value;
            const normalized = command.trim().toLowerCase();
            if (normalized && history[history.length - 1] !== normalized) { history.push(normalized); saveHistory(); }
            historyIndex = history.length;
            input.value = ''; sync(); tabMatches = [];
            await executeCommand(command);
            return;
        }
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (history.length) { historyIndex = Math.max(0, historyIndex - 1); input.value = history[historyIndex]; sync(); }
            return;
        }
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (history.length) { historyIndex = Math.min(history.length, historyIndex + 1); input.value = historyIndex === history.length ? '' : history[historyIndex]; sync(); }
            return;
        }
        if (event.key === 'Tab') {
            event.preventDefault();
            const prefix = input.value.trim().toLowerCase();
            const matches = commandNames.filter(name => name.startsWith(prefix));
            if (!matches.length) return;
            if (matches.length === 1) input.value = matches[0];
            else {
                if (tabMatches.join('|') !== matches.join('|')) { tabMatches = matches; tabIndex = 0; }
                input.value = tabMatches[tabIndex++ % tabMatches.length];
            }
            sync();
        }
    });
    canvas?.addEventListener('click', (event) => {
        if (!event.target.closest('a, button, input, #project-list')) focusInput();
    });
    document.addEventListener('keydown', (event) => {
        const view = elements.projectsView();
        if (!projectMode || view?.classList.contains('hidden')) return;
        const items = [...document.querySelectorAll('#project-list [data-project-id]')];
        const selected = document.activeElement.closest?.('[data-project-id]');
        let index = Math.max(0, items.indexOf(selected));
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault(); index = (index + (event.key === 'ArrowUp' ? -1 : 1) + items.length) % items.length; items[index]?.focus();
        } else if (event.key === 'Enter') {
            event.preventDefault(); items[index]?.click();
        } else if (event.key === 'Escape') {
            event.preventDefault(); focusInput();
        }
    });
    document.addEventListener('focusin', (event) => { if (event.target.closest?.('#project-list [data-project-id]')) projectMode = true; });
}

// Initialize handlers and start
document.addEventListener('DOMContentLoaded', () => {
    wireMenuButtons();
    wireSidebar();
    wireTerminalInput();
    (async () => {
        try {
            await boot();
            // mark boot success for diagnostics
            try { document.body.dataset.booted = '1'; } catch (e) {}
        } catch (err) {
            console.error('Boot failed:', err);
            try { document.body.dataset.bootError = String(err.message || err); } catch (e) {}
            executeCommand(`boot-error-${err.message || String(err)}`);
        }
    })();
});

// Fallback: if boot didn't complete within 1.5s, reveal UI and show a timeout note
setTimeout(() => {
    try {
        if (!document.body.dataset.booted && !document.body.dataset.bootError) {
            const im = elements.interactiveMenu(); if (im) im.classList.remove('hidden');
            elements.terminalInput()?.focus();
        }
    } catch (e) { console.warn('Fallback check failed', e); }
}, 1500);

// default export
export default { boot };
