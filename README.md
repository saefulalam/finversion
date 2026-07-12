# FV-UI

Apple-style component library. CSS-first, CDN-ready, zero dependency.

## Usage

### CDN

```html
<link rel="stylesheet" href="https://unpkg.com/fv-ui/src/css/fv-ui.css">
<script src="https://unpkg.com/fv-ui/src/js/fv-ui.js"></script>
```

### Local

```html
<link rel="stylesheet" href="src/css/fv-ui.css">
<script src="src/js/fv-ui.js"></script>
```

## Components

| Class | Description |
|---|---|
| `.fv-btn` | Buttons — primary, secondary, ghost, danger, sizes, icon |
| `.fv-badge` | Status badges — accent, success, warning, danger, outline, dot |
| `.fv-card` | Content cards — header, body, footer, hover |
| `.fv-input` | Text inputs — sm, lg |
| `.fv-select` | Select dropdown |
| `.fv-label` | Form labels |
| `.fv-table` | Data tables — striped |
| `.fv-modal-overlay` | Modal dialog — open with `.active` class |
| `.fv-dropdown` | Click dropdown menus |
| `.fv-tabs` | Tabbed navigation |
| `.fv-sidebar` | Side navigation |
| `.fv-avatar` | User avatars — sm, lg, xl |
| `.fv-toast` | Toast notifications |
| `.fv-skeleton` | Loading skeletons |
| `.fv-tooltip` | Hover tooltips (via `data-fv-tooltip`) |

## Dark Mode

```js
FV.toggleTheme();          // toggle
FV.setTheme('dark');       // force dark
FV.setTheme('light');      // force light
```

Or add `data-fv-theme="dark"` to `<html>`.

## JS API

```js
FV.modal('modal-id')       // returns { open, close }
FV.dropdown(element)       // init dropdown
FV.toast('message', type)  // show toast: 'success'|'warning'|'danger'|'accent'
FV.tabs(container)         // init tabs
```

## Design Tokens

All colors, spacing, shadows use CSS custom properties — override via `:root`:

```css
:root {
  --fv-accent: #0071e3;
  --fv-bg: #ffffff;
  --fv-radius-md: 10px;
  /* ... see fv-ui.css */
}
```

## License

MIT
