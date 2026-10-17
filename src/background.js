'use strict';

const ICON_ACTIVE = {
    16: 'icons/icon-activo-16.png',
    48: 'icons/icon-activo-48.png',
    128: 'icons/icon-activo-128.png',
};
const ICON_INACTIVE = {
    16: 'icons/icon-inactivo-16.png',
    48: 'icons/icon-inactivo-48.png',
    128: 'icons/icon-inactivo-128.png',
};

const storageKey = (tabId) => `status_${tabId}`;

function formatBadgeVersion(data) {
    if (!data?.detected) return '';
    if (data.version) {
        const parts = String(data.version).trim().replace(/^v/i, '').split('.');
        if (parts.length >= 2) {
            const withV = `v${parts[0]}.${parts[1]}`;
            return withV.length <= 4 ? withV : `${parts[0]}.${parts[1]}`;
        }
        return `v${parts[0]}`;
    }
    if (data.major) {
        return `v${data.major}`;
    }
    return 'TW';
}

async function updateAction(tabId, data) {
    const detected = !!data?.detected;
    try {
        await chrome.action.setIcon({
            tabId,
            path: detected ? ICON_ACTIVE : ICON_INACTIVE,
        });

        const versionLabel = data?.version
            ? `v${data.version}`
            : data?.major
                ? `v${data.major}.x`
                : '';

        await chrome.action.setTitle({
            tabId,
            title: detected
                ? chrome.i18n.getMessage('tooltipDetected', versionLabel) ||
                `Tailwind CSS detected ${versionLabel}`.trim()
                : chrome.i18n.getMessage('tooltipNotDetected') ||
                'Tailwind CSS not detected',
        });

        if (detected) {
            const badgeText = formatBadgeVersion(data);
            await chrome.action.setBadgeText({ tabId, text: badgeText });
            await chrome.action.setBadgeBackgroundColor({ tabId, color: '#0284C7' });
            if (chrome.action.setBadgeTextColor) {
                await chrome.action.setBadgeTextColor({ tabId, color: '#FFFFFF' });
            }
        } else {
            await chrome.action.setBadgeText({ tabId, text: '' });
        }
    } catch {
        // Tab cerrada
    }
}

async function persistStatus(tabId, payload) {
    try {
        await chrome.storage.session.set({ [storageKey(tabId)]: payload });
    } catch { }
}

async function clearStatus(tabId) {
    try {
        await chrome.storage.session.remove(storageKey(tabId));
    } catch { }
}

// Recibe estado desde el content script
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg?.type === 'TW_STATUS') {
        const tabId = sender.tab?.id;
        if (typeof tabId !== 'number') return false;
        updateAction(tabId, msg.payload);
        persistStatus(tabId, msg.payload);
        return false;
    }

    // El popup pide el último estado conocido
    if (msg?.type === 'GET_CACHED_STATUS' && typeof msg.tabId === 'number') {
        (async () => {
            try {
                const key = storageKey(msg.tabId);
                const result = await chrome.storage.session.get(key);
                sendResponse(result[key] || null);
            } catch {
                sendResponse(null);
            }
        })();
        return true;
    }

    return false;
});

// Reset visual + cache cuando la pestaña navega a otra URL
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status === 'loading' && changeInfo.url) {
        updateAction(tabId, { detected: false });
        clearStatus(tabId);
    }
});

// Limpiar cache al cerrar pestañas
chrome.tabs.onRemoved.addListener((tabId) => {
    clearStatus(tabId);
});