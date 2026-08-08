import { commandNames, commandRegistry, parseCommand } from './registry.js';
import { elements } from '../utils/dom.js';
console.debug('module loaded: src/commands/executor.js');
let executionId = 0;

function replaceWorkspace() {
    const workspace = elements.terminalHistory();
    if (!workspace) return null;
    workspace.replaceChildren();
    return workspace;
}

function createOutput() {
    const output = document.createElement('div');
    output.className = 'flex flex-col gap-4 mt-4 mb-6 terminal-command-output';
    elements.terminalHistory()?.appendChild(output);
    elements.setActiveOutput(output);
    return output;
}

function renderHelp() {
    const output = elements.whoamiOutput();
    const help = document.createElement('pre');
    help.className = 'p-4 border border-outline-variant bg-surface-container-lowest/50 font-code-sm whitespace-pre-wrap text-on-surface';
    help.textContent = `AVAILABLE COMMANDS\n\n  help            Show available commands\n  whoami          Display profile\n  about           Display about information\n  projects        Browse projects\n  skills          Display technical skills\n  experience      Display experience\n  education       Display education\n  certifications  Display certifications\n  services        Display services\n  contact         Display contact information\n  github          Open GitHub profile\n  clear           Clear terminal`;
    output?.appendChild(help);
}

function renderUnknown(command) {
    const output = elements.whoamiOutput();
    const message = document.createElement('pre');
    message.className = 'font-code-sm whitespace-pre-wrap text-error';
    message.textContent = `bash: ${command}: command not found\n\nType 'help' for available commands.`;
    output?.appendChild(message);
}

function renderLoading() {
    const output = elements.whoamiOutput();
    const loader = document.createElement('div');
    loader.className = 'terminal-loading font-code-sm text-secondary';
    loader.setAttribute('role', 'status');
    loader.setAttribute('aria-label', 'Preparing terminal command');
    loader.textContent = '[system] initializing command module';
    output?.appendChild(loader);
    return loader;
}

function playCommandBoot(loader) {
    const stages = [
        '[system] initializing command module',
        '[system] mounting workspace',
        '[system] command ready'
    ];
    return new Promise(resolve => {
        stages.forEach((stage, index) => {
            setTimeout(() => { if (loader?.isConnected) loader.textContent = stage; }, index * 210);
        });
        setTimeout(resolve, 650);
    });
}

async function typeIntoPrompt(command) {
    const input = elements.terminalInput();
    const display = elements.terminalInputDisplay();
    if (!input || !display) return;
    input.focus();
    input.value = '';
    display.textContent = '';
    for (const character of command) {
        input.value += character;
        display.textContent = input.value;
        await new Promise(resolve => setTimeout(resolve, 28));
    }
    await new Promise(resolve => setTimeout(resolve, 70));
    input.value = '';
    display.textContent = '';
}

export async function executeCommand(input, { record = true, focus = true, animate = false } = {}) {
    const { raw, command, args } = parseCommand(input);
    const currentExecution = ++executionId;
    if (animate && command) await typeIntoPrompt(raw);
    if (currentExecution !== executionId) return { command, cancelled: true };
    if (command === 'clear') {
        elements.terminalHistory().replaceChildren();
        elements.projectsView()?.classList.add('hidden');
        elements.interactiveMenu()?.classList.add('hidden');
        elements.setActiveOutput(null);
        if (focus) elements.terminalInput()?.focus();
        return { command, cleared: true };
    }

    if (!command) {
        if (focus) elements.terminalInput()?.focus();
        return { command };
    }

    elements.projectsView()?.classList.add('hidden');
    if (record) replaceWorkspace();
    createOutput();
    const loader = renderLoading();
    await playCommandBoot(loader);
    if (currentExecution !== executionId) return { command, cancelled: true };
    elements.whoamiOutput()?.replaceChildren();
    if (command === 'help') renderHelp();
    else {
        const entry = commandRegistry[command] || commandRegistry[raw.toLowerCase()];
        if (entry && typeof entry.execute === 'function') entry.execute(args);
        else renderUnknown(command);
    }
    elements.setActiveOutput(null);
    if (focus) elements.terminalInput()?.focus();
    return { command, known: commandNames.includes(command) };
}
