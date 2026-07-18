'use strict';

const $ = (id) => document.getElementById(id);
const t = (key, ...subs) => chrome.i18n.getMessage(key, subs) || key;

const app = $('app');
const statusTitle = $('statusTitle');
const versionPill = $('versionPill');
const versionValue = $('versionValue');
const hostValue = $('hostValue');
const refreshBtn = $('refreshBtn');
const themeToggle = $('themeToggle');

const isRestrictedUrl = (url) =>
    !url || /^(chrome|edge|about|chrome-extension):/i.test(url);

// -------- i18n ----------
function applyI18n() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
        el.title = t(el.dataset.i18nTitle);
        el.setAttribute('aria-label', t(el.dataset.i18nTitle));
    });
}

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
        statusTitle.textContent = t('unavailable');
        hostValue.textContent = t('protectedPage');
        hostValue.title = '';
        versionPill.hidden = true;
        versionPill.title = '';
        return;
    }

    if (data.detected) {
        app.dataset.state = 'detected';
        statusTitle.textContent = t('detected');
        versionValue.textContent = data.version
            ? `v${data.version}`
            : data.major
                ? `v${data.major}.x`
                : '';
        versionPill.hidden = !(data.version || data.major);
        versionPill.title = data.version
            ? ''
            : data.major
                ? t('versionApprox')
                : '';
    } else {
        app.dataset.state = 'not-detected';
        statusTitle.textContent = t('notDetected');
        versionPill.hidden = true;
        versionPill.title = '';
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

    if (!forceFresh) {
        const cached = await getCachedStatus(tab.id);
        if (cached) {
            renderStatus(cached);
            displayed = cached;
        }
    }

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
    statusTitle.textContent = t('loading');
    versionPill.hidden = true;

    await new Promise((r) => setTimeout(r, 400));
    await loadStatus({ forceFresh: true });

    setTimeout(() => refreshBtn.classList.remove('is-refreshing'), 500);
});

// -------- Init ----------
(async function init() {
    applyI18n();
    await initTheme();
    await loadStatus();
})();