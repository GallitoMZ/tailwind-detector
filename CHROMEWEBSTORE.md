# Chrome Web Store Listing — Tailwind Detector

> Last Updated: 2026-10-16

## Store Listing

**Extension Name** [REQUIRED]
Tailwind Detector

**Short Description (ES)** [REQUIRED]
Detecta automáticamente si un sitio usa Tailwind CSS, muestra la versión y enciende el icono en tiempo real.

**Short Description (EN)** [REQUIRED]
Automatically detects if a website uses Tailwind CSS, shows the version, and lights up the icon in real time.

**Detailed Description (ES)** [REQUIRED]
Identifica al instante si cualquier sitio web utiliza Tailwind CSS y qué versión tiene activa mientras navegas.

CARACTERÍSTICAS
• Detección en tiempo real — el icono de la extensión se ilumina automáticamente y muestra la versión en el badge (ej. v4.0, v3.4) sin necesidad de hacer clic.
• Versión exacta y rama mayor — muestra el número de versión exacto (como v4.0.14 o v3.4.17) cuando está disponible en los estilos del sitio, o la versión mayor (v4.x, v3.x).
• Compatible con Tailwind CSS v3 y v4 — reconoce tanto proyectos clásicos como la nueva arquitectura de Tailwind v4.
• Interfaz Inspector HUD con modo claro y oscuro — panel compacto de alto contraste que se adapta al tema de tu sistema o a tu elección manual.
• Re-análisis con un clic — vuelve a inspeccionar aplicaciones web dinámicas en cualquier momento desde el popup.
• Inglés y español — la interfaz se muestra automáticamente en el idioma de tu navegador.

CÓMO USARLA
1. Instala la extensión y fíjala en la barra de herramientas de Chrome.
2. Navega por cualquier sitio web: si utiliza Tailwind CSS, el icono se encenderá en color cian/esmeralda mostrando la versión detectada.
3. Haz clic en el icono para ver el estado detallado, la versión completa y el dominio activo, o para cambiar entre tema claro y oscuro.

PRIVACIDAD
Esta extensión no recopila, almacena ni transmite ningún dato personal ni historial de navegación. Todo el análisis ocurre de forma 100% local en tu navegador.

PERMISOS
• "Leer y modificar los datos de los sitios web que visitas" — necesario únicamente para inspeccionar las hojas de estilo de la página activa e identificar si utiliza Tailwind CSS y su versión.
• "Almacenamiento (storage)" — necesario para guardar tu preferencia de tema (claro/oscuro) y recordar temporalmente el resultado de la pestaña actual mientras navegas.

SOPORTE Y CÓDIGO ABIERTO
¿Encontraste un sitio donde no se detecta o tienes alguna sugerencia? Abre un issue en https://github.com/GallitoMZ/tailwind-detector o escribe a erik.hacker.05.96@gmail.com.

Versión 1.0.3 — Nuevo diseño de interfaz Inspector HUD, visualización de la versión detectada directamente en el badge del icono, nuevos iconos de alta precisión y optimización de permisos mínimos.

**Detailed Description (EN)** [REQUIRED]
Instantly identify whether any website uses Tailwind CSS and which version is running as you browse.

FEATURES
• Real-time toolbar indicator — the extension icon lights up automatically and displays the detected version right on the badge (e.g., v4.0, v3.4) without clicking.
• Exact and major version detection — shows the exact version number (such as v4.0.14 or v3.4.17) when present in the site's stylesheets, or the major branch (v4.x, v3.x).
• Full Tailwind CSS v3 and v4 support — recognizes both classic setups and modern Tailwind v4 sites.
• Inspector HUD with Light & Dark themes — high-contrast popup that follows your system preference or manual toggle.
• One-click re-analysis — re-check dynamic single-page applications anytime from the popup.
• English and Spanish — automatically adapts to your browser language.

HOW TO USE
1. Install the extension and pin it to your Chrome toolbar.
2. Browse any website: when Tailwind CSS is detected, the icon lights up with the detected version badge.
3. Click the icon to view the full version tag, active domain, re-analyze button, and theme switcher.

PRIVACY
This extension does not collect, store, or transmit any personal data or browsing history. All detection runs 100% locally on your device.

PERMISSIONS
• "Read and change all your data on all websites" — needed solely to inspect the stylesheets on the page you visit to determine whether Tailwind CSS is used and identify its version.
• "Storage" — needed to save your light/dark theme preference locally and cache the current tab's detection status during your browsing session.

SUPPORT & OPEN SOURCE
Found a bug or have a suggestion? Open an issue at https://github.com/GallitoMZ/tailwind-detector or email erik.hacker.05.96@gmail.com.

Version 1.0.3 — Redesigned Inspector HUD popup, real-time version badge on the toolbar icon, refreshed high-contrast icons, and streamlined minimum permissions.

**Category** [REQUIRED]
Developer Tools

**Single Purpose** [REQUIRED]
Detects whether the active webpage uses Tailwind CSS and displays the detected version in the toolbar icon and popup.

**Primary Language** [REQUIRED]
English (with Spanish localization in `_locales/es`)

## Graphics & Assets

| Asset | Dimensions | Status | Filename |
|-------|-----------|--------|----------|
| Store Icon [REQUIRED] | 128×128 PNG | ✅ Ready | `src/icons/icon-activo-128.png` |
| Screenshot 1 [REQUIRED] | 1280×800 JPEG | ✅ Ready | `screenshots/theme.jpg` |
| Small Promo Tile [RECOMMENDED] | 440×280 JPEG | ✅ Ready | `screenshots/marketing2.jpg` |
| Marquee Promo Tile | 1400×560 JPEG | ✅ Ready | `screenshots/marketing.jpg` |

### Screenshot Notes
- `screenshots/theme.jpg` (1280×800): Shows the redesigned Inspector HUD popup in Dark Mode and Light Mode side by side, the not-detected state, and the real-time `v4.0` version badge on the toolbar icon.
- `screenshots/marketing2.jpg` (440×280): Small promotional tile with the updated squircle icon, version badge preview, and dark HUD popup.
- `screenshots/marketing.jpg` (1400×560): Marquee promotional banner with the updated UI and icon.

## Permissions Justification

| Permission | Type | Justification |
|------------|------|---------------|
| `activeTab` | permissions | Used when the user opens the popup to check whether the active tab is a restricted browser page (`chrome://`, `edge://`) before requesting the Tailwind CSS analysis status. |
| `storage` | permissions | Used to save the user's light/dark theme preference in `chrome.storage.local` and cache the per-tab detection result in `chrome.storage.session` so the popup opens instantaneously. |
| `<all_urls>` (`content_scripts`) | host_permissions / content_scripts | Required because web developers use Tailwind Detector to automatically inspect whether any website they visit uses Tailwind CSS and light up the toolbar icon in real time without manual per-domain configuration. |

## Privacy & Data Use

### Data Collection

**Does the extension collect user data?** No

### Data Use Certification
- [x] Data is NOT sold to third parties
- [x] Data is NOT used for purposes unrelated to the extension's core functionality
- [x] Data is NOT used for creditworthiness or lending purposes

## Privacy Policy

**Privacy Policy URL** [REQUIRED]
https://gallitomz.github.io/tailwind-detector/PRIVACY.html (or https://github.com/GallitoMZ/tailwind-detector/blob/main/PRIVACY.md)

## Distribution

**Visibility**: Public
**Regions**: All regions

## Developer Info

**Publisher Name** [REQUIRED]
GallitoMZ

**Contact Email** [REQUIRED]
erik.hacker.05.96@gmail.com

**Support URL / Email** [RECOMMENDED]
https://github.com/GallitoMZ/tailwind-detector/issues

**Homepage URL** [RECOMMENDED]
https://github.com/GallitoMZ/tailwind-detector

## Version History

| Version | Date | Changes | Status |
|---------|------|---------|--------|
| 1.0.3 | 2026-10-16 | Removed unused `scripting` permission (fixing Purple Potassium violation), redesigned popup UI (Inspector HUD), added version text to toolbar icon badge (`v4.0`, `v3.4`), and updated extension icons and store screenshots. | Ready to Submit |
| 1.0.2 | 2026-07-16 | Added English/Spanish i18n, SPA URL observer, and additional Tailwind v4 token signatures. | Rejected / Removed (Purple Potassium) |
| 1.0.1 | 2026-07-15 | Fixed query-string version false positives and added GitHub link. | Published |
| 1.0.0 | 2026-07-12 | Initial release with Tailwind CSS v3/v4 detection and dark mode. | Published |

## Review Notes

### Known Issues / Limitations
- Cannot analyze browser-internal pages (`chrome://`, `edge://`, Chrome Web Store) due to standard browser security restrictions; the popup gracefully displays "Analysis not available — Protected page".

### Rejection History

| Date | Reason | Fix Applied | Resubmitted |
|------|--------|-------------|-------------|
| 2026-09-25 | **Purple Potassium (Use of Permissions):** The `scripting` permission was requested in `manifest.json` but never used in code (since `content.js` is declared statically in `content_scripts`). | Removed `"scripting"` from `permissions` in `src/manifest.json`, audited remaining permissions (`activeTab`, `storage`), bumped version to `1.0.3`, and packaged `build/tailwind-detector-v1.0.3.zip`. | Pending upload |
