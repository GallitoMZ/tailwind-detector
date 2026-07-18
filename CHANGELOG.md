# Changelog

## [1.0.2] — 2026-07-16

### Added
- Soporte multiidioma: inglés y español (Chrome selecciona automáticamente)
- Inglés como idioma por defecto para navegadores en idiomas sin traducción
- Tooltip en el pill de versión cuando es aproximada
- Animación de entrada del popup (fade-in)
- Reintento automático de detección en SPAs pesadas (segundo análisis a los 2.6s)
- Detección de cambio de URL en SPAs (pushState/replaceState)
- Firmas adicionales de Tailwind v4: `shadow-*`, `inset-shadow-*`, `breakpoint-*`

### Improved
- Detección más robusta de `<style>` inyectados dentro de contenedores (Nuxt, Astro)
- Observer de mutaciones mejorado para nodos con estilos anidados

## [1.0.1] — 2026-07-15

### Fixed
- Corregido falso positivo de versión en sitios que usan `?v=X.X.X` como cache buster en sus hojas de estilo (ej. Falabella)

### Added
- Link a GitHub en el popup (open source)

## [1.0.0] — 2026-07-12

### Added
- Detección automática de Tailwind CSS en cualquier sitio
- Soporte para versión exacta (v3.x.x, v4.x.x) desde comentarios del CSS
- Soporte para detección aproximada (v3.x, v4.x) desde firmas del CSSOM
- Icono reactivo por pestaña con badge `✓`
- Popup con tema claro/oscuro
- Cache por sesión para apertura instantánea del popup

### Links
- **Chrome Web Store**: [Tailwind Detector](https://chromewebstore.google.com/detail/ekhcfihiokhafofblckaccfeaefljdli)
- **GitHub**: [GallitoMZ/tailwind-detector](https://github.com/GallitoMZ/tailwind-detector)