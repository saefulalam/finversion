# FV-UI Pro Monorepo Design

> Design spec untuk FV-UI component library dengan model bisnis Open Core + License Key.

## Overview

| Atribut | Nilai |
|---------|-------|
| Nama | FV-UI |
| Tipe | CSS-first component library |
| Target buyer | Individual developer |
| Pricing | $99-199 lifetime (Pro) |
| Distribution | npm + CDN + copy-paste |
| Pro gating | License key + zip |
| Tech stack | Turborepo + pnpm + Vite + TypeScript |
| Payment | Lemon Squeezy |

## 1. Architecture Overview

### Monorepo Structure

```
finversion/
├── apps/
│   └── finversion/              # Spreadsheet version control app
│       ├── src/
│       ├── package.json
│       └── vite.config.ts
├── packages/
│   ├── ui/                      # FV-UI Core (Free, MIT)
│   │   ├── src/
│   │   │   ├── components/      # Button, Modal, Toast, etc.
│   │   │   ├── tokens/          # Design tokens, CSS variables
│   │   │   ├── utils/           # Helper functions
│   │   │   └── index.ts
│   │   ├── package.json         # @fv-ui/core
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   ├── ui-pro/                  # FV-UI Pro (Paid, license key)
│   │   ├── src/
│   │   │   ├── components/      # DataTable, CommandPalette, etc.
│   │   │   ├── hooks/           # useVirtualScroll, useCombobox
│   │   │   ├── license.ts       # License validation
│   │   │   └── index.ts
│   │   ├── package.json         # @fv-ui/pro
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   └── shared/                  # Shared tokens & utils
│       ├── src/
│       │   ├── tokens.css       # Base design tokens
│       │   ├── utils.ts         # Shared helpers
│       │   └── index.ts
│       └── package.json
├── turbo.json                   # Turborepo config
├── pnpm-workspace.yaml          # Workspace definition
├── package.json                 # Root: scripts, devDependencies
└── .npmrc                       # Registry config
```

### Dependency Flow

```
finversion → @fv-ui/core + @fv-ui/pro
@fv-ui/pro → @fv-ui/core (peer dependency)
@fv-ui/core → shared (tokens + utils)
```

### Package Exports

```json
// @fv-ui/core
{
  "name": "@fv-ui/core",
  "version": "1.0.0",
  "main": "dist/index.cjs",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "style": "dist/styles/fv-ui.css",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./styles": "./dist/styles/fv-ui.css"
  }
}
```

## 2. License Key System

### Key Format

```
FVUI-{4 alphanumeric}-{4 alphanumeric}-{4 alphanumeric}
Contoh: FVUI-A1B2-C3D4-E5F6
```

### User Experience

```typescript
// User config (fv-ui.config.js)
export default {
  pro: true,
  license: "FVUI-ABCD-1234-EFGH"
}
```

### Validation Logic

```typescript
// packages/ui-pro/src/license.ts
export function validateLicense(key: string): boolean {
  // 1. Check format (regex)
  // 2. Check checksum (built-in, no server needed)
  // 3. Return true/false
}
```

### Behavior

| License State | Behavior |
|---------------|----------|
| Valid | Pro components render normally |
| Invalid | console.warn + components return error state |
| Missing | Pro components return "Pro license required" |

### Anti-Piracy (Basic)

- License key tied ke project name (hash)
- Console warning kalau key invalid
- Tidak ada server validation (offline-friendly)
- Bisa upgrade ke server validation nanti

## 3. Build & Distribution

### Build Pipeline

```json
// turbo.json
{
  "pipeline": {
    "build": ["^build"],
    "dev": ["^dev"],
    "lint": [],
    "typecheck": []
  }
}
```

### Output Format

```
packages/ui/dist/
├── index.js          # ESM
├── index.cjs         # CommonJS
├── index.d.ts        # TypeScript declarations
└── styles/
    └── fv-ui.css     # Compiled CSS

packages/ui-pro/dist/
├── index.js
├── index.cjs
├── index.d.ts
└── styles/
    └── fv-ui-pro.css
```

### Distribution Channels

| Channel | Free (Core) | Pro |
|---------|-------------|-----|
| npm | `npm i @fv-ui/core` | Private registry / zip download |
| CDN | unpkg.com/fv-ui-core | Dashboard download |
| Copy-paste | GitHub source | Zip with license key |

### Scripts

```json
// Root package.json
{
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "build:core": "turbo build --filter=@fv-ui/core",
    "build:pro": "turbo build --filter=@fv-ui/pro",
    "build:app": "turbo build --filter=finversion",
    "lint": "turbo lint",
    "typecheck": "turbo typecheck"
  }
}
```

## 4. Component Migration

### Current State → New State

```
SEKARANG:
src\css\fv-ui.css     (1 file, 1200+ lines)
src\js\fv-ui.js       (single JS file)

目标:
packages/ui/src/components/
├── button/
│   ├── button.ts
│   ├── button.css
│   └── index.ts
├── card/
│   ├── card.ts
│   ├── card.css
│   └── index.ts
├── modal/
│   ├── modal.ts
│   ├── modal.css
│   └── index.ts
└── ...
```

### Migration Plan

| Step | Action |
|------|--------|
| 1 | Buat monorepo structure (Turborepo + pnpm) |
| 2 | Pindah design tokens ke `packages/shared/src/tokens.css` |
| 3 | Split `fv-ui.css` jadi per-component di `packages/ui/src/components/` |
| 4 | Refactor `fv-ui.js` jadi per-component modules |
| 5 | Buat barrel export (`index.ts`) |
| 6 | Setup build pipeline (Vite library mode) |
| 7 | Test di `apps/finversion` |

### Component Structure

**Free component:**
```
button/
├── button.ts         # Logic (event handlers, variants)
├── button.css        # Styles (free component)
└── index.ts          # Public export
```

**Pro component:**
```
datatable/
├── datatable.ts      # Logic (sort, filter, paginate)
├── datatable.css     # Styles
├── types.ts          # TypeScript interfaces
├── hooks/
│   ├── useSort.ts
│   ├── useFilter.ts
│   └── usePagination.ts
└── index.ts          # Public export + license check
```

### Key Decisions

- CSS per-component (bundled by Vite, tree-shakeable)
- TypeScript untuk semua logic
- `data-fv-*` attributes untuk styling hooks (existing pattern)
- Dark mode via `data-fv-theme="dark"` (existing pattern)

## 5. Documentation Site

### Tech Stack

- VitePress (static site, fast, markdown-based)
- Deploy ke Vercel (gratis untuk open source)

### Structure

```
docs/
├── .vitepress/
│   └── config.ts
├── index.md              # Landing page
├── getting-started/
│   ├── installation.md
│   ├── quick-start.md
│   └── theming.md
├── components/
│   ├── button.md
│   ├── card.md
│   ├── modal.md
│   └── ...
├── pro/
│   ├── datatable.md
│   ├── command-palette.md
│   └── ... (locked content, CTA ke purchase)
├── examples/
│   └── ... (copy-paste code blocks)
└── pro-purchase.md       # License key activation
```

### Content Strategy

| Page | Purpose |
|------|---------|
| `/` | Hero + feature list + code example + CTA |
| `/components/button` | Docs + live preview + copy-paste code |
| `/pro/datatable` | Preview + "Unlock with Pro" CTA |
| `/getting-started` | Install guide (npm, CDN, copy-paste) |
| `/pro-purchase` | Buy Pro → get license key → activate |

## 6. Marketing & Sales

### Launch Funnel

```
Twitter/X thread → Landing page → Docs → npm install → Upgrade Pro
     ↓                    ↓              ↓
  Viral dev           SEO/Google    Component page
  community           "best CSS     with live preview
                      component
                      library"
```

### Sales Flow

```
1. User discover FV-UI (Twitter, Google, GitHub)
2. Try Free components (npm install, copy-paste)
3. See Pro preview (DataTable, CommandPalette)
4. Click "Unlock Pro" → redirect ke payment
5. Payment via Lemon Squeezy (handles license key)
6. User dapet license key
7. User add ke fv-ui.config.js
8. Pro components unlock
```

### Payment Provider

| Provider | Fee | License key | Recommendation |
|----------|-----|-------------|----------------|
| Gumroad | 10% | Built-in | Simple |
| Lemon Squeezy | 5% + $0.50 | Built-in | Better rate |
| Stripe | 2.9% + $0.30 | Butuk custom | Butuh dev time |

**Selected: Lemon Squeezy**
- Rate lebih murah dari Gumroad
- Built-in license key generation
- Handles tax, refunds, affiliate
- Dashboard untuk track sales

### Marketing Channels

- Twitter/X: Component showcases, tips, behind-the-scenes
- Dev.to / HackerNoon: Tutorial articles
- ProductHunt: Launch day
- GitHub: Star, community, issues

## Appendix: Component Split

### Free (MIT)

| Component | Description |
|-----------|-------------|
| Button | Primary, secondary, ghost, danger, sizes, icon |
| Badge | Status badges, accent, success, warning, danger |
| Card | Content cards, header, body, footer, hover |
| Input | Text inputs, sizes |
| Select | Dropdown select |
| Label | Form labels |
| Table | Data tables, striped |
| Modal | Dialog overlay |
| Dropdown | Click dropdown menus |
| Tabs | Tabbed navigation |
| Toast | Notification toasts |
| Skeleton | Loading skeletons |
| Tooltip | Hover tooltips |
| Breadcrumb | Navigation breadcrumb |
| Accordion | Collapsible content |
| Alert | Alert messages |
| Avatar | User avatars, sizes |
| Checkbox | Checkbox inputs |
| Sidebar | Side navigation |
| DatePicker | Date picker (basic) |

### Pro ($99-199 lifetime)

| Component | Description |
|-----------|-------------|
| DataTable | Sort, filter, paginate, search |
| CommandPalette | Spotlight-style command menu |
| DateRangePicker | Date range selection |
| DateTimePicker | Date + time selection |
| MultiSelect | Multi-select dropdown |
| Combobox | Searchable select with API |
| SpreadsheetGrid | Spreadsheet-like grid |
| FormulaBar | Formula input bar |
| VirtualizedList | Scroll performance |
| TreeSelect | Hierarchical select |
| MultiStepForm | Step-by-step forms |
| Pro Templates | Dashboard, auth, billing pages |

---

*Document version: 1.0*
*Created: 2026-07-12*
*Status: Draft - Pending user review*
