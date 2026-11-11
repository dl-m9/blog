// Keep the original charts isolated while sharing the blog theme and figure height.
(() => {
    const frames = Array.from(document.querySelectorAll('.smol-figure-frame'));
    const sendTheme = (frame) => frame.contentWindow?.postMessage({
        type: 'smol-figure-theme', theme: document.documentElement.dataset.theme
    }, location.origin);
    frames.forEach((frame) => frame.addEventListener('load', () => sendTheme(frame)));
    addEventListener('message', (event) => {
        if (event.origin !== location.origin || event.data?.type !== 'smol-figure-height') return;
        const frame = frames.find((item) => item.contentWindow === event.source);
        const height = Number(event.data.height);
        if (frame && Number.isFinite(height) && height > 0 && height < 12000) {
            frame.style.height = Math.max(180, height) + 'px';
        }
    });
    new MutationObserver(() => frames.forEach(sendTheme)).observe(document.documentElement, {
        attributes: true, attributeFilter: ['data-theme']
    });
    document.addEventListener('click', async (event) => {
        const button = event.target.closest('.code-copy');
        if (!button) return;
        const pre = button.closest('.code-card')?.querySelector('pre');
        if (!pre) return;
        try {
            await navigator.clipboard.writeText(pre.textContent.trim());
            const previous = button.innerHTML;
            button.textContent = '已复制';
            setTimeout(() => { button.innerHTML = previous; }, 1200);
        } catch {
            button.textContent = '请手动复制';
        }
    });
})();
