import { executeCommand } from '../commands/executor.js';
import { elements } from '../utils/dom.js';

export function wireMenuButtons(){
    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.dataset.cmd;
            if (cmd) executeCommand(cmd);
        });
    });
}

export function wireSidebar(){
    document.querySelectorAll('.file-item').forEach(fi => {
        fi.addEventListener('click', () => {
            const file = fi.dataset.file;
            document.querySelectorAll('.file-item').forEach(x => x.classList.remove('border-primary','text-primary','bg-primary-container/10'));
            fi.classList.add('border-primary','text-primary','bg-primary-container/10');
            switch(file){
                case 'about.md': executeCommand('cat about.md'); break;
                case 'projects.sh': executeCommand('./projects.sh'); break;
                case 'experience.log': executeCommand('cat experience.log'); break;
                case 'skills.bin': executeCommand('./skills.bin'); break;
                case 'education.txt': executeCommand('cat education.txt'); break;
                case 'certifications.txt': executeCommand('cat certifications.txt'); break;
                case 'contact.cfg': executeCommand('cat contact.cfg'); break;
            }
        });
    });
}
