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
