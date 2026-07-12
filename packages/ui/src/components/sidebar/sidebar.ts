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