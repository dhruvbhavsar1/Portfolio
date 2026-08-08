export function typeText(el, text, {speed = 80, cursor = null} = {}){
    return new Promise((resolve) => {
        if (!el) { resolve(); return; }
        el.textContent = '';
        let i = 0;
        const int = setInterval(() => {
            el.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(int);
                resolve();
            }
        }, speed);
    });
}
