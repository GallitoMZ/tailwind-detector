---
name: Tailwind Detector
description: Precision developer inspection HUD for real-time Tailwind CSS detection and version telemetry.
colors:
  sky-signal: "#0284c7"
  emerald-beacon: "#059669"
  emerald-mint: "#34d399"
  emerald-tint: "#ecfdf5"
  amber-shield: "#d97706"
  amber-tint: "#fffbeb"
  carbon-void: "#0b0f17"
  slate-chassis: "#111827"
  console-well: "#070a10"
  frost-ground: "#f8fafc"
  recessed-slate: "#f1f5f9"
  pure-surface: "#ffffff"
  slate-border: "#e2e8f0"
  slate-border-strong: "#cbd5e1"
  ink-primary: "#0f172a"
  ink-muted: "#475569"
typography:
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  body:
    fontFamily: "ui-monospace, 'SFMono-Regular', 'Cascadia Code', 'JetBrains Mono', Consolas, monospace"
    fontSize: "11.5px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
  label:
    fontFamily: "ui-monospace, 'SFMono-Regular', 'Cascadia Code', 'JetBrains Mono', Consolas, monospace"
    fontSize: "11.5px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
rounded:
  xxs: "4px"
  xs: "5px"
  sm: "6px"
  md: "7px"
  lg: "9px"
  xl: "10px"
  bay: "12px"
spacing:
  xs: "5px"
  sm: "8px"
  md: "10px"
  lg: "12px"
  xl: "14px"
components:
  button-primary:
    backgroundColor: "{colors.pure-surface}"
    textColor: "{colors.ink-primary}"
    typography: "{typography.title}"
    rounded: "{rounded.lg}"
    padding: "9px 12px"
  button-primary-hover:
    backgroundColor: "{colors.recessed-slate}"
    textColor: "{colors.ink-primary}"
  button-icon:
    backgroundColor: "{colors.pure-surface}"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.md}"
    size: "28px"
  chip-version:
    backgroundColor: "{colors.emerald-tint}"
    textColor: "{colors.emerald-beacon}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
  card-readout:
    backgroundColor: "{colors.pure-surface}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.bay}"
---

# Design System: Tailwind Detector

## Overview

**Creative North Star: "The Precision Inspector HUD"**

Tailwind Detector treats browser extension telemetry like a high-precision developer instrument rather than a marketing widget. Every pixel inside the compact 320px frame is structured for immediate diagnostic scannability: the status beacon, the semantic headline, and the tabular version chip live inside an elevated readout bay, while the inspected hostname sits in a recessed monospace console well below.

The visual system rejects floating glowing circles, decorative gradients, and ungrounded pill clouds in favor of structural 1px borders, tactile keycap buttons with subtle top highlights, and crisp state-driven semantic accents. Light mode reads like a clean laboratory specification sheet on cool slate paper; dark mode shifts into a deep carbon DevTools chassis.

**Key Characteristics:**
- **Instrument Bay Framing:** Primary status and domain telemetry share a unified card container (`12px` radius) split by a structural 1px hairline into an elevated status header and a recessed domain well.
- **Tabular Version Telemetry:** Version tags (`v4.0.14`, `v4.x`) and toolbar badges (`v4.0`, `v3.4`) use monospace numerals (`tabular-nums`) and optical cap-height trimming (`text-box: trim-both cap alphabetic`).
- **Tactile Keycap Controls:** Interactive buttons combine a 1px structural border, a soft drop shadow, an inner top highlight bevel, and a physical `1px` press translation.
- **State-Reactive Semantics:** Emerald signals active Tailwind detection, Sky Blue marks clean non-detection or active scanning, and Amber warns of browser-protected pages.

## Colors

The palette pairs cool architectural slates with three high-contrast diagnostic signal hues calibrated to maintain WCAG AA contrast across both light and dark modes.

### Primary
- **Sky Signal** (`#0284c7` light / `#38bdf8` dark): Powers the toolbar action badge background, loading spinner arc, focus rings, text selection tint, and the "not-detected" search indicator.

### Secondary
- **Emerald Beacon** (`#059669` light icon, `#047857` light text / `#34d399` dark): Reserved exclusively for positive Tailwind CSS detection states—coloring the check beacon, readout bay border tint, live status dot, and version pill.
- **Emerald Tint** (`#ecfdf5` light / `rgba(16, 185, 129, 0.14)` dark): Soft semantic fill for the detected beacon squircle and version token chip.

### Tertiary
- **Amber Shield** (`#d97706` light / `#fbbf24` dark): Signals restricted or browser-internal pages (`chrome://`, `edge://`) where content scripts cannot run.
- **Amber Tint** (`#fffbeb` light / `rgba(251, 191, 36, 0.12)` dark): Subtle fill for the unavailable state beacon.

### Neutral
- **Frost Ground & Carbon Void** (`#f8fafc` light / `#0b0f17` dark): Outer instrument chassis background.
- **Pure Surface & Slate Chassis** (`#ffffff` light / `#111827` dark): Elevated surface for the readout bay, brand mark frame, and tactile buttons.
- **Recessed Slate & Console Well** (`#f1f5f9` light / `#070a10` dark): Sunken background for the domain bar and default beacon housing.
- **Slate Border & Strong Border** (`#e2e8f0` & `#cbd5e1` light / `#1e293b` & `#334155` dark): Structural 1px hairlines and button keycap edges.
- **Ink Primary & Muted Slate** (`#0f172a` & `#475569` light / `#f8fafc` & `#94a3b8` dark): Primary heading copy and secondary slate-tinted metadata.

### Named Rules
**The Tinted-Slate Secondary Rule.** Secondary text, icons, and borders must always carry the cool slate undertone (`#475569` / `#94a3b8`) rather than dead neutral gray (`#737373`), keeping the HUD cohesive across themes.
**The Semantic Exclusivity Rule.** Emerald (`#059669` / `#34d399`) appears only when Tailwind CSS is confirmed on the active page; never use it for generic UI chrome or buttons.

## Typography

**Display / UI Font:** System UI Sans (`-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', system-ui, sans-serif`)
**Label / Mono Font:** Technical Monospace (`ui-monospace, 'SFMono-Regular', 'Cascadia Code', 'JetBrains Mono', Consolas, monospace`)

**Character:** Crisp, high-legibility system sans handles UI labels and status titles, while a technical monospace voice grounds version numbers and inspected hostnames in developer-tool authenticity.

### Hierarchy
- **Headline** (`600` weight, `14px`, `1.25` line-height, `-0.015em` tracking): Primary detection status title (`#statusTitle`), balanced with `text-wrap: balance`.
- **Title** (`600` weight, `13px`, `1.2` line-height, `-0.015em` tracking): Extension brand name in the top bar and primary button label (`12.5px`), trimmed with `text-box: trim-both cap alphabetic`.
- **Body** (`400` weight, `11.5px`, `1.3` line-height, monospace): Inspected domain hostname inside the recessed console well, truncated cleanly with `text-overflow: ellipsis`.
- **Label** (`600` weight, `11.5px`, `1` line-height, `-0.02em` tracking, monospace `tabular-nums`): Version chip readout (`v4.0.14` / `v4.x`).

### Named Rules
**The Optical Cap-Trim Rule.** All compact badges, brand titles, and button labels apply `text-box: trim-both cap alphabetic` so vertical padding hugs the visible glyph bounds with zero ghost leading.
**The Tabular Version Rule.** Version strings in both the popup pill and toolbar badge use monospace or `tabular-nums` so digit widths never jitter during state updates.

## Layout

The popup operates within a fixed `320px` width container (`.app`) padded at `12px` with a `10px` vertical rhythm separating three distinct zones:
1. **Top Instrument Bar (`.topbar`):** Single-row flex header (`justify-content: space-between`) pairing the `24px` framed brand mark and title on the left with the `28px` theme toggle keycap on the right.
2. **Diagnostic Viewport (`.viewport`):** Houses the `.readout-bay` card, which stacks the `14px`-padded `.readout-main` status row (`44px` beacon squircle + flexible status/version row) above the `8px 14px`-padded `.domain-well`.
3. **Control Deck (`.control-deck`):** Stacks the full-width `9px 12px` re-analyze button above the centered GitHub colophon link with an `8px` gap.

## Elevation & Depth

Depth is architectural and tactile rather than atmospheric. Instead of wide glowing halos, the interface separates layers using 1px structural borders, subtle surface contrast between elevated cards and recessed wells, and tight multi-part shadows that combine a soft downward drop with a 1px inner top highlight.

### Shadow Vocabulary
- **Readout Card Elevation** (`box-shadow: 0 2px 6px -1px rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)` light / `0 4px 12px -2px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.3)` dark): Lifts the central `.readout-bay` off the chassis ground.
- **Keycap Bevel** (`box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)` light / `0 1px 3px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06)` dark): Gives `.btn`, `.icon-btn`, and `.brand__mark` a tactile physical keycap edge.
- **Recessed Console Well** (`box-shadow: inset 0 1px 2px rgba(15, 23, 42, 0.05)` light / `inset 0 1px 3px rgba(0, 0, 0, 0.45)` dark): Sinks the `.domain-well` below the readout bay surface.

### Named Rules
**The No-Halo Rule.** Never use zero-offset colored blur halos (`0 0 20px`) around status icons; communicate state through crisp 1px border tints and high-contrast surface fills.

## Shapes

The geometry follows a nested concentric squircle progression: outer containers use a `12px` radius (`.readout-bay`), inner beacons use a `10px` radius (`.beacon__surface`), full-width action buttons use a `9px` radius (`.btn`), icon keycaps use a `7px` radius (`.icon-btn`), and version token chips use a `6px` technical radius (`.status__pill`) instead of fully rounded `999px` pills. Every container is bounded by a `1px solid` border.

## Components

### Buttons
- **Shape:** Tactile rounded rectangle (`9px` radius for primary `.btn`, `7px` radius for `28px × 28px` `.icon-btn`).
- **Primary (`.btn`):** Full-width surface fill (`#ffffff` light / `#111827` dark) with strong 1px border (`#cbd5e1` / `#334155`), keycap bevel shadow, `9px 12px` padding, and `12.5px` semibold label paired with a `14px` refresh SVG icon.
- **Hover / Focus / Active:** Hover shifts background to `--surface-hover` (`#f1f5f9` / `#1e293b`) and darkens the border to `--text-muted`; `:active` translates `1px` downward (`translateY(1px)`); `:focus-visible` renders a `2px solid` Sky Signal outline with `2px` offset.

### Chips
- **Style (`.status__pill`):** Technical token badge (`6px` radius, `4px 8px` padding) with a `1px solid` emerald border (`rgba(5, 150, 105, 0.3)`), soft emerald fill, a `6px` live emerald status dot (`.status__pill-dot`), and monospace tabular text.
- **State:** Shown only when `data-state="detected"` and a version (`vX.Y.Z` or `vX.x`) is present; displays an explanatory tooltip when the version is approximate.

### Cards / Containers
- **Corner Style:** `12px` outer border radius on `.readout-bay` with `overflow: hidden`.
- **Background:** Elevated `--surface` (`#ffffff` / `#111827`) for `.readout-main`, transitioning across a `1px solid` top border into `--bg-recessed` (`#f1f5f9` / `#070a10`) for `.domain-well`.
- **Shadow Strategy:** Uses Readout Card Elevation on the outer bay and Recessed Console Well inner shadow on the domain bar.
- **Border:** `1px solid var(--border)` at rest, shifting to `var(--success-border)` when Tailwind CSS is detected.
- **Internal Padding:** `14px` in the main status bay; `8px 14px` in the recessed domain well.

### State Beacon & Indeterminate Spinner
- **Style (`.beacon`):** `44px × 44px` squircle (`10px` radius) housing state-specific `20px` SVG icons (check, search radar, warning shield) that scale in with exponential ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`), plus a semantic `<progress class="loading-spinner">` ring rendered with `conic-gradient()` and `@property` animated arc angles during analysis.

## Do's and Don'ts

### Do:
- **Do** keep the popup focused strictly on the core diagnostic facts (detection state, version badge, active hostname, re-analyze trigger, theme toggle, and GitHub link).
- **Do** format the toolbar icon badge (`chrome.action.setBadgeText`) with the concise version string (`v4.0`, `v3.4`, or `v4`) on a high-contrast Sky Signal (`#0284C7`) background with white (`#FFFFFF`) text.
- **Do** use `text-box: trim-both cap alphabetic` on compact labels and badges so vertical alignment with icons is optically centered.
- **Do** honor `prefers-reduced-motion: reduce` by slowing the indeterminate `<progress>` spinner rotation (`6s`) and collapsing transition durations.

### Don't:
- **Don't** add uppercase kicker or eyebrow labels above `#statusTitle`; let the status heading and version chip carry the hierarchy directly.
- **Don't** use circular `50%` radial glow orbs or `999px` pill containers where the `6px–12px` technical squircle grammar belongs.
- **Don't** introduce external runtime dependencies, webfont network requests, or inline scripts that violate Manifest V3 CSP.
