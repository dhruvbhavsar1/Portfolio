export const elements = {
    typingText: () => document.getElementById('typing-text'),
    terminalCursor: () => document.getElementById('terminal-cursor'),
    activeOutput: null,
    whoamiOutput: () => elements.activeOutput || document.getElementById('whoami-output'),
    setActiveOutput: (output) => { elements.activeOutput = output; },
    terminalHistory: () => document.getElementById('terminal-history'),
    terminalInput: () => document.getElementById('terminal-input'),
    terminalInputDisplay: () => document.getElementById('terminal-input-display'),
    terminalPrompt: () => document.getElementById('terminal-prompt'),
    terminalCanvas: () => document.getElementById('terminal-output'),
    interactiveMenu: () => document.getElementById('interactive-menu'),
    projectsView: () => elements._projectsView || (elements._projectsView = document.getElementById('projects-view')),
    projectList: () => document.getElementById('project-list'),
    projectDetails: () => document.getElementById('project-details'),
    projectDetailsHeader: () => document.getElementById('project-details-header'),
    sidebarFiles: () => document.getElementById('sidebar-files')
};
console.debug('module loaded: src/utils/dom.js');
