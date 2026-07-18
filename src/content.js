(function () {
    'use strict';

    const VERSION_COMMENT_RE = /tailwindcss\s+v?(\d+\.\d+\.\d+)/i;
    const HREF_VERSION_PATTERNS = [
        /tailwind(?:css)?[@\/\-]v?(\d+\.\d+\.\d+)/i,
        /tailwind(?:css)?.*?[?&](?:v|ver|version)=(\d+\.\d+\.\d+)/i,
    ];

    const V4_THEME_TOKEN_RE =
        /--(?:color-(?:red|blue|green|slate|gray|zinc|neutral|stone|orange|amber|yellow|lime|emerald|teal|cyan|sky|indigo|violet|purple|fuchsia|pink|rose)-\d+|spacing-\d+|font-weight-(?:thin|light|normal|medium|semibold|bold|black)|radius-(?:xs|sm|md|lg|xl|2xl|3xl)|text-(?:xs|sm|base|lg|xl|2xl))\s*:/;

    const FETCH_TIMEOUT_MS = 2500;
    const MAX_STYLESHEETS_TO_FETCH = 12;

    let cache = null;
    const fetchedHrefs = new Map(); // href → version | false

    function safeRules(sheet) {
        try {
            return sheet.cssRules;
        } catch {
            return null;
        }
    }

    // ---------- Detección síncrona ----------

    function extractVersionFromHref(href) {
        for (const re of HREF_VERSION_PATTERNS) {
            const m = href.match(re);
            if (m && /^\d+\.\d+\.\d+$/.test(m[1])) return m[1];
        }
        return null;
    }

    function detectExactVersionSync() {
        // 1) Comentarios en <style> inline
        for (const style of document.querySelectorAll('style')) {
            const m = (style.textContent || '').match(VERSION_COMMENT_RE);
            if (m) return m[1];
        }
        // 2) Href de <link>
        for (const link of document.querySelectorAll('link[rel="stylesheet"]')) {
            const v = extractVersionFromHref(link.href || '');
            if (v) return v;
        }
        // 3) Scripts (CDN Play, etc.)
        for (const script of document.querySelectorAll('script[src]')) {
            const v = extractVersionFromHref(script.src || '');
            if (v) return v;
        }
        return null;
    }

    function detectMajor() {
        let hasPropertyTwRule = false;
        let hasV4AtRule = false;
        let hasV4ThemeTokens = false;
        let hasTwVars = false;
        let hasCdnV3Script = false;

        for (const s of document.querySelectorAll('script[src]')) {
            if (/cdn\.tailwindcss\.com/i.test(s.src)) {
                hasCdnV3Script = true;
                break;
            }
        }

        for (const sheet of document.styleSheets) {
            const rules = safeRules(sheet);
            if (!rules) continue;

            for (const rule of rules) {
                if (!hasPropertyTwRule) {
                    const isPropertyRule =
                        rule.constructor?.name === 'CSSPropertyRule' ||
                        rule.type === 18 ||
                        (rule.cssText || '').startsWith('@property');
                    if (isPropertyRule && /--tw-/.test(rule.cssText || '')) {
                        hasPropertyTwRule = true;
                    }
                }

                const text = rule.cssText || '';
                if (!hasV4AtRule && /@theme\b|@utility\b|@custom-variant\b/.test(text)) {
                    hasV4AtRule = true;
                }
                if (!hasV4ThemeTokens && V4_THEME_TOKEN_RE.test(text)) {
                    hasV4ThemeTokens = true;
                }
                if (!hasTwVars && text.includes('--tw-')) {
                    hasTwVars = true;
                }
                if (hasPropertyTwRule && hasV4ThemeTokens) break;
            }
            if (hasPropertyTwRule && hasV4ThemeTokens) break;
        }

        if (hasPropertyTwRule || hasV4AtRule || hasV4ThemeTokens) return 4;
        if (hasTwVars || hasCdnV3Script) return 3;
        return null;
    }

    function countStylesheets() {
        return (
            document.querySelectorAll('link[rel="stylesheet"]').length +
            document.querySelectorAll('style').length
        );
    }

    // ---------- Detección asíncrona (fetch del CSS crudo) ----------

    async function fetchTextWithTimeout(url) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
        try {
            const res = await fetch(url, {
                signal: controller.signal,
                credentials: 'omit',
            });
            if (!res.ok) return null;
            return await res.text();
        } catch {
            return null;
        } finally {
            clearTimeout(timer);
        }
    }

    async function tryFetchVersion(href) {
        if (fetchedHrefs.has(href)) {
            const cached = fetchedHrefs.get(href);
            return cached || null;
        }
        const text = await fetchTextWithTimeout(href);
        if (!text) {
            fetchedHrefs.set(href, false);
            return null;
        }
        const m = text.match(VERSION_COMMENT_RE);
        if (m) {
            fetchedHrefs.set(href, m[1]);
            return m[1];
        }
        fetchedHrefs.set(href, false);
        return null;
    }

    function scoreHref(href) {
        let score = 0;
        try {
            if (new URL(href).origin === location.origin) score += 2;
        } catch { }
        if (/tailwind/i.test(href)) score += 5;
        if (/\.css(\?|$)/i.test(href)) score += 1;
        return score;
    }

    async function detectExactVersionFromLinks() {
        const links = Array.from(
            document.querySelectorAll('link[rel="stylesheet"][href]')
        )
            .map((link) => ({ href: link.href, score: scoreHref(link.href) }))
            .filter((item) => item.href)
            .sort((a, b) => b.score - a.score)
            .slice(0, MAX_STYLESHEETS_TO_FETCH);

        if (links.length === 0) return null;

        // Estrategia: los hrefs con "tailwind" en la URL casi seguro tienen el comentario,
        // los buscamos primero en serie con early exit para no esperar los demás.
        const priority = links.filter(({ href }) => /tailwind/i.test(href));
        for (const { href } of priority) {
            const v = await tryFetchVersion(href);
            if (v) return v;
        }

        // El resto en paralelo: el primero que retorne versión, gana.
        const rest = links.filter(({ href }) => !/tailwind/i.test(href));
        if (rest.length === 0) return null;

        try {
            const version = await Promise.any(
                rest.map(async ({ href }) => {
                    const v = await tryFetchVersion(href);
                    if (v) return v;
                    throw new Error('no match');
                })
            );
            return version;
        } catch {
            return null;
        }
    }

    // ---------- Análisis y flujo ----------

    function analyzeSync() {
        const exact = detectExactVersionSync();
        const major = exact ? parseInt(exact, 10) : detectMajor();
        const detected = !!major;

        cache = {
            detected,
            version: exact,
            major,
            hostname: location.hostname,
            stylesheetsCount: countStylesheets(),
            timestamp: Date.now(),
        };

        try {
            chrome.runtime.sendMessage({ type: 'TW_STATUS', payload: cache });
        } catch { }

        return cache;
    }

    async function enrichWithExactVersion() {
        if (!cache?.detected || cache.version) return cache;
        const exact = await detectExactVersionFromLinks();
        if (exact) {
            cache.version = exact;
            cache.major = parseInt(exact, 10);
            try {
                chrome.runtime.sendMessage({ type: 'TW_STATUS', payload: cache });
            } catch { }
        }
        return cache;
    }

    const runInitial = () => {
        setTimeout(() => {
            analyzeSync();
            enrichWithExactVersion();
        }, 600);
    };
    if (document.readyState === 'complete') runInitial();
    else window.addEventListener('load', runInitial);

    let recheckTimer = null;
    const observer = new MutationObserver((mutations) => {
        const relevant = mutations.some((m) =>
            Array.from(m.addedNodes).some(
                (n) =>
                    n.nodeType === 1 &&
                    (n.tagName === 'STYLE' ||
                        n.tagName === 'LINK' ||
                        n.querySelector?.('style, link[rel="stylesheet"]'))
            )
        );
        if (!relevant) return;
        clearTimeout(recheckTimer);
        recheckTimer = setTimeout(() => {
            fetchedHrefs.clear();
            analyzeSync();
            enrichWithExactVersion();
        }, 800);
    });
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });

    chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
        if (msg?.type === 'GET_STATUS' || msg?.type === 'REFRESH') {
            (async () => {
                if (msg.type === 'REFRESH') {
                    fetchedHrefs.clear();
                    analyzeSync();
                } else if (!cache) {
                    analyzeSync();
                }

                if (cache?.detected && !cache.version) {
                    await enrichWithExactVersion();
                }

                sendResponse(cache);
            })();
            return true;
        }
        return false;
    });
})();