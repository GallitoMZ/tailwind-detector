# Tailwind Detector

> Extensión de Chrome que detecta automáticamente si un sitio usa Tailwind CSS, identifica la versión, y enciende el icono en tiempo real.

[![License: MIT](https://img.shields.io/github/license/GallitoMZ/tailwind-detector?color=green)](LICENSE.md)
[![Latest Release](https://img.shields.io/github/v/release/GallitoMZ/tailwind-detector)](https://github.com/GallitoMZ/tailwind-detector/releases)
[![Stars](https://img.shields.io/github/stars/GallitoMZ/tailwind-detector?style=social)](https://github.com/GallitoMZ/tailwind-detector/stargazers)
![Manifest](https://img.shields.io/badge/manifest-v3-orange)
[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-disponible-06B6D4?logo=googlechrome&logoColor=white)](https://chromewebstore.google.com/detail/ekhcfihiokhafofblckaccfeaefljdli)

![Preview](screenshots/detected-light.png)

## Características

- 🔍 **Detección automática por pestaña** — el icono se enciende sin acciones manuales
- 🏷️ **Versión exacta** — muestra `v3.4.1`, `v4.0.14`, etc. cuando el CSS conserva los comentarios del compilador
- ✨ **Soporte v3 y v4** — reconoce las firmas nuevas (`@theme`, `@utility`, `@property --tw-*`) y las clásicas (`--tw-*`)
- 🌓 **Tema claro/oscuro** — respeta la preferencia del sistema
- ⚡ **Rápido** — fetch paralelo con priorización inteligente, cache por sesión
- 🔒 **Sin telemetría** — todo el análisis ocurre localmente

## Instalación

### Desde la Chrome Web Store

[![Disponible en Chrome Web Store](https://img.shields.io/chrome-web-store/v/ekhcfihiokhafofblckaccfeaefljdli?label=Chrome%20Web%20Store&logo=googlechrome&color=06B6D4)](https://chromewebstore.google.com/detail/ekhcfihiokhafofblckaccfeaefljdli)

### Modo desarrollador

1. Clona el repo: `git clone https://github.com/GallitoMZ/tailwind-detector.git`
2. Abre `chrome://extensions`
3. Activa el **Modo desarrollador** (arriba a la derecha)
4. Click en **Cargar descomprimida** → selecciona la carpeta `src/`

## Cómo funciona

La extensión analiza las hojas de estilo de la página buscando firmas únicas de Tailwind:

| Firma | Versión | Confiabilidad |
|-------|---------|---------------|
| Comentario `/*! tailwindcss v... */` | Exacta | Alta |
| `@property --tw-*` | v4 | Alta |
| `@theme`, `@utility`, `@custom-variant` | v4 | Alta |
| Tokens `--color-*`, `--spacing-*` | v4 | Media |
| `--tw-*` sueltos | v3 | Media |
| Script del CDN Play | v3 | Alta |

Si el comentario no aparece en el CSSOM (los navegadores lo descartan), fetchea el CSS crudo desde el `href` del `<link>` para buscarlo ahí.

## Stack

- Manifest V3
- Vanilla JavaScript (sin build step, sin dependencias)
- Chrome APIs: `chrome.action`, `chrome.storage`, `chrome.runtime`, `chrome.tabs`

## Estructura

```
src/
├── manifest.json      # Configuración de la extensión
├── background.js      # Service worker (icono, cache por pestaña)
├── content.js         # Script inyectado (detección)
├── popup.html/css/js  # UI del popup
└── icons/             # Iconos activos/inactivos en 16, 48, 128px
```

## Contribuir

Los PRs son bienvenidos. Casos donde ayuda mucho contribuir:

- Sitios donde la detección falla (abre un issue con la URL y qué esperabas)
- Nuevas firmas de futuras versiones de Tailwind
- Mejoras de accesibilidad en el popup
- Traducciones

## Privacidad

Cero recolección de datos. Detalles en [PRIVACY.md](PRIVACY.md).

## Licencia

MIT © [GallitoMZ](https://github.com/GallitoMZ)