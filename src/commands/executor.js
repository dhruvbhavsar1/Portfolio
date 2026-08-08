import { commandRegistry } from './registry.js';
import { typeText } from '../utils/typewriter.js';
import { elements } from '../utils/dom.js';
console.debug('module loaded: src/commands/executor.js');

export async function executeCommand(cmd, { speed = 80 } = {}){
    const typingEl = elements.typingText();
    const cursor = elements.terminalCursor();
    if (typingEl) typingEl.textContent = '';
    if (cursor) cursor.style.display = 'inline-block';
    await typeText(typingEl, cmd, { speed });
    // small delay
    await new Promise(r => setTimeout(r, 120));
    const entry = commandRegistry[cmd];
    // Ensure main output area is visible before renderers run
    try {
        const out = elements.whoamiOutput();
        if (out) {
            out.classList.remove('hidden');
            out.classList.add('flex');
        }
    } catch (e) { /* ignore */ }
    if (entry && typeof entry.execute === 'function'){
        entry.execute();
    }
}
