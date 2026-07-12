'use strict';

const $ = (id) => document.getElementById(id);
const app = $('app');
const statusTitle = $('statusTitle');
const versionPill = $('versionPill');
const versionValue = $('versionValue');
const hostValue = $('hostValue');
const refreshBtn = $('refreshBtn');
const themeToggle = $('themeToggle');

const isRestrictedUrl = (url) =>
    !url || /^(chrome|edge|about|chrome-extension):/i.test(url);

// -------- Tema ----------
async function initTheme() {
    const { theme } = await chrome.storage.local.get('theme');
    const prefersDark =
        window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    document.documentElement.setAttribute(
        'data-theme',
        theme || (prefersDark ? 'dark' : 'light')
    );
}

themeToggle.addEventListener('click', async () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    await chrome.storage.local.set({ theme: next });
});

// -------- Render ----------
function renderStatus(data) {
    if (!data) {
        app.dataset.state = 'unavailable';
        statusTitle.textContent = 'Análisis no disponible';
        hostValue.textContent = 'Página protegida';
        hostValue.title = '';
        versionPill.hidden = true;
        return;
    }

    if (data.detected) {
        app.dataset.state = 'detected';
        statusTitle.textContent = 'Tailwind detectado';
        versionValue.textContent = data.version
            ? `v${data.version}`
            : data.major
                ? `v${data.major}.x`
                : '';
        versionPill.hidden = !(data.version || data.major);
    } else {
        app.dataset.state = 'not-detected';
        statusTitle.textContent = 'Tailwind no encontrado';
        versionPill.hidden = true;
    }

    hostValue.textContent = data.hostname || '—';
    hostValue.title = data.hostname || '';
}

// -------- Comunicación ----------
async function getActiveTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab;
}

async function getCachedStatus(tabId) {
    try {
        return await chrome.runtime.sendMessage({
            type: 'GET_CACHED_STATUS',
            tabId,
        });
    } catch {
        return null;
    }
}

async function requestFreshStatus(tabId, type = 'GET_STATUS') {
    try {
        return await chrome.tabs.sendMessage(tabId, { type });
    } catch {
        return null;
    }
}

// Compara sin timestamp para evitar re-renders innecesarios
function statusEquals(a, b) {
    if (!a || !b) return a === b;
    return (
        a.detected === b.detected &&
        a.version === b.version &&
        a.major === b.major &&
        a.hostname === b.hostname
    );
}

async function loadStatus({ forceFresh = false } = {}) {
    const tab = await getActiveTab();

    if (!tab?.id || isRestrictedUrl(tab.url)) {
        renderStatus(null);
        return;
    }

    let displayed = null;

    // 1. Mostrar cache inmediatamente si existe
    if (!forceFresh) {
        const cached = await getCachedStatus(tab.id);
        if (cached) {
            renderStatus(cached);
            displayed = cached;
        }
    }

    // 2. Pedir estado fresco al content script y actualizar solo si cambió
    const fresh = await requestFreshStatus(
        tab.id,
        forceFresh ? 'REFRESH' : 'GET_STATUS'
    );

    if (fresh) {
        if (!statusEquals(displayed, fresh)) {
            renderStatus(fresh);
        }
    } else if (!displayed) {
        renderStatus(null);
    }
}

refreshBtn.addEventListener('click', async () => {
    refreshBtn.classList.add('is-refreshing');
    app.dataset.state = 'loading';
    statusTitle.textContent = 'Analizando…';
    versionPill.hidden = true;

    await new Promise((r) => setTimeout(r, 400));
    await loadStatus({ forceFresh: true });

    setTimeout(() => refreshBtn.classList.remove('is-refreshing'), 500);
});

// -------- Init ----------
(async function init() {
    await initTheme();
    await loadStatus();
})();