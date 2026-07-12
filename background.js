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
        ? `Tailwind CSS detectado ${versionLabel}`.trim()
        : 'No se detectó Tailwind CSS',
    });

    if (detected) {
      await chrome.action.setBadgeText({ tabId, text: '✓' });
      await chrome.action.setBadgeBackgroundColor({ tabId, color: '#06B6D4' });
    } else {
      await chrome.action.setBadgeText({ tabId, text: '' });
    }
  } catch {
    // Tab cerrada o inaccesible
  }
}

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg?.type !== 'TW_STATUS') return;
  const tabId = sender.tab?.id;
  if (typeof tabId !== 'number') return;
  updateAction(tabId, msg.payload);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'loading' && changeInfo.url) {
    updateAction(tabId, { detected: false });
  }
});