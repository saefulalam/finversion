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