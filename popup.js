'use strict';

const $ = (id) => document.getElementById(id);
const app = $('app');
const statusTitle = $('statusTitle');
const versionPill = $('versionPill');
const versionValue = $('versionValue');
const hostValue = $('hostValue');
const note = $('note');
const noteText = $('noteText');
const refreshBtn = $('refreshBtn');
const themeToggle = $('themeToggle');

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
function setNote(html) {
    if (!html) {
        note.hidden = true;
        noteText.innerHTML = '';
        return;
    }
    noteText.innerHTML = html;
    note.hidden = false;
}

function renderStatus(data) {
    // Página del navegador o inaccesible
    if (!data) {
        app.dataset.state = 'unavailable';
        statusTitle.textContent = 'Análisis no disponible';
        hostValue.textContent = 'Página protegida del navegador';
        hostValue.title = '';
        versionPill.hidden = true;
        setNote(
            'Chrome no permite ejecutar extensiones en páginas internas como <strong>chrome://</strong>, <strong>about:</strong> o la Web Store. Abre esta extensión en cualquier otra pestaña.'
        );
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
        hostValue.textContent = data.hostname || '—';
        hostValue.title = data.hostname || '';

        if (data.version) {
            setNote(null);
        } else if (data.major) {
            setNote(
                `Se detectó Tailwind <strong>v${data.major}</strong> por firmas del CSS. La versión exacta no está disponible (probablemente el build eliminó los comentarios).`
            );
        } else {
            setNote(null);
        }
    } else {
        app.dataset.state = 'not-detected';
        statusTitle.textContent = 'Tailwind no encontrado';
        versionPill.hidden = true;
        hostValue.textContent = data.hostname || '—';
        hostValue.title = data.hostname || '';

        const count = data.stylesheetsCount ?? 0;
        if (count === 0) {
            setNote(
                'No se encontraron hojas de estilo en esta página. Si el sitio aún está cargando, vuelve a analizar en unos segundos.'
            );
        } else {
            setNote(
                `Se revisaron <strong>${count}</strong> ${count === 1 ? 'hoja de estilo' : 'hojas de estilo'
                } y ninguna contiene firmas de Tailwind CSS.`
            );
        }
    }
}

// -------- Comunicación ----------
async function getActiveTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab;
}

async function requestStatus(type = 'GET_STATUS') {
    const tab = await getActiveTab();
    if (
        !tab?.id ||
        !tab.url ||
        /^(chrome|edge|about|chrome-extension):/i.test(tab.url)
    ) {
        renderStatus(null);
        return;
    }

    try {
        const response = await chrome.tabs.sendMessage(tab.id, { type });
        renderStatus(response);
    } catch {
        renderStatus(null);
    }
}

refreshBtn.addEventListener('click', async () => {
    refreshBtn.classList.add('is-refreshing');
    app.dataset.state = 'loading';
    statusTitle.textContent = 'Analizando…';
    versionPill.hidden = true;
    setNote(null);

    await new Promise((r) => setTimeout(r, 400));
    await requestStatus('REFRESH');

    setTimeout(() => refreshBtn.classList.remove('is-refreshing'), 500);
});

// -------- Init ----------
(async function init() {
    await initTheme();
    await requestStatus('GET_STATUS');
})();