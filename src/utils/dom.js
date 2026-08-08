export const elements = {
    typingText: () => document.getElementById('typing-text'),
    terminalCursor: () => document.getElementById('terminal-cursor'),
    whoamiOutput: () => document.getElementById('whoami-output'),
    interactiveMenu: () => document.getElementById('interactive-menu'),
    projectsView: () => document.getElementById('projects-view'),
    projectList: () => document.getElementById('project-list'),
    projectDetails: () => document.getElementById('project-details'),
    projectDetailsHeader: () => document.getElementById('project-details-header'),
    sidebarFiles: () => document.getElementById('sidebar-files')
};
console.debug('module loaded: src/utils/dom.js');
