// Behaviour shared by posts: theme toggle, reading progress, table of contents,
// reading time and previous/next links. Each part is skipped if its element is missing.
(function () {
    const root = document.documentElement;

    // Theme: follow the system until the reader picks one.
    function storedTheme() {
        try { return localStorage.getItem('blog-theme'); } catch (e) { return null; }
    }
    function systemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    root.dataset.theme = storedTheme() || systemTheme();

    document.addEventListener('DOMContentLoaded', function () {
        const toggle = document.querySelector('.theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', function () {
                const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
                root.dataset.theme = next;
                try { localStorage.setItem('blog-theme', next); } catch (e) { /* private mode */ }
            });
        }

        const body = document.querySelector('.post-body');
        if (!body) return;

        // Reading time: CJK characters and Latin words are counted separately.
        const timeSlot = document.querySelector('[data-reading-time]');
        if (timeSlot) {
            const text = body.textContent;
            const cjk = (text.match(/[一-鿿]/g) || []).length;
            const words = (text.replace(/[一-鿿]/g, ' ').match(/[A-Za-z0-9]+/g) || []).length;
            const minutes = Math.max(1, Math.round(cjk / 400 + words / 220));
            timeSlot.textContent = minutes + ' min read';
        }

        // Table of contents from the h2 and h3 headings.
        const headings = Array.from(body.querySelectorAll('h2, h3'));
        const tocTargets = document.querySelectorAll('[data-toc]');
        const used = {};
        headings.forEach(function (h, i) {
            if (!h.id) {
                let id = h.textContent.trim().toLowerCase().replace(/[^\w一-鿿]+/g, '-').replace(/^-|-$/g, '') || 'section-' + (i + 1);
                if (used[id]) id += '-' + (i + 1);
                h.id = id;
            }
            used[h.id] = true;
        });

        const links = [];
        tocTargets.forEach(function (target) {
            if (headings.length < 2) {
                const box = target.closest('.toc, .toc-inline');
                if (box) box.hidden = true;
                return;
            }
            headings.forEach(function (h) {
                const li = document.createElement('li');
                if (h.tagName === 'H3') li.className = 'sub';
                const a = document.createElement('a');
                a.href = '#' + h.id;
                a.textContent = h.textContent;
                li.appendChild(a);
                target.appendChild(li);
                links.push(a);
            });
        });

        // Progress bar and the current section in the table of contents.
        const bar = document.querySelector('.progress');
        let ticking = false;
        function update() {
            ticking = false;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            if (bar) bar.style.width = (max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0) + '%';

            let current = null;
            for (const h of headings) {
                if (h.getBoundingClientRect().top <= 120) current = h; else break;
            }
            links.forEach(function (a) {
                if (current && a.getAttribute('href') === '#' + current.id) a.setAttribute('aria-current', 'true');
                else a.removeAttribute('aria-current');
            });
        }
        window.addEventListener('scroll', function () {
            if (!ticking) { ticking = true; requestAnimationFrame(update); }
        }, { passive: true });
        window.addEventListener('resize', update);
        update();

        // Previous and next posts, from posts.json. Only posts hosted on this site are linked.
        const nav = document.querySelector('.post-nav');
        const base = nav && nav.dataset.base;
        if (nav && base) {
            fetch(base + 'posts.json').then(function (r) { return r.json(); }).then(function (posts) {
                const local = posts.filter(function (p) { return !/^https?:/.test(p.link); });
                const here = new URL('.', window.location.href).pathname;
                const index = local.findIndex(function (p) {
                    return new URL(base + p.link, window.location.href).pathname === here;
                });
                if (index === -1) return;
                // posts.json is newest first, so the next post in time is the one before.
                [['next', local[index - 1], 'Newer'], ['prev', local[index + 1], 'Older']].forEach(function (item) {
                    if (!item[1]) return;
                    const a = document.createElement('a');
                    a.className = item[0];
                    a.href = base + item[1].link;
                    const label = document.createElement('span');
                    label.className = 'label';
                    label.textContent = item[2];
                    a.appendChild(label);
                    a.appendChild(document.createTextNode(item[1].title));
                    if (item[0] === 'prev') nav.prepend(a); else nav.appendChild(a);
                });
            }).catch(function () { /* the links are optional */ });
        }
    });
})();
