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
