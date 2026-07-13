# Contribuir a Tailwind Detector

¡Gracias por tu interés en contribuir!

## Reportar bugs

Antes de abrir un issue:

1. Revisa que no exista uno similar en [Issues](https://github.com/GallitoMZ/tailwind-detector/issues)
2. Usa la plantilla de bug report
3. Incluye siempre la URL donde ocurre el problema

## Sugerir mejoras

Usa la plantilla de feature request. Menciona el caso de uso concreto.

## Pull Requests

1. Fork el repo y clona tu fork
2. Crea una branch desde `main`: `git checkout -b fix/mi-cambio`
3. Haz tus cambios en `src/`
4. Prueba localmente cargando la extensión en `chrome://extensions` con "Cargar descomprimida"
5. Commit siguiendo [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat: nueva capacidad`
   - `fix: corrección de bug`
   - `docs: cambios en documentación`
   - `refactor: cambio de código sin cambio de comportamiento`
6. Push a tu fork y abre un PR contra `main`

## Estructura del proyecto

- `src/manifest.json` — configuración de la extensión
- `src/background.js` — service worker (icono, cache)
- `src/content.js` — detección de Tailwind en la página
- `src/popup.*` — interfaz del popup
- `src/icons/` — iconos activo/inactivo

## Convenciones de código

- JavaScript vanilla, sin build step
- Formato: 2 espacios, comillas simples, punto y coma
- Nombres de funciones en camelCase
- Comentarios en español o inglés (indistinto)

## Testear la detección

Sitios de prueba recomendados:

- ✅ Con Tailwind v4: [tailwindcss.com](https://tailwindcss.com)
- ✅ Con Tailwind v3: [claude.ai](https://claude.ai)
- ❌ Sin Tailwind: [wikipedia.org](https://wikipedia.org)
- ⚠️ Página restringida: `chrome://extensions`