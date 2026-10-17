# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Web developers, frontend engineers, and UI/UX designers who inspect websites while browsing to quickly verify whether a site uses Tailwind CSS and which version (`v3.x` or `v4.x` / exact semver) is running.

## Product Purpose

Tailwind Detector is a lightweight Chrome Extension (Manifest V3) that automatically detects whether the active webpage uses Tailwind CSS, identifies the version (exact when compiler comments or CDN URLs are present, or major version via CSSOM signatures), lights up the toolbar icon with a real-time version badge, and displays a concise status popup.

## Positioning

Zero-configuration, real-time detection of both Tailwind CSS v3 and v4 (including CSS-first `@theme`, `@utility`, `@property --tw-*`, and theme tokens) with parallel raw CSS header fetching to recover stripped CSSOM version comments, running 100% locally with zero telemetry and zero dependencies.

## Operating Context

Used inside Google Chrome (and Chromium-based browsers) as a toolbar extension popup (compact viewport ~300–340px wide) and toolbar action badge. Users glance at the browser toolbar icon while browsing or click the icon to see the current tab's domain, detection status, and version, with a one-click re-analysis trigger and theme toggle.

## Capabilities and Constraints

- **Manifest V3** Chrome Extension (`activeTab`, `scripting`, `storage`).
- **100% Vanilla HTML, CSS, and JavaScript** in `src/` with no build step and no external runtime dependencies.
- **Strict data scope in popup**: displays only the current detection status (`detected`, `not-detected`, `unavailable`, `loading`), detected version (`vX.Y.Z` or `vX.x`), active hostname, re-analyze button, theme toggle (light/dark), and GitHub open-source link—no extra diagnostic panels.
- **Toolbar Icon Badge**: displays the short detected version directly on the extension icon via native `chrome.action.setBadgeText` (e.g., `v4.0`, `v3.4` when exact version is known, or `v4`, `v3` when approximate).
- **Bilingual i18n**: supports English (`en`, default) and Spanish (`es`) via `chrome.i18n` (`_locales/`).
- **Zero telemetry**: all analysis runs locally in the browser.

## Brand Commitments

- Name: **Tailwind Detector**
- Author / Repository: `GallitoMZ/tailwind-detector` (MIT Open Source)
- Existing icon assets: `src/icons/icon-activo-{16,48,128}.png` and `src/icons/icon-inactivo-{16,48,128}.png`

## Evidence on Hand

- Extension source in `src/` (`manifest.json`, `background.js`, `content.js`, `popup.html`, `popup.css`, `popup.js`, `_locales/en/messages.json`, `_locales/es/messages.json`).
- Screenshots of v1.0.2 in `screenshots/`.

## Product Principles

1. **Instantaneous clarity**: Both the toolbar badge and popup must communicate detection state and version in a split-second glance.
2. **Focused restraint**: Show only essential facts (state, version, hostname) without clutter or unnecessary telemetry panels.
3. **Zero-dependency craftsmanship**: Pure HTML, CSS, and JS engineered for immediate load, smooth state transitions, and crisp light/dark themes.
