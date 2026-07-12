# FV-UI Pro Monorepo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build FV-UI component library with Open Core model, Turborepo monorepo, and license key Pro gating.

**Architecture:** Turborepo + pnpm workspaces with three packages: `@fv-ui/core` (free MIT), `@fv-ui/pro` (paid license key), and `shared` (tokens/utils). Components split per-folder with CSS + TypeScript. Vite library mode for build output.

**Tech Stack:** Turborepo, pnpm, Vite, TypeScript, CSS custom properties, Lemon Squeezy (payment)

## Global Constraints

- CSS-first, zero runtime dependency for core
- Apple-style design tokens (existing `data-fv-theme` pattern)
- Dark mode via `data-fv-theme="dark"`
- License key format: `FVUI-{4alpha}-{4alpha}-{4alpha}`
- Target: individual developer, $99-199 lifetime
- Payment: Lemon Squeezy

---

## Phase 1: Monorepo Foundation

### Task 1: Initialize Turborepo + pnpm Workspace

**Files:**
- Create: `package.json` (root)
- Create: `pnpm-workspace.yaml`
- Create: `turbo.json`
- Create: `.npmrc`
- Create: `.gitignore`

**Interfaces:**
- Consumes: existing `src/css/fv-ui.css` and `src/js/fv-ui.js`
- Produces: monorepo structure ready for package creation

- [ ] **Step 1: Create root package.json**

```json
{
  "name": "finversion",
  "private": true,
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "build:core": "turbo build --filter=@fv-ui/core",
    "build:pro": "turbo build --filter=@fv-ui/pro",
    "build:app": "turbo build --filter=finversion",
    "lint": "turbo lint",
    "typecheck": "turbo typecheck"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "typescript": "^5.4.0"
  }
}
```

- [ ] **Step 2: Create pnpm-workspace.yaml**

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

- [ ] **Step 3: Create turbo.json**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "typecheck": {
      "dependsOn": ["^build"]
    }
  }
}
```

- [ ] **Step 4: Create .npmrc**

```ini
shamefully-hoist=true
strict-peer-dependencies=false
```

- [ ] **Step 5: Update .gitignore**

```gitignore
node_modules
.turbo
dist
*.tsbuildinfo
.env
.env.local
```

- [ ] **Step 6: Create directory structure**

```bash
mkdir -p apps/finversion
mkdir -p packages/ui/src/components
mkdir -p packages/ui-pro/src/components
mkdir -p packages/shared/src
```

- [ ] **Step 7: Install dependencies**

Run: `pnpm install`
Expected: lockfile created, node_modules installed

- [ ] **Step 8: Commit**

```bash
git add .
git commit -m "chore: initialize turborepo monorepo structure"
```

---

### Task 2: Create Shared Package (Tokens)

**Files:**
- Create: `packages/shared/package.json`
- Create: `packages/shared/tsconfig.json`
- Create: `packages/shared/src/index.ts`
- Create: `packages/shared/src/tokens.css`
- Create: `packages/shared/src/utils.ts`

**Interfaces:**
- Consumes: existing design tokens from `src/css/fv-ui.css` (lines 6-193)
- Produces: `@fv-ui/shared` package with tokens and utilities

- [ ] **Step 1: Write failing test for shared utils**

```typescript
// packages/shared/src/__tests__/utils.test.ts
import { describe, it, expect } from 'vitest'
import { generateId, formatClassName } from '../utils'

describe('shared utils', () => {
  it('generateId returns string of specified length', () => {
    const id = generateId(8)
    expect(id).toHaveLength(8)
    expect(typeof id).toBe('string')
  })

  it('formatClassName prefixes with fv-', () => {
    expect(formatClassName('button')).toBe('fv-button')
    expect(formatClassName('card')).toBe('fv-card')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/shared && pnpm vitest run`
Expected: FAIL with "Cannot find module '../utils'"

- [ ] **Step 3: Create shared package.json**

```json
{
  "name": "@fv-ui/shared",
  "version": "0.0.1",
  "type": "module",
  "main": "dist/index.cjs",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "style": "dist/tokens.css",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./tokens": "./dist/tokens.css"
  },
  "scripts": {
    "build": "vite build",
    "dev": "vite build --watch",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "devDependencies": {
    "vite": "^5.4.0",
    "vite-plugin-dts": "^4.0.0",
    "vitest": "^2.0.0",
    "typescript": "^5.4.0"
  }
}
```

- [ ] **Step 4: Create utils.ts**

```typescript
// packages/shared/src/utils.ts

export function generateId(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function formatClassName(name: string): string {
  return `fv-${name}`
}

export function mergeClasses(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
```

- [ ] **Step 5: Create tokens.css**

```css
/* packages/shared/src/tokens.css */
:root {
  --bg-body: #EAEFF3;
  --bg-card: linear-gradient(145deg, rgba(255,255,255,0.75) 0%, rgba(243,246,249,0.45) 100%);
  --bg-item: linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(245,247,250,0.7) 100%);
  --text-primary: #1D1D1F;
  --text-secondary: #6E6E73;
  --text-tertiary: #86868B;

  --accent: #0071E3;
  --accent-gradient: linear-gradient(180deg, #3897FF 0%, #0071E3 100%);
  --accent-soft: rgba(0,113,227,0.08);

  --success-gradient: linear-gradient(180deg, #4DE077 0%, #24B049 100%);
  --warning-gradient: linear-gradient(180deg, #FFB340 0%, #E68A00 100%);
  --danger-gradient: linear-gradient(180deg, #FF6961 0%, #D7261E 100%);

  --color-success: #24B049;
  --color-warning: #E68A00;
  --color-danger: #D7261E;

  --border-outer: rgba(0,0,0,0.06);
  --border-inner: rgba(255,255,255,0.9);

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;
  --radius-xl: 30px;

  --shadow-spatial-card:
    0 1px 2px rgba(0,0,0,0.02),
    0 12px 30px rgba(0,0,0,0.06),
    0 25px 60px rgba(0,0,0,0.08),
    inset 0 1px 1px var(--border-inner),
    inset 0 -1px 2px rgba(0,0,0,0.03);

  --shadow-spatial-item:
    0 4px 10px rgba(0,0,0,0.03),
    0 1px 2px rgba(0,0,0,0.02),
    inset 0 1px 0px #ffffff;

  --shadow-spatial-btn:
    0 4px 12px rgba(0,113,227,0.2),
    inset 0 1.5px 1px rgba(255,255,255,0.4),
    inset 0 -1.5px 1px rgba(0,0,0,0.15);

  --shadow-inset-pod:
    inset 0 2px 4px rgba(0,0,0,0.06),
    0 1px 1px rgba(255,255,255,0.8);
}

[data-fv-theme="dark"] {
  color-scheme: dark;
  --bg-body: #0E0E10;
  --bg-card: linear-gradient(145deg, rgba(32,32,36,0.75) 0%, rgba(22,22,24,0.5) 100%);
  --bg-item: linear-gradient(180deg, rgba(42,42,46,0.6) 0%, rgba(30,30,34,0.5) 100%);
  --text-primary: #F5F5F7;
  --text-secondary: #A1A1A6;
  --text-tertiary: #6E6E73;

  --accent-gradient: linear-gradient(180deg, #54A6FF 0%, #0071E3 100%);

  --border-outer: rgba(0,0,0,0.4);
  --border-inner: rgba(255,255,255,0.12);

  --shadow-spatial-card:
    0 20px 50px rgba(0,0,0,0.5),
    0 4px 12px rgba(0,0,0,0.3),
    inset 0 1px 1px var(--border-inner),
    inset 0 -1px 2px rgba(0,0,0,0.5);

  --shadow-spatial-item:
    0 4px 10px rgba(0,0,0,0.2),
    inset 0 1px 0px rgba(255,255,255,0.05);

  --shadow-spatial-btn:
    0 6px 16px rgba(0,113,227,0.3),
    inset 0 1.5px 1px rgba(255,255,255,0.3),
    inset 0 -1.5px 1px rgba(0,0,0,0.3);

  --shadow-inset-pod:
    inset 0 2px 4px rgba(0,0,0,0.3),
    0 1px 1px rgba(255,255,255,0.02);
}

[data-fv-accent="green"] {
  --accent: #24B049;
  --accent-gradient: linear-gradient(180deg, #4DE077 0%, #24B049 100%);
  --accent-soft: rgba(36,176,73,0.08);
}

[data-fv-accent="purple"] {
  --accent: #8B5CF6;
  --accent-gradient: linear-gradient(180deg, #A78BFA 0%, #7C3AED 100%);
  --accent-soft: rgba(139,92,246,0.08);
}

[data-fv-accent="orange"] {
  --accent: #E68A00;
  --accent-gradient: linear-gradient(180deg, #FFB340 0%, #E68A00 100%);
  --accent-soft: rgba(230,138,0,0.08);
}

[data-fv-accent="red"] {
  --accent: #D7261E;
  --accent-gradient: linear-gradient(180deg, #FF6961 0%, #D7261E 100%);
  --accent-soft: rgba(215,38,30,0.08);
}
```

- [ ] **Step 6: Create index.ts**

```typescript
// packages/shared/src/index.ts
export * from './utils'
```

- [ ] **Step 7: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "declaration": true,
    "declarationDir": "dist",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}
```

- [ ] **Step 8: Create vite.config.ts**

```typescript
// packages/shared/vite.config.ts
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [dts({ include: ['src'] })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: 'index'
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  }
})
```

- [ ] **Step 9: Run tests**

Run: `cd packages/shared && pnpm vitest run`
Expected: PASS

- [ ] **Step 10: Build package**

Run: `cd packages/shared && pnpm build`
Expected: `dist/` created with `index.js`, `index.cjs`, `index.d.ts`, `tokens.css`

- [ ] **Step 11: Commit**

```bash
git add packages/shared
git commit -m "feat(shared): add tokens and utility package"
```

---

## Phase 2: FV-UI Core Package

### Task 3: Create Core Package Structure

**Files:**
- Create: `packages/ui/package.json`
- Create: `packages/ui/tsconfig.json`
- Create: `packages/ui/vite.config.ts`
- Create: `packages/ui/src/index.ts`

**Interfaces:**
- Consumes: `@fv-ui/shared` (tokens, utils)
- Produces: `@fv-ui/core` package ready for component migration

- [ ] **Step 1: Create package.json**

```json
{
  "name": "@fv-ui/core",
  "version": "1.0.0",
  "type": "module",
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
  },
  "scripts": {
    "build": "vite build",
    "dev": "vite build --watch",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "peerDependencies": {
    "@fv-ui/shared": "workspace:*"
  },
  "devDependencies": {
    "@fv-ui/shared": "workspace:*",
    "vite": "^5.4.0",
    "vite-plugin-dts": "^4.0.0",
    "vitest": "^2.0.0",
    "typescript": "^5.4.0"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "declaration": true,
    "declarationDir": "dist",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "paths": {
      "@fv-ui/shared": ["../shared/src"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "../shared" }]
}
```

- [ ] **Step 3: Create vite.config.ts**

```typescript
// packages/ui/vite.config.ts
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    dts({ include: ['src'] }),
    {
      name: 'collect-styles',
      generateBundle() {
        // Collect all CSS into single file
        const styles: string[] = []
        for (const [name, chunk] of Object.entries(this.getModuleInfo('') || {})) {
          if (name.endsWith('.css')) {
            styles.push(chunk.code)
          }
        }
      }
    }
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: 'index'
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['@fv-ui/shared'],
      output: {
        globals: {
          '@fv-ui/shared': 'FVShared'
        }
      }
    }
  }
})
```

- [ ] **Step 4: Create barrel export (initial)**

```typescript
// packages/ui/src/index.ts
// FV-UI Core - Export all free components
// Components will be added in Task 4+

export { Button } from './components/button'
export type { ButtonProps } from './components/button'
```

- [ ] **Step 5: Build package**

Run: `cd packages/ui && pnpm build`
Expected: package builds successfully

- [ ] **Step 6: Commit**

```bash
git add packages/ui
git commit -m "feat(ui): create core package structure"
```

---

### Task 4: Migrate Button Component

**Files:**
- Create: `packages/ui/src/components/button/button.ts`
- Create: `packages/ui/src/components/button/button.css`
- Create: `packages/ui/src/components/button/index.ts`
- Create: `packages/ui/src/components/button/__tests__/button.test.ts`
- Modify: `packages/ui/src/index.ts` (add Button export)

**Interfaces:**
- Consumes: `@fv-ui/shared` (mergeClasses, formatClassName)
- Produces: `<Button>` component with variants, sizes, states

- [ ] **Step 1: Write failing test**

```typescript
// packages/ui/src/components/button/__tests__/button.test.ts
import { describe, it, expect } from 'vitest'
import { Button } from '../button'

describe('Button', () => {
  it('creates button element', () => {
    const btn = Button({ children: 'Click me' })
    expect(btn.tagName).toBe('BUTTON')
    expect(btn.textContent).toBe('Click me')
  })

  it('applies primary variant by default', () => {
    const btn = Button({ children: 'Click' })
    expect(btn.className).toContain('fv-btn--primary')
  })

  it('applies secondary variant', () => {
    const btn = Button({ variant: 'secondary', children: 'Click' })
    expect(btn.className).toContain('fv-btn--secondary')
  })

  it('applies size classes', () => {
    const sm = Button({ size: 'sm', children: 'S' })
    const lg = Button({ size: 'lg', children: 'L' })
    expect(sm.className).toContain('fv-btn--sm')
    expect(lg.className).toContain('fv-btn--lg')
  })

  it('applies disabled state', () => {
    const btn = Button({ disabled: true, children: 'Click' })
    expect(btn.disabled).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/ui && pnpm vitest run`
Expected: FAIL with "Cannot find module '../button'"

- [ ] **Step 3: Create button.ts**

```typescript
// packages/ui/src/components/button/button.ts
import { mergeClasses } from '@fv-ui/shared'

export interface ButtonProps {
  children: string | HTMLElement
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  icon?: boolean
  block?: boolean
  onClick?: (e: MouseEvent) => void
}

export function Button(props: ButtonProps): HTMLButtonElement {
  const {
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    icon = false,
    block = false,
    onClick
  } = props

  const button = document.createElement('button')

  button.className = mergeClasses(
    'fv-btn',
    `fv-btn--${variant}`,
    size !== 'md' && `fv-btn--${size}`,
    icon && 'fv-btn--icon',
    block && 'fv-btn--block'
  )

  if (typeof children === 'string') {
    button.textContent = children
  } else {
    button.appendChild(children)
  }

  button.disabled = disabled

  if (onClick) {
    button.addEventListener('click', onClick)
  }

  return button
}
```

- [ ] **Step 4: Create button.css**

```css
/* packages/ui/src/components/button/button.css */
.fv-btn {
  border: none;
  padding: 12px 22px;
  border-radius: var(--radius-xl);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.2px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25,1,0.5,1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  outline: none;
  font-family: inherit;
  gap: 8px;
  white-space: nowrap;
}

.fv-btn:active {
  transform: scale(0.97) translateY(1px);
}

.fv-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.fv-btn--primary {
  background: var(--accent-gradient);
  color: #fff;
  box-shadow: var(--shadow-spatial-btn);
  border-top: 1px solid rgba(255,255,255,0.2);
  border-bottom: 1px solid rgba(0,0,0,0.2);
}

.fv-btn--primary:hover {
  filter: brightness(1.05);
  box-shadow: 0 0 0 4px var(--accent-soft), var(--shadow-spatial-btn);
}

.fv-btn--secondary,
.fv-btn--ghost {
  background: linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(242,244,247,0.85) 100%);
  color: var(--text-primary);
  box-shadow: var(--shadow-spatial-item);
  border: 1px solid rgba(0,0,0,0.04);
  border-top: 1px solid rgba(255,255,255,0.6);
}

[data-fv-theme="dark"] .fv-btn--secondary,
[data-fv-theme="dark"] .fv-btn--ghost {
  background: linear-gradient(180deg, rgba(54,54,58,0.85) 0%, rgba(38,38,42,0.85) 100%);
  color: var(--text-primary);
  border: 1px solid rgba(0,0,0,0.2);
  border-top: 1px solid rgba(255,255,255,0.1);
}

.fv-btn--danger {
  background: var(--danger-gradient);
  color: #fff;
  box-shadow: 0 4px 12px rgba(215,38,30,0.25),
    inset 0 1.5px 1px rgba(255,255,255,0.4),
    inset 0 -1.5px 1px rgba(0,0,0,0.15);
  border-top: 1px solid rgba(255,255,255,0.2);
  border-bottom: 1px solid rgba(0,0,0,0.2);
}

.fv-btn--sm {
  padding: 7px 14px;
  font-size: 13px;
}

.fv-btn--lg {
  padding: 14px 28px;
  font-size: 17px;
}

.fv-btn--icon {
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 50%;
}

.fv-btn--icon.fv-btn--sm {
  width: 28px;
  height: 28px;
  font-size: 13px;
}

.fv-btn--icon.fv-btn--lg {
  width: 44px;
  height: 44px;
  font-size: 18px;
}

.fv-btn--block {
  width: 100%;
}
```

- [ ] **Step 5: Create index.ts**

```typescript
// packages/ui/src/components/button/index.ts
export { Button } from './button'
export type { ButtonProps } from './button'
```

- [ ] **Step 6: Update barrel export**

```typescript
// packages/ui/src/index.ts
export { Button } from './components/button'
export type { ButtonProps } from './components/button'
```

- [ ] **Step 7: Run tests**

Run: `cd packages/ui && pnpm vitest run`
Expected: PASS

- [ ] **Step 8: Build package**

Run: `cd packages/ui && pnpm build`
Expected: Button component compiled to dist/

- [ ] **Step 9: Commit**

```bash
git add packages/ui/src/components/button
git commit -m "feat(ui): add Button component with variants and sizes"
```

---

### Task 5: Migrate Card Component

**Files:**
- Create: `packages/ui/src/components/card/card.ts`
- Create: `packages/ui/src/components/card/card.css`
- Create: `packages/ui/src/components/card/index.ts`
- Create: `packages/ui/src/components/card/__tests__/card.test.ts`
- Modify: `packages/ui/src/index.ts` (add Card export)

**Interfaces:**
- Consumes: `@fv-ui/shared` (mergeClasses)
- Produces: `<Card>` component with header, body, footer slots

- [ ] **Step 1: Write failing test**

```typescript
// packages/ui/src/components/card/__tests__/card.test.ts
import { describe, it, expect } from 'vitest'
import { Card } from '../card'

describe('Card', () => {
  it('creates card element', () => {
    const card = Card({ children: 'Content' })
    expect(card.tagName).toBe('DIV')
    expect(card.className).toContain('fv-card')
  })

  it('applies no-hover variant', () => {
    const card = Card({ noHover: true, children: 'Content' })
    expect(card.className).toContain('fv-card--no-hover')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/ui && pnpm vitest run`
Expected: FAIL with "Cannot find module '../card'"

- [ ] **Step 3: Create card.ts**

```typescript
// packages/ui/src/components/card/card.ts
import { mergeClasses } from '@fv-ui/shared'

export interface CardProps {
  children: string | HTMLElement | (string | HTMLElement)[]
  noHover?: boolean
  className?: string
}

export function Card(props: CardProps): HTMLDivElement {
  const { children, noHover = false, className = '' } = props

  const card = document.createElement('div')

  card.className = mergeClasses(
    'fv-card',
    noHover && 'fv-card--no-hover',
    className
  )

  if (Array.isArray(children)) {
    children.forEach(child => {
      if (typeof child === 'string') {
        card.appendChild(document.createTextNode(child))
      } else {
        card.appendChild(child)
      }
    })
  } else if (typeof children === 'string') {
    card.textContent = children
  } else {
    card.appendChild(children)
  }

  return card
}
```

- [ ] **Step 4: Create card.css**

```css
/* packages/ui/src/components/card/card.css */
.fv-card {
  background: var(--bg-card);
  backdrop-filter: blur(30px) saturate(200%);
  -webkit-backdrop-filter: blur(30px) saturate(200%);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-inner);
  box-shadow: var(--shadow-spatial-card);
  padding: 28px;
  position: relative;
  transition: transform 0.4s cubic-bezier(0.25,1,0.5,1),
    box-shadow 0.4s cubic-bezier(0.25,1,0.5,1);
}

.fv-card:hover {
  transform: translateY(-2px);
}

.fv-card--no-hover:hover {
  transform: none;
}
```

- [ ] **Step 5: Create index.ts**

```typescript
// packages/ui/src/components/card/index.ts
export { Card } from './card'
export type { CardProps } from './card'
```

- [ ] **Step 6: Update barrel export**

```typescript
// packages/ui/src/index.ts
export { Button } from './components/button'
export type { ButtonProps } from './components/button'

export { Card } from './components/card'
export type { CardProps } from './components/card'
```

- [ ] **Step 7: Run tests**

Run: `cd packages/ui && pnpm vitest run`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add packages/ui/src/components/card
git commit -m "feat(ui): add Card component with hover variants"
```

---

### Task 6: Migrate Modal Component

**Files:**
- Create: `packages/ui/src/components/modal/modal.ts`
- Create: `packages/ui/src/components/modal/modal.css`
- Create: `packages/ui/src/components/modal/index.ts`
- Create: `packages/ui/src/components/modal/__tests__/modal.test.ts`
- Modify: `packages/ui/src/index.ts` (add Modal export)

**Interfaces:**
- Consumes: `@fv-ui/shared` (mergeClasses)
- Produces: `<Modal>` component with open/close, header, body, footer

- [ ] **Step 1: Write failing test**

```typescript
// packages/ui/src/components/modal/__tests__/modal.test.ts
import { describe, it, expect } from 'vitest'
import { Modal } from '../modal'

describe('Modal', () => {
  it('creates modal overlay', () => {
    const { overlay } = Modal({ id: 'test', title: 'Test' })
    expect(overlay.tagName).toBe('DIV')
    expect(overlay.className).toContain('fv-modal-overlay')
  })

  it('creates modal dialog', () => {
    const { modal } = Modal({ id: 'test', title: 'Test' })
    expect(modal.className).toContain('fv-modal')
  })

  it('toggles active class', () => {
    const { overlay, open, close } = Modal({ id: 'test', title: 'Test' })
    expect(overlay.classList.contains('active')).toBe(false)
    open()
    expect(overlay.classList.contains('active')).toBe(true)
    close()
    expect(overlay.classList.contains('active')).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/ui && pnpm vitest run`
Expected: FAIL with "Cannot find module '../modal'"

- [ ] **Step 3: Create modal.ts**

```typescript
// packages/ui/src/components/modal/modal.ts
import { mergeClasses } from '@fv-ui/shared'

export interface ModalProps {
  id: string
  title: string
  children?: string | HTMLElement
  footer?: HTMLElement
  size?: 'sm' | 'md' | 'lg'
}

export interface ModalInstance {
  overlay: HTMLDivElement
  modal: HTMLDivElement
  open: () => void
  close: () => void
  toggle: () => void
}

export function Modal(props: ModalProps): ModalInstance {
  const { id, title, children, footer, size = 'md' } = props

  const overlay = document.createElement('div')
  overlay.className = 'fv-modal-overlay'
  overlay.id = `modal-overlay-${id}`

  const modal = document.createElement('div')
  modal.className = mergeClasses(
    'fv-modal',
    size !== 'md' && `fv-modal--${size}`
  )

  // Header
  const header = document.createElement('div')
  header.className = 'fv-modal__header'

  const titleEl = document.createElement('h3')
  titleEl.className = 'fv-modal__title'
  titleEl.textContent = title

  const closeBtn = document.createElement('button')
  closeBtn.className = 'fv-modal__close'
  closeBtn.innerHTML = '&times;'
  closeBtn.addEventListener('click', () => close())

  header.appendChild(titleEl)
  header.appendChild(closeBtn)

  // Body
  const body = document.createElement('div')
  body.className = 'fv-modal__body'
  if (children) {
    if (typeof children === 'string') {
      body.textContent = children
    } else {
      body.appendChild(children)
    }
  }

  modal.appendChild(header)
  modal.appendChild(body)

  // Footer
  if (footer) {
    const footerEl = document.createElement('div')
    footerEl.className = 'fv-modal__footer'
    footerEl.appendChild(footer)
    modal.appendChild(footerEl)
  }

  overlay.appendChild(modal)

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close()
  })

  // Close on Escape key
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close()
  }
  document.addEventListener('keydown', handleEscape)

  function open() {
    overlay.classList.add('active')
    document.body.appendChild(overlay)
  }

  function close() {
    overlay.classList.remove('active')
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay)
      }
    }, 250)
  }

  function toggle() {
    if (overlay.classList.contains('active')) {
      close()
    } else {
      open()
    }
  }

  return { overlay, modal, open, close, toggle }
}
```

- [ ] **Step 4: Create modal.css**

```css
/* packages/ui/src/components/modal/modal.css */
.fv-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;
}

.fv-modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

.fv-modal {
  background: var(--bg-card);
  backdrop-filter: blur(30px) saturate(200%);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-inner);
  box-shadow: var(--shadow-spatial-card);
  width: 90%;
  max-width: 520px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  transform: translateY(20px) scale(0.97);
  transition: transform 0.25s cubic-bezier(0.25,1,0.5,1);
}

.fv-modal-overlay.active .fv-modal {
  transform: translateY(0) scale(1);
}

.fv-modal--sm {
  max-width: 400px;
}

.fv-modal--lg {
  max-width: 720px;
}

.fv-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-outer);
}

.fv-modal__title {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
}

.fv-modal__close {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--bg-item);
  box-shadow: var(--shadow-spatial-item);
  border: none;
  color: var(--text-secondary);
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}

.fv-modal__close:hover {
  background: var(--danger-gradient);
  color: #fff;
}

.fv-modal__body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

.fv-modal__footer {
  padding: 16px 24px;
  border-top: 1px solid var(--border-outer);
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
```

- [ ] **Step 5: Create index.ts**

```typescript
// packages/ui/src/components/modal/index.ts
export { Modal } from './modal'
export type { ModalProps, ModalInstance } from './modal'
```

- [ ] **Step 6: Update barrel export**

```typescript
// packages/ui/src/index.ts
export { Button } from './components/button'
export type { ButtonProps } from './components/button'

export { Card } from './components/card'
export type { CardProps } from './components/card'

export { Modal } from './components/modal'
export type { ModalProps, ModalInstance } from './components/modal'
```

- [ ] **Step 7: Run tests**

Run: `cd packages/ui && pnpm vitest run`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add packages/ui/src/components/modal
git commit -m "feat(ui): add Modal component with open/close and keyboard"
```

---

### Task 7: Migrate Remaining Core Components

**Files:**
- Create: `packages/ui/src/components/badge/` (badge.ts, badge.css, index.ts)
- Create: `packages/ui/src/components/toast/` (toast.ts, toast.css, index.ts)
- Create: `packages/ui/src/components/input/` (input.ts, input.css, index.ts)
- Create: `packages/ui/src/components/select/` (select.ts, select.css, index.ts)
- Create: `packages/ui/src/components/tabs/` (tabs.ts, tabs.css, index.ts)
- Create: `packages/ui/src/components/dropdown/` (dropdown.ts, dropdown.css, index.ts)
- Create: `packages/ui/src/components/skeleton/` (skeleton.ts, skeleton.css, index.ts)
- Create: `packages/ui/src/components/tooltip/` (tooltip.ts, tooltip.css, index.ts)
- Create: `packages/ui/src/components/breadcrumb/` (breadcrumb.ts, breadcrumb.css, index.ts)
- Create: `packages/ui/src/components/accordion/` (accordion.ts, accordion.css, index.ts)
- Create: `packages/ui/src/components/alert/` (alert.ts, alert.css, index.ts)
- Create: `packages/ui/src/components/avatar/` (avatar.ts, avatar.css, index.ts)
- Create: `packages/ui/src/components/checkbox/` (checkbox.ts, checkbox.css, index.ts)
- Create: `packages/ui/src/components/sidebar/` (sidebar.ts, sidebar.css, index.ts)
- Modify: `packages/ui/src/index.ts` (add all exports)

**Interfaces:**
- Consumes: `@fv-ui/shared` (mergeClasses, formatClassName)
- Produces: All free core components

- [ ] **Step 1: Create badge component**

```typescript
// packages/ui/src/components/badge/badge.ts
import { mergeClasses } from '@fv-ui/shared'

export interface BadgeProps {
  children: string
  variant?: 'accent' | 'success' | 'warning' | 'danger' | 'outline'
  dot?: boolean
  count?: boolean
}

export function Badge(props: BadgeProps): HTMLSpanElement {
  const { children, variant = 'accent', dot = false, count = false } = props

  const badge = document.createElement('span')
  badge.className = mergeClasses(
    'fv-badge',
    variant !== 'outline' && `fv-badge--${variant}`,
    dot && 'fv-badge--dot',
    count && 'fv-badge--count'
  )
  badge.textContent = children
  return badge
}
```

- [ ] **Step 2: Create toast component**

```typescript
// packages/ui/src/components/toast/toast.ts
import { mergeClasses } from '@fv-ui/shared'

export interface ToastOptions {
  message: string
  type?: 'success' | 'warning' | 'danger' | 'accent'
  duration?: number
}

let toastContainer: HTMLDivElement | null = null

function getContainer(): HTMLDivElement {
  if (!toastContainer) {
    toastContainer = document.createElement('div')
    toastContainer.className = 'fv-toast-container'
    document.body.appendChild(toastContainer)
  }
  return toastContainer
}

export function Toast(options: ToastOptions): HTMLDivElement {
  const { message, type = 'accent', duration = 3000 } = options

  const container = getContainer()

  const toast = document.createElement('div')
  toast.className = mergeClasses('fv-toast', `fv-toast--${type}`)
  toast.textContent = message

  container.appendChild(toast)

  requestAnimationFrame(() => {
    toast.classList.add('show')
  })

  setTimeout(() => {
    toast.classList.remove('show')
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast)
      }
    }, 300)
  }, duration)

  return toast
}
```

- [ ] **Step 3: Create input component**

```typescript
// packages/ui/src/components/input/input.ts
import { mergeClasses } from '@fv-ui/shared'

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
  value?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onChange?: (e: Event) => void
}

export function Input(props: InputProps): HTMLInputElement {
  const {
    type = 'text',
    placeholder = '',
    value = '',
    size = 'md',
    disabled = false,
    onChange
  } = props

  const input = document.createElement('input')
  input.type = type
  input.placeholder = placeholder
  input.value = value
  input.className = mergeClasses(
    'fv-input',
    size !== 'md' && `fv-input--${size}`
  )
  input.disabled = disabled

  if (onChange) {
    input.addEventListener('input', onChange)
  }

  return input
}
```

- [ ] **Step 4: Create select component**

```typescript
// packages/ui/src/components/select/select.ts
import { mergeClasses } from '@fv-ui/shared'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (e: Event) => void
}

export function Select(props: SelectProps): HTMLSelectElement {
  const { options, value = '', onChange } = props

  const select = document.createElement('select')
  select.className = 'fv-select'

  options.forEach(opt => {
    const option = document.createElement('option')
    option.value = opt.value
    option.textContent = opt.label
    if (opt.value === value) option.selected = true
    select.appendChild(option)
  })

  if (onChange) {
    select.addEventListener('change', onChange)
  }

  return select
}
```

- [ ] **Step 5: Create tabs component**

```typescript
// packages/ui/src/components/tabs/tabs.ts
import { mergeClasses } from '@fv-ui/shared'

export interface TabItem {
  id: string
  label: string
  content: string | HTMLElement
}

export interface TabsProps {
  tabs: TabItem[]
  defaultTab?: string
  onChange?: (tabId: string) => void
}

export function Tabs(props: TabsProps): HTMLDivElement {
  const { tabs, defaultTab = tabs[0]?.id, onChange } = props

  const container = document.createElement('div')

  // Tab list
  const tabList = document.createElement('div')
  tabList.className = 'fv-tabs'

  // Content area
  const content = document.createElement('div')
  content.className = 'fv-tabs__content'

  const tabButtons: HTMLButtonElement[] = []

  tabs.forEach(tab => {
    const btn = document.createElement('button')
    btn.className = mergeClasses('fv-tab', tab.id === defaultTab && 'active')
    btn.textContent = tab.label
    btn.dataset.tabId = tab.id

    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'))
      btn.classList.add('active')

      content.innerHTML = ''
      if (typeof tab.content === 'string') {
        content.textContent = tab.content
      } else {
        content.appendChild(tab.content)
      }

      if (onChange) onChange(tab.id)
    })

    tabButtons.push(btn)
    tabList.appendChild(btn)
  })

  // Show default tab content
  const defaultTabData = tabs.find(t => t.id === defaultTab)
  if (defaultTabData) {
    if (typeof defaultTabData.content === 'string') {
      content.textContent = defaultTabData.content
    } else {
      content.appendChild(defaultTabData.content)
    }
  }

  container.appendChild(tabList)
  container.appendChild(content)

  return container
}
```

- [ ] **Step 6: Create dropdown component**

```typescript
// packages/ui/src/components/dropdown/dropdown.ts
import { mergeClasses } from '@fv-ui/shared'

export interface DropdownItem {
  label: string
  icon?: string
  danger?: boolean
  onClick?: () => void
}

export interface DropdownProps {
  trigger: HTMLElement
  items: DropdownItem[]
}

export function Dropdown(props: DropdownProps): HTMLDivElement {
  const { trigger, items } = props

  const wrapper = document.createElement('div')
  wrapper.className = 'fv-dropdown'

  const menu = document.createElement('div')
  menu.className = 'fv-dropdown__menu'

  items.forEach(item => {
    const btn = document.createElement('button')
    btn.className = mergeClasses(
      'fv-dropdown__item',
      item.danger && 'fv-dropdown__item--danger'
    )
    btn.textContent = item.label

    btn.addEventListener('click', () => {
      wrapper.classList.remove('open')
      if (item.onClick) item.onClick()
    })

    menu.appendChild(btn)
  })

  wrapper.appendChild(trigger)
  wrapper.appendChild(menu)

  trigger.addEventListener('click', () => {
    wrapper.classList.toggle('open')
  })

  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target as Node)) {
      wrapper.classList.remove('open')
    }
  })

  return wrapper
}
```

- [ ] **Step 7: Create skeleton component**

```typescript
// packages/ui/src/components/skeleton/skeleton.ts
import { mergeClasses } from '@fv-ui/shared'

export interface SkeletonProps {
  variant?: 'text' | 'title' | 'avatar' | 'card'
  width?: string
  height?: string
}

export function Skeleton(props: SkeletonProps): HTMLDivElement {
  const { variant = 'text', width, height } = props

  const skeleton = document.createElement('div')
  skeleton.className = mergeClasses(
    'fv-skeleton',
    variant !== 'text' && `fv-skeleton--${variant}`
  )

  if (width) skeleton.style.width = width
  if (height) skeleton.style.height = height

  return skeleton
}
```

- [ ] **Step 8: Create tooltip component**

```typescript
// packages/ui/src/components/tooltip/tooltip.ts
import { mergeClasses } from '@fv-ui/shared'

export interface TooltipProps {
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export function Tooltip(props: TooltipProps): HTMLDivElement {
  const { content, position = 'top' } = props

  const wrapper = document.createElement('div')
  wrapper.className = mergeClasses('fv-tooltip', `fv-tooltip--${position}`)
  wrapper.dataset.fvTooltip = content

  return wrapper
}
```

- [ ] **Step 9: Create breadcrumb component**

```typescript
// packages/ui/src/components/breadcrumb/breadcrumb.ts
import { mergeClasses } from '@fv-ui/shared'

export interface BreadcrumbItem {
  label: string
  href?: string
  active?: boolean
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb(props: BreadcrumbProps): HTMLElement {
  const { items } = props

  const nav = document.createElement('nav')
  nav.className = 'fv-breadcrumb'

  items.forEach((item, index) => {
    if (index > 0) {
      const sep = document.createElement('span')
      sep.className = 'fv-breadcrumb__sep'
      sep.textContent = '/'
      nav.appendChild(sep)
    }

    const link = document.createElement('a')
    link.className = mergeClasses('fv-breadcrumb__item', item.active && 'active')
    link.textContent = item.label
    if (item.href) link.href = item.href

    nav.appendChild(link)
  })

  return nav
}
```

- [ ] **Step 10: Create accordion component**

```typescript
// packages/ui/src/components/accordion/accordion.ts
import { mergeClasses } from '@fv-ui/shared'

export interface AccordionItem {
  title: string
  content: string | HTMLElement
}

export interface AccordionProps {
  items: AccordionItem[]
}

export function Accordion(props: AccordionProps): HTMLDivElement {
  const { items } = props

  const container = document.createElement('div')
  container.className = 'fv-accordion'

  items.forEach(item => {
    const itemEl = document.createElement('div')
    itemEl.className = 'fv-accordion__item'

    const trigger = document.createElement('button')
    trigger.className = 'fv-accordion__trigger'
    trigger.innerHTML = `
      <span>${item.title}</span>
      <i class="bi bi-chevron-down"></i>
    `

    const content = document.createElement('div')
    content.className = 'fv-accordion__content'

    const body = document.createElement('div')
    body.className = 'fv-accordion__body'
    if (typeof item.content === 'string') {
      body.textContent = item.content
    } else {
      body.appendChild(item.content)
    }
    content.appendChild(body)

    trigger.addEventListener('click', () => {
      itemEl.classList.toggle('open')
    })

    itemEl.appendChild(trigger)
    itemEl.appendChild(content)
    container.appendChild(itemEl)
  })

  return container
}
```

- [ ] **Step 11: Create alert component**

```typescript
// packages/ui/src/components/alert/alert.ts
import { mergeClasses } from '@fv-ui/shared'

export interface AlertProps {
  title?: string
  description: string
  variant?: 'info' | 'success' | 'warning' | 'danger'
  closable?: boolean
  onClose?: () => void
}

export function Alert(props: AlertProps): HTMLDivElement {
  const { title, description, variant = 'info', closable = false, onClose } = props

  const alert = document.createElement('div')
  alert.className = mergeClasses('fv-alert', `fv-alert--${variant}`)

  const icon = document.createElement('i')
  icon.className = `bi bi-${variant === 'info' ? 'info-circle' : variant === 'success' ? 'check-circle' : variant === 'warning' ? 'exclamation-triangle' : 'x-circle'}`

  const content = document.createElement('div')

  if (title) {
    const titleEl = document.createElement('div')
    titleEl.className = 'fv-alert__title'
    titleEl.textContent = title
    content.appendChild(titleEl)
  }

  const descEl = document.createElement('div')
  descEl.className = 'fv-alert__desc'
  descEl.textContent = description
  content.appendChild(descEl)

  alert.appendChild(icon)
  alert.appendChild(content)

  if (closable) {
    const closeBtn = document.createElement('button')
    closeBtn.className = 'fv-alert__close'
    closeBtn.innerHTML = '&times;'
    closeBtn.addEventListener('click', () => {
      alert.remove()
      if (onClose) onClose()
    })
    alert.appendChild(closeBtn)
  }

  return alert
}
```

- [ ] **Step 12: Create avatar component**

```typescript
// packages/ui/src/components/avatar/avatar.ts
import { mergeClasses } from '@fv-ui/shared'

export interface AvatarProps {
  initials?: string
  src?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Avatar(props: AvatarProps): HTMLDivElement {
  const { initials = '', src, size = 'md' } = props

  const avatar = document.createElement('div')
  avatar.className = mergeClasses(
    'fv-avatar',
    size !== 'md' && `fv-avatar--${size}`
  )

  if (src) {
    const img = document.createElement('img')
    img.src = src
    img.alt = initials
    avatar.appendChild(img)
  } else {
    avatar.textContent = initials
  }

  return avatar
}
```

- [ ] **Step 13: Create checkbox component**

```typescript
// packages/ui/src/components/checkbox/checkbox.ts
import { mergeClasses } from '@fv-ui/shared'

export interface CheckboxProps {
  label: string
  checked?: boolean
  onChange?: (checked: boolean) => void
}

export function Checkbox(props: CheckboxProps): HTMLLabelElement {
  const { label, checked = false, onChange } = props

  const wrapper = document.createElement('label')
  wrapper.className = 'fv-checkbox'

  const input = document.createElement('input')
  input.type = 'checkbox'
  input.checked = checked

  const box = document.createElement('span')
  box.className = 'fv-checkbox__box'

  const labelEl = document.createElement('span')
  labelEl.className = 'fv-checkbox__label'
  labelEl.textContent = label

  input.addEventListener('change', (e) => {
    if (onChange) onChange((e.target as HTMLInputElement).checked)
  })

  wrapper.appendChild(input)
  wrapper.appendChild(box)
  wrapper.appendChild(labelEl)

  return wrapper
}
```

- [ ] **Step 14: Create sidebar component**

```typescript
// packages/ui/src/components/sidebar/sidebar.ts
import { mergeClasses } from '@fv-ui/shared'

export interface SidebarItem {
  id: string
  label: string
  icon?: string
  count?: number
}

export interface SidebarProps {
  items: SidebarItem[]
  activeId?: string
  onSelect?: (id: string) => void
}

export function Sidebar(props: SidebarProps): HTMLElement {
  const { items, activeId, onSelect } = props

  const nav = document.createElement('nav')
  nav.className = 'fv-sidebar'

  items.forEach(item => {
    const itemEl = document.createElement('div')
    itemEl.className = mergeClasses('fv-tree-item', item.id === activeId && 'active')

    if (item.icon) {
      const icon = document.createElement('i')
      icon.className = item.icon
      itemEl.appendChild(icon)
    }

    const label = document.createElement('span')
    label.textContent = item.label
    itemEl.appendChild(label)

    if (item.count !== undefined) {
      const count = document.createElement('span')
      count.className = 'count'
      count.textContent = String(item.count)
      itemEl.appendChild(count)
    }

    itemEl.addEventListener('click', () => {
      if (onSelect) onSelect(item.id)
    })

    nav.appendChild(itemEl)
  })

  return nav
}
```

- [ ] **Step 15: Update barrel export**

```typescript
// packages/ui/src/index.ts
export { Button } from './components/button'
export type { ButtonProps } from './components/button'

export { Card } from './components/card'
export type { CardProps } from './components/card'

export { Modal } from './components/modal'
export type { ModalProps, ModalInstance } from './components/modal'

export { Badge } from './components/badge'
export type { BadgeProps } from './components/badge'

export { Toast } from './components/toast'
export type { ToastOptions } from './components/toast'

export { Input } from './components/input'
export type { InputProps } from './components/input'

export { Select } from './components/select'
export type { SelectProps, SelectOption } from './components/select'

export { Tabs } from './components/tabs'
export type { TabsProps, TabItem } from './components/tabs'

export { Dropdown } from './components/dropdown'
export type { DropdownProps, DropdownItem } from './components/dropdown'

export { Skeleton } from './components/skeleton'
export type { SkeletonProps } from './components/skeleton'

export { Tooltip } from './components/tooltip'
export type { TooltipProps } from './components/tooltip'

export { Breadcrumb } from './components/breadcrumb'
export type { BreadcrumbProps, BreadcrumbItem } from './components/breadcrumb'

export { Accordion } from './components/accordion'
export type { AccordionProps, AccordionItem } from './components/accordion'

export { Alert } from './components/alert'
export type { AlertProps } from './components/alert'

export { Avatar } from './components/avatar'
export type { AvatarProps } from './components/avatar'

export { Checkbox } from './components/checkbox'
export type { CheckboxProps } from './components/checkbox'

export { Sidebar } from './components/sidebar'
export type { SidebarProps, SidebarItem } from './components/sidebar'
```

- [ ] **Step 16: Build all components**

Run: `cd packages/ui && pnpm build`
Expected: All components compiled to dist/

- [ ] **Step 17: Commit**

```bash
git add packages/ui/src/components
git commit -m "feat(ui): add all free core components (badge, toast, input, select, tabs, dropdown, skeleton, tooltip, breadcrumb, accordion, alert, avatar, checkbox, sidebar)"
```

---

## Phase 3: FV-UI Pro Package

### Task 8: Create Pro Package with License Validation

**Files:**
- Create: `packages/ui-pro/package.json`
- Create: `packages/ui-pro/tsconfig.json`
- Create: `packages/ui-pro/vite.config.ts`
- Create: `packages/ui-pro/src/index.ts`
- Create: `packages/ui-pro/src/license.ts`
- Create: `packages/ui-pro/src/license.test.ts`

**Interfaces:**
- Consumes: `@fv-ui/core` (peer dependency), `@fv-ui/shared`
- Produces: `@fv-ui/pro` package with license validation

- [ ] **Step 1: Write failing test for license validation**

```typescript
// packages/ui-pro/src/__tests__/license.test.ts
import { describe, it, expect } from 'vitest'
import { validateLicense, isProEnabled } from '../license'

describe('License validation', () => {
  it('validates correct format', () => {
    expect(validateLicense('FVUI-A1B2-C3D4-E5F6')).toBe(true)
  })

  it('rejects invalid format', () => {
    expect(validateLicense('invalid')).toBe(false)
    expect(validateLicense('FVUI-1234-5678')).toBe(false)
    expect(validateLicense('FVUI-ABCD-EFGH')).toBe(false)
  })

  it('isProEnabled checks config', () => {
    // Mock config
    expect(isProEnabled({ pro: true, license: 'FVUI-A1B2-C3D4-E5F6' })).toBe(true)
    expect(isProEnabled({ pro: false })).toBe(false)
    expect(isProEnabled({ pro: true, license: 'invalid' })).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/ui-pro && pnpm vitest run`
Expected: FAIL with "Cannot find module '../license'"

- [ ] **Step 3: Create package.json**

```json
{
  "name": "@fv-ui/pro",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/index.cjs",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "style": "dist/styles/fv-ui-pro.css",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./styles": "./dist/styles/fv-ui-pro.css"
  },
  "scripts": {
    "build": "vite build",
    "dev": "vite build --watch",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "peerDependencies": {
    "@fv-ui/core": "workspace:*",
    "@fv-ui/shared": "workspace:*"
  },
  "devDependencies": {
    "@fv-ui/core": "workspace:*",
    "@fv-ui/shared": "workspace:*",
    "vite": "^5.4.0",
    "vite-plugin-dts": "^4.0.0",
    "vitest": "^2.0.0",
    "typescript": "^5.4.0"
  }
}
```

- [ ] **Step 4: Create license.ts**

```typescript
// packages/ui-pro/src/license.ts

export interface FvUiConfig {
  pro?: boolean
  license?: string
}

const LICENSE_REGEX = /^FVUI-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/

export function validateLicense(key: string): boolean {
  if (!key) return false
  return LICENSE_REGEX.test(key)
}

export function isProEnabled(config: FvUiConfig): boolean {
  if (!config.pro || !config.license) return false
  return validateLicense(config.license)
}

let _config: FvUiConfig = {}

export function setConfig(config: FvUiConfig): void {
  _config = config
}

export function getConfig(): FvUiConfig {
  return _config
}

export function checkPro(): boolean {
  return isProEnabled(_config)
}
```

- [ ] **Step 5: Create index.ts**

```typescript
// packages/ui-pro/src/index.ts
export { validateLicense, isProEnabled, setConfig, getConfig, checkPro } from './license'
export type { FvUiConfig } from './license'
```

- [ ] **Step 6: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "declaration": true,
    "declarationDir": "dist",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "paths": {
      "@fv-ui/core": ["../ui/src"],
      "@fv-ui/shared": ["../shared/src"]
    }
  },
  "include": ["src"],
  "references": [
    { "path": "../ui" },
    { "path": "../shared" }
  ]
}
```

- [ ] **Step 7: Create vite.config.ts**

```typescript
// packages/ui-pro/vite.config.ts
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [dts({ include: ['src'] })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: 'index'
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['@fv-ui/core', '@fv-ui/shared'],
      output: {
        globals: {
          '@fv-ui/core': 'FVCore',
          '@fv-ui/shared': 'FVShared'
        }
      }
    }
  }
})
```

- [ ] **Step 8: Run tests**

Run: `cd packages/ui-pro && pnpm vitest run`
Expected: PASS

- [ ] **Step 9: Build package**

Run: `cd packages/ui-pro && pnpm build`
Expected: package builds successfully

- [ ] **Step 10: Commit**

```bash
git add packages/ui-pro
git commit -m "feat(ui-pro): create pro package with license validation"
```

---

### Task 9: Create DataTable Component (Pro)

**Files:**
- Create: `packages/ui-pro/src/components/datatable/datatable.ts`
- Create: `packages/ui-pro/src/components/datatable/datatable.css`
- Create: `packages/ui-pro/src/components/datatable/index.ts`
- Create: `packages/ui-pro/src/components/datatable/types.ts`
- Create: `packages/ui-pro/src/components/datatable/__tests__/datatable.test.ts`
- Modify: `packages/ui-pro/src/index.ts` (add DataTable export)

**Interfaces:**
- Consumes: `@fv-ui/core` (Table), `@fv-ui/pro` (checkPro)
- Produces: `<DataTable>` with sort, filter, paginate

- [ ] **Step 1: Write failing test**

```typescript
// packages/ui-pro/src/components/datatable/__tests__/datatable.test.ts
import { describe, it, expect } from 'vitest'
import { DataTable } from '../datatable'

describe('DataTable', () => {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' }
  ]

  const data = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 }
  ]

  it('creates table element', () => {
    const table = DataTable({ columns, data })
    expect(table.tagName).toBe('TABLE')
    expect(table.className).toContain('fv-datatable')
  })

  it('renders column headers', () => {
    const table = DataTable({ columns, data })
    const headers = table.querySelectorAll('th')
    expect(headers.length).toBe(2)
    expect(headers[0].textContent).toBe('Name')
  })

  it('renders data rows', () => {
    const table = DataTable({ columns, data })
    const rows = table.querySelectorAll('tbody tr')
    expect(rows.length).toBe(2)
  })

  it('sorts by column', () => {
    const table = DataTable({ columns, data, sortable: true })
    const headers = table.querySelectorAll('th')
    headers[0].click()
    // Should sort by name
  })

  it('paginates data', () => {
    const largeData = Array.from({ length: 50 }, (_, i) => ({
      name: `User ${i}`,
      age: 20 + i
    }))
    const table = DataTable({ columns, data: largeData, pageSize: 10 })
    const rows = table.querySelectorAll('tbody tr')
    expect(rows.length).toBe(10)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/ui-pro && pnpm vitest run`
Expected: FAIL with "Cannot find module '../datatable'"

- [ ] **Step 3: Create types.ts**

```typescript
// packages/ui-pro/src/components/datatable/types.ts

export interface Column<T = any> {
  key: string
  label: string
  sortable?: boolean
  render?: (value: any, row: T) => string | HTMLElement
}

export interface DataTableProps<T = any> {
  columns: Column<T>[]
  data: T[]
  sortable?: boolean
  filterable?: boolean
  paginated?: boolean
  pageSize?: number
  onSort?: (key: string, direction: 'asc' | 'desc') => void
  onFilter?: (query: string) => void
  onPageChange?: (page: number) => void
}
```

- [ ] **Step 4: Create datatable.ts**

```typescript
// packages/ui-pro/src/components/datatable/datatable.ts
import { checkPro } from '../../license'
import type { DataTableProps, Column } from './types'

export function DataTable<T extends Record<string, any>>(props: DataTableProps<T>): HTMLTableElement {
  if (!checkPro()) {
    const div = document.createElement('div')
    div.className = 'fv-pro-required'
    div.textContent = '[FV-UI Pro] License required. Get yours at fv-ui.dev/pro'
    // Convert to table-like element
    const table = document.createElement('table')
    table.appendChild(div)
    return table
  }

  const {
    columns,
    data,
    sortable = false,
    paginated = false,
    pageSize = 10,
    onSort,
    onFilter,
    onPageChange
  } = props

  let currentPage = 1
  let sortKey = ''
  let sortDirection: 'asc' | 'desc' = 'asc'
  let filterQuery = ''

  const table = document.createElement('table')
  table.className = 'fv-datatable'

  // Create thead
  const thead = document.createElement('thead')
  const headerRow = document.createElement('tr')

  columns.forEach(col => {
    const th = document.createElement('th')
    th.textContent = col.label
    if (sortable && col.sortable !== false) {
      th.style.cursor = 'pointer'
      th.addEventListener('click', () => {
        if (sortKey === col.key) {
          sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'
        } else {
          sortKey = col.key
          sortDirection = 'asc'
        }
        if (onSort) onSort(sortKey, sortDirection)
        renderBody()
      })
    }
    headerRow.appendChild(th)
  })

  thead.appendChild(headerRow)
  table.appendChild(thead)

  // Create tbody
  const tbody = document.createElement('tbody')
  table.appendChild(tbody)

  // Filter function
  function filterData(data: T[]): T[] {
    if (!filterQuery) return data
    return data.filter(row =>
      Object.values(row).some(val =>
        String(val).toLowerCase().includes(filterQuery.toLowerCase())
      )
    )
  }

  // Sort function
  function sortData(data: T[]): T[] {
    if (!sortKey) return data
    return [...data].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      const compare = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      return sortDirection === 'asc' ? compare : -compare
    })
  }

  // Paginate function
  function paginateData(data: T[]): T[] {
    if (!paginated) return data
    const start = (currentPage - 1) * pageSize
    return data.slice(start, start + pageSize)
  }

  // Render body
  function renderBody() {
    tbody.innerHTML = ''
    let processedData = filterData(data)
    processedData = sortData(processedData)
    processedData = paginateData(processedData)

    processedData.forEach(row => {
      const tr = document.createElement('tr')
      columns.forEach(col => {
        const td = document.createElement('td')
        if (col.render) {
          const rendered = col.render(row[col.key], row)
          if (typeof rendered === 'string') {
            td.textContent = rendered
          } else {
            td.appendChild(rendered)
          }
        } else {
          td.textContent = String(row[col.key] ?? '')
        }
        tr.appendChild(td)
      })
      tbody.appendChild(tr)
    })
  }

  // Initial render
  renderBody()

  // Add pagination controls if needed
  if (paginated) {
    const paginationDiv = document.createElement('div')
    paginationDiv.className = 'fv-datatable__pagination'

    const totalPages = Math.ceil(data.length / pageSize)

    const prevBtn = document.createElement('button')
    prevBtn.textContent = 'Previous'
    prevBtn.disabled = currentPage === 1
    prevBtn.addEventListener('click', () => {
      currentPage--
      renderBody()
      updatePagination()
      if (onPageChange) onPageChange(currentPage)
    })

    const pageIndicator = document.createElement('span')
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`

    const nextBtn = document.createElement('button')
    nextBtn.textContent = 'Next'
    nextBtn.disabled = currentPage === totalPages
    nextBtn.addEventListener('click', () => {
      currentPage++
      renderBody()
      updatePagination()
      if (onPageChange) onPageChange(currentPage)
    })

    function updatePagination() {
      pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`
      prevBtn.disabled = currentPage === 1
      nextBtn.disabled = currentPage === totalPages
    }

    paginationDiv.appendChild(prevBtn)
    paginationDiv.appendChild(pageIndicator)
    paginationDiv.appendChild(nextBtn)

    table.parentElement?.appendChild(paginationDiv)
  }

  return table
}
```

- [ ] **Step 5: Create datatable.css**

```css
/* packages/ui-pro/src/components/datatable/datatable.css */
.fv-datatable {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.fv-datatable th {
  background: var(--bg-item);
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-secondary);
  text-align: left;
  padding: 10px 16px;
  border-bottom: 1px solid var(--border-outer);
  position: sticky;
  top: 0;
}

.fv-datatable td {
  padding: 10px 16px;
  border-bottom: 1px solid var(--border-outer);
  color: var(--text-primary);
  transition: background 0.2s;
}

.fv-datatable tr:last-child td {
  border-bottom: none;
}

.fv-datatable tr:hover td {
  background: var(--accent-soft);
}

.fv-datatable__pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px;
  border-top: 1px solid var(--border-outer);
}

.fv-datatable__pagination button {
  padding: 8px 16px;
  border: 1px solid var(--border-outer);
  border-radius: var(--radius-sm);
  background: var(--bg-item);
  cursor: pointer;
  font-size: 13px;
}

.fv-datatable__pagination button:hover:not(:disabled) {
  background: var(--accent-soft);
}

.fv-datatable__pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.fv-pro-required {
  padding: 20px;
  text-align: center;
  color: var(--text-secondary);
  font-style: italic;
}
```

- [ ] **Step 6: Create index.ts**

```typescript
// packages/ui-pro/src/components/datatable/index.ts
export { DataTable } from './datatable'
export type { DataTableProps, Column } from './types'
```

- [ ] **Step 7: Update barrel export**

```typescript
// packages/ui-pro/src/index.ts
export { validateLicense, isProEnabled, setConfig, getConfig, checkPro } from './license'
export type { FvUiConfig } from './license'

export { DataTable } from './components/datatable'
export type { DataTableProps, Column } from './components/datatable'
```

- [ ] **Step 8: Run tests**

Run: `cd packages/ui-pro && pnpm vitest run`
Expected: PASS

- [ ] **Step 9: Build package**

Run: `cd packages/ui-pro && pnpm build`
Expected: DataTable compiled to dist/

- [ ] **Step 10: Commit**

```bash
git add packages/ui-pro/src/components/datatable
git commit -m "feat(ui-pro): add DataTable component with sort, filter, paginate"
```

---

### Task 10: Create CommandPalette Component (Pro)

**Files:**
- Create: `packages/ui-pro/src/components/command-palette/command-palette.ts`
- Create: `packages/ui-pro/src/components/command-palette/command-palette.css`
- Create: `packages/ui-pro/src/components/command-palette/index.ts`
- Create: `packages/ui-pro/src/components/command-palette/types.ts`
- Modify: `packages/ui-pro/src/index.ts` (add CommandPalette export)

**Interfaces:**
- Consumes: `@fv-ui/pro` (checkPro)
- Produces: `<CommandPalette>` spotlight-style command menu

- [ ] **Step 1: Create types.ts**

```typescript
// packages/ui-pro/src/components/command-palette/types.ts

export interface CommandItem {
  id: string
  label: string
  description?: string
  icon?: string
  shortcut?: string
  onSelect?: () => void
}

export interface CommandGroup {
  title: string
  items: CommandItem[]
}

export interface CommandPaletteProps {
  groups: CommandGroup[]
  placeholder?: string
  onSelect?: (item: CommandItem) => void
}
```

- [ ] **Step 2: Create command-palette.ts**

```typescript
// packages/ui-pro/src/components/command-palette/command-palette.ts
import { checkPro } from '../../license'
import type { CommandPaletteProps, CommandItem } from './types'

export function CommandPalette(props: CommandPaletteProps): HTMLElement {
  if (!checkPro()) {
    const div = document.createElement('div')
    div.className = 'fv-pro-required'
    div.textContent = '[FV-UI Pro] License required. Get yours at fv-ui.dev/pro'
    return div
  }

  const { groups, placeholder = 'Type a command...', onSelect } = props

  const container = document.createElement('div')
  container.className = 'fv-command-palette'

  // Search input
  const searchWrap = document.createElement('div')
  searchWrap.className = 'fv-command-palette__search'

  const input = document.createElement('input')
  input.type = 'text'
  input.placeholder = placeholder
  input.className = 'fv-command-palette__input'

  searchWrap.appendChild(input)
  container.appendChild(searchWrap)

  // Results list
  const results = document.createElement('div')
  results.className = 'fv-command-palette__results'
  container.appendChild(results)

  // Filter and render
  function render(query: string = '') {
    results.innerHTML = ''

    groups.forEach(group => {
      const filteredItems = group.items.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase())
      )

      if (filteredItems.length === 0) return

      const groupEl = document.createElement('div')
      groupEl.className = 'fv-command-palette__group'

      const title = document.createElement('div')
      title.className = 'fv-command-palette__group-title'
      title.textContent = group.title
      groupEl.appendChild(title)

      filteredItems.forEach(item => {
        const itemEl = document.createElement('div')
        itemEl.className = 'fv-command-palette__item'

        const label = document.createElement('span')
        label.className = 'fv-command-palette__item-label'
        label.textContent = item.label

        const meta = document.createElement('span')
        meta.className = 'fv-command-palette__item-meta'

        if (item.description) {
          const desc = document.createElement('span')
          desc.className = 'fv-command-palette__item-desc'
          desc.textContent = item.description
          meta.appendChild(desc)
        }

        if (item.shortcut) {
          const shortcut = document.createElement('kbd')
          shortcut.className = 'fv-command-palette__item-shortcut'
          shortcut.textContent = item.shortcut
          meta.appendChild(shortcut)
        }

        itemEl.appendChild(label)
        itemEl.appendChild(meta)

        itemEl.addEventListener('click', () => {
          if (onSelect) onSelect(item)
          if (item.onSelect) item.onSelect()
        })

        groupEl.appendChild(itemEl)
      })

      results.appendChild(groupEl)
    })
  }

  // Search handler
  input.addEventListener('input', (e) => {
    render((e.target as HTMLInputElement).value)
  })

  // Keyboard navigation
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      container.classList.remove('active')
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const firstItem = results.querySelector('.fv-command-palette__item') as HTMLElement
      if (firstItem) firstItem.focus()
    }
  })

  // Initial render
  render()

  return container
}

export function openCommandPalette(palette: HTMLElement): void {
  palette.classList.add('active')
  const input = palette.querySelector('input') as HTMLInputElement
  if (input) input.focus()
}

export function closeCommandPalette(palette: HTMLElement): void {
  palette.classList.remove('active')
}
```

- [ ] **Step 3: Create command-palette.css**

```css
/* packages/ui-pro/src/components/command-palette/command-palette.css */
.fv-command-palette {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 20vh;
  z-index: 1100;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s, visibility 0.15s;
}

.fv-command-palette.active {
  opacity: 1;
  visibility: visible;
}

.fv-command-palette__search {
  width: 100%;
  max-width: 560px;
  background: var(--bg-card);
  border: 1px solid var(--border-inner);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-spatial-card);
  overflow: hidden;
}

.fv-command-palette__input {
  width: 100%;
  padding: 16px 20px;
  border: none;
  background: transparent;
  font-size: 16px;
  color: var(--text-primary);
  outline: none;
  font-family: inherit;
}

.fv-command-palette__results {
  max-height: 400px;
  overflow-y: auto;
  border-top: 1px solid var(--border-outer);
}

.fv-command-palette__group {
  padding: 8px;
}

.fv-command-palette__group-title {
  padding: 8px 12px 4px;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.fv-command-palette__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background 0.1s;
}

.fv-command-palette__item:hover,
.fv-command-palette__item:focus {
  background: var(--accent-soft);
}

.fv-command-palette__item-label {
  font-size: 14px;
  color: var(--text-primary);
}

.fv-command-palette__item-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.fv-command-palette__item-desc {
  font-size: 12px;
  color: var(--text-tertiary);
}

.fv-command-palette__item-shortcut {
  font-size: 11px;
  padding: 2px 6px;
  background: var(--bg-item);
  border: 1px solid var(--border-outer);
  border-radius: 4px;
  font-family: monospace;
}
```

- [ ] **Step 4: Create index.ts**

```typescript
// packages/ui-pro/src/components/command-palette/index.ts
export { CommandPalette, openCommandPalette, closeCommandPalette } from './command-palette'
export type { CommandPaletteProps, CommandItem, CommandGroup } from './types'
```

- [ ] **Step 5: Update barrel export**

```typescript
// packages/ui-pro/src/index.ts
export { validateLicense, isProEnabled, setConfig, getConfig, checkPro } from './license'
export type { FvUiConfig } from './license'

export { DataTable } from './components/datatable'
export type { DataTableProps, Column } from './components/datatable'

export { CommandPalette, openCommandPalette, closeCommandPalette } from './components/command-palette'
export type { CommandPaletteProps, CommandItem, CommandGroup } from './components/command-palette'
```

- [ ] **Step 6: Build package**

Run: `cd packages/ui-pro && pnpm build`
Expected: CommandPalette compiled to dist/

- [ ] **Step 7: Commit**

```bash
git add packages/ui-pro/src/components/command-palette
git commit -m "feat(ui-pro): add CommandPalette component"
```

---

## Phase 4: Documentation Site

### Task 11: Setup VitePress Documentation

**Files:**
- Create: `docs/package.json`
- Create: `docs/.vitepress/config.ts`
- Create: `docs/index.md`
- Create: `docs/getting-started/installation.md`
- Create: `docs/getting-started/quick-start.md`
- Create: `docs/components/button.md`
- Create: `docs/pro/datatable.md`

**Interfaces:**
- Consumes: `@fv-ui/core`, `@fv-ui/pro`
- Produces: VitePress documentation site

- [ ] **Step 1: Create docs/package.json**

```json
{
  "name": "fv-ui-docs",
  "private": true,
  "scripts": {
    "dev": "vitepress dev",
    "build": "vitepress build",
    "preview": "vitepress preview"
  },
  "devDependencies": {
    "vitepress": "^1.3.0"
  }
}
```

- [ ] **Step 2: Create .vitepress/config.ts**

```typescript
// docs/.vitepress/config.ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'FV-UI',
  description: 'Apple-style component library. CSS-first, zero dependency.',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/button' },
      { text: 'Pro', link: '/pro/datatable' },
      { text: 'GitHub', link: 'https://github.com/your-repo/fv-ui' }
    ],
    sidebar: {
      '/components': [
        {
          text: 'Components',
          items: [
            { text: 'Button', link: '/components/button' },
            { text: 'Card', link: '/components/card' },
            { text: 'Modal', link: '/components/modal' },
            { text: 'Badge', link: '/components/badge' },
            { text: 'Input', link: '/components/input' },
            { text: 'Toast', link: '/components/toast' }
          ]
        }
      ],
      '/pro': [
        {
          text: 'Pro Components',
          items: [
            { text: 'DataTable', link: '/pro/datatable' },
            { text: 'CommandPalette', link: '/pro/command-palette' }
          ]
        }
      ]
    }
  }
})
```

- [ ] **Step 3: Create index.md**

```markdown
---
layout: home

hero:
  name: FV-UI
  text: Apple-style component library
  tagline: CSS-first, zero dependency, CDN-ready
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/installation
    - theme: alt
      text: Components
      link: /components/button

features:
  - title: CSS-First
    details: Pure CSS with no runtime dependencies. Works everywhere.
  - title: Dark Mode
    details: Built-in dark mode with data-fv-theme="dark" attribute.
  - title: Pro Components
    details: Advanced components like DataTable, CommandPalette with license key activation.
---
```

- [ ] **Step 4: Create installation.md**

```markdown
# Installation

## npm

```bash
npm install @fv-ui/core
```

## CDN

```html
<link rel="stylesheet" href="https://unpkg.com/@fv-ui/core/dist/styles/fv-ui.css">
<script src="https://unpkg.com/@fv-ui/core/dist/index.js"></script>
```

## Copy-Paste

Download the CSS and JS files directly from GitHub.

---

**Next:** [Quick Start](/getting-started/quick-start)
```

- [ ] **Step 5: Create quick-start.md**

```markdown
# Quick Start

## 1. Add to HTML

```html
<link rel="stylesheet" href="dist/styles/fv-ui.css">
```

## 2. Use components

```html
<button class="fv-btn fv-btn--primary">Click me</button>

<div class="fv-card">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

## 3. Toggle Dark Mode

```html
<html data-fv-theme="dark">
```

## 4. JavaScript API

```javascript
FV.toast('Hello!', 'success')
FV.modal('my-modal').open()
```

---

**Next:** [Components](/components/button)
```

- [ ] **Step 6: Create button.md**

```markdown
# Button

Apple-style button with multiple variants, sizes, and states.

## Import

```javascript
import { Button } from '@fv-ui/core'
```

## Variants

```html
<button class="fv-btn fv-btn--primary">Primary</button>
<button class="fv-btn fv-btn--secondary">Secondary</button>
<button class="fv-btn fv-btn--ghost">Ghost</button>
<button class="fv-btn fv-btn--danger">Danger</button>
```

## Sizes

```html
<button class="fv-btn fv-btn--primary fv-btn--sm">Small</button>
<button class="fv-btn fv-btn--primary">Medium</button>
<button class="fv-btn fv-btn--primary fv-btn--lg">Large</button>
```

## Icon Button

```html
<button class="fv-btn fv-btn--primary fv-btn--icon">+</button>
```

## JavaScript

```javascript
const btn = Button({
  children: 'Click me',
  variant: 'primary',
  onClick: () => console.log('clicked')
})
document.body.appendChild(btn)
```
```

- [ ] **Step 7: Create datatable.md (Pro)**

```markdown
# DataTable (Pro)

Advanced data table with sort, filter, and pagination.

::: warning
This is a Pro component. [Get a license](/pro-purchase) to unlock.
:::

## Preview

| Name | Age | Role |
|------|-----|------|
| John | 30 | Developer |
| Jane | 25 | Designer |

## Features

- Column sorting
- Text filtering
- Pagination
- Custom cell rendering

## JavaScript

```javascript
import { DataTable } from '@fv-ui/pro'

const table = DataTable({
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' }
  ],
  data: [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 }
  ],
  sortable: true,
  paginated: true,
  pageSize: 10
})

document.body.appendChild(table)
```
```

- [ ] **Step 8: Commit**

```bash
git add docs
git commit -m "docs: add vitepress documentation site"
```

---

## Phase 5: Integration

### Task 12: Update FinVersion App to Use New Packages

**Files:**
- Modify: `apps/finversion/package.json` (add dependencies)
- Modify: `apps/finversion/index.html` (update imports)
- Modify: `apps/finversion/src/js/fv-ui.js` (remove, use package)

**Interfaces:**
- Consumes: `@fv-ui/core`, `@fv-ui/pro`, `@fv-ui/shared`
- Produces: finversion app using new package structure

- [ ] **Step 1: Create apps/finversion/package.json**

```json
{
  "name": "finversion",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@fv-ui/core": "workspace:*",
    "@fv-ui/pro": "workspace:*",
    "@fv-ui/shared": "workspace:*"
  },
  "devDependencies": {
    "vite": "^5.4.0",
    "typescript": "^5.4.0"
  }
}
```

- [ ] **Step 2: Create apps/finversion/vite.config.ts**

```typescript
// apps/finversion/vite.config.ts
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@fv-ui/core': resolve(__dirname, '../../packages/ui/src'),
      '@fv-ui/pro': resolve(__dirname, '../../packages/ui-pro/src'),
      '@fv-ui/shared': resolve(__dirname, '../../packages/shared/src')
    }
  }
})
```

- [ ] **Step 3: Update index.html imports**

```html
<!-- Remove old imports -->
<!-- <link rel="stylesheet" href="src/css/fv-ui.css"> -->
<!-- <script src="src/js/fv-ui.js"></script> -->

<!-- Add new imports -->
<link rel="stylesheet" href="../../packages/ui/dist/styles/fv-ui.css">
```

- [ ] **Step 4: Build all packages**

Run: `pnpm build`
Expected: All packages build successfully

- [ ] **Step 5: Test app**

Run: `cd apps/finversion && pnpm dev`
Expected: App runs with new package imports

- [ ] **Step 6: Commit**

```bash
git add apps/finversion
git commit -m "feat: update finversion app to use new package structure"
```

---

## Summary

### Tasks Completed

| Task | Package | Components |
|------|---------|------------|
| 1 | Root | Turborepo + pnpm workspace |
| 2 | shared | Tokens + utils |
| 3 | ui | Core package structure |
| 4 | ui | Button |
| 5 | ui | Card |
| 6 | ui | Modal |
| 7 | ui | Badge, Toast, Input, Select, Tabs, Dropdown, Skeleton, Tooltip, Breadcrumb, Accordion, Alert, Avatar, Checkbox, Sidebar |
| 8 | ui-pro | License validation |
| 9 | ui-pro | DataTable |
| 10 | ui-pro | CommandPalette |
| 11 | docs | VitePress documentation |
| 12 | finversion | App integration |

### Package Outputs

```
packages/ui/dist/
├── index.js          # ESM
├── index.cjs         # CommonJS
├── index.d.ts        # TypeScript
└── styles/
    └── fv-ui.css     # All free component styles

packages/ui-pro/dist/
├── index.js
├── index.cjs
├── index.d.ts
└── styles/
    └── fv-ui-pro.css # All pro component styles
```

### Next Steps

1. Execute tasks using subagent-driven-development
2. Test each component in isolation
3. Create Lemon Squeezy account for payment
4. Deploy docs to Vercel
5. Publish to npm
