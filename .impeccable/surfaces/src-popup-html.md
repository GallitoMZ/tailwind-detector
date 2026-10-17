---
version: 1
slug: "src-popup-html"
primary_target: "src/popup.html"
related_targets: ["src/popup.css","src/popup.js"]
---

# Surface Brief: Extension Popup (`src/popup.html`)

- **Scope**: Chrome Extension action popup (`320px` width)
- **Visitor Mode**: Operate
- **Audience & Job**: Frontend developers and designers checking whether the active tab uses Tailwind CSS and which version is active, plus triggering a fresh re-scan or toggling light/dark theme.
- **Constraints**: 100% Vanilla HTML/CSS/JS, Manifest V3 CSP compliant, bilingual (`en`/`es`), strict data scope (status, version, hostname, re-analyze button, theme toggle, GitHub link).

## Direction contract

- **THESIS**: A precision developer inspection HUD that treats Tailwind detection like a live DevTools telemetry readout, refusing the generic floating-circle SaaS card layout.
- **OWN-WORLD**: Crisp slate/carbon instrument surfaces (`#0B0F17` dark / `#F8FAFC` light) with structural 1px borders, state-reactive cyan/emerald (`#06B6D4` / `#10B981`), slate-indigo, and amber semantic accents, recessed monospace domain readout well, and tactile keycap-inspired controls.
- **STORY**: The developer opens the popup and immediately reads the active state and tabular version badge inside a structured diagnostic viewport, sees the exact target hostname in a recessed console bar below, and can trigger an instant re-scan with physical button feedback.
- **FIRST VIEWPORT**: Compact `320px` instrument frame: top bar with Tailwind mark, title, and tactile theme switch; central recessed diagnostic bay with animated state beacon, bold status heading, high-contrast tabular version chip (`v4.0.14` / `v4.x`), and sunken hostname pill; bottom deck with full-width tactile re-analyze button and subtle GitHub colophon link.
- **FORM**: Browser DevTools Inspector HUD / Diagnostic Badge, position 3 on the ordered grounded list, seed key `1e650f3a` (code-led build).
- **FINISH**: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
