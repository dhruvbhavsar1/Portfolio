import { executeCommand } from '../commands/executor.js';
import { elements } from '../utils/dom.js';

export function wireMenuButtons(){
    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.dataset.cmd;
            if (cmd) executeCommand(cmd, { animate: true });
        });
    });
}

export function wireSidebar(){
    document.querySelectorAll('.file-item').forEach(fi => {
        fi.addEventListener('click', (event) => {
            event.preventDefault();
            const file = fi.dataset.file;
            document.querySelectorAll('.file-item').forEach(x => x.classList.remove('border-primary','text-primary','bg-primary-container/10'));
            fi.classList.add('border-primary','text-primary','bg-primary-container/10');
            const commands = { 'about.md': 'about', 'projects.sh': 'projects', 'experience.log': 'experience', 'skills.bin': 'skills', 'education.txt': 'education', 'certifications.txt': 'certifications', 'contact.cfg': 'contact' };
            if (commands[file]) executeCommand(commands[file], { animate: true });
        });
    });
}
