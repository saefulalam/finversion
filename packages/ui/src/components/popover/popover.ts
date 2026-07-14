import { mergeClasses } from '@fv-ui/shared'

export interface PopoverProps {
  trigger: HTMLElement
  title?: string
  children?: string | HTMLElement
  align?: 'start' | 'center' | 'end'
  disabled?: boolean
}

export function Popover(props: PopoverProps): HTMLDivElement {
  const { trigger, title, children, align = 'center', disabled = false } = props

  const wrapper = document.createElement('div')
  wrapper.className = 'fv-popover'

  const content = document.createElement('div')
  content.className = 'fv-popover__content'
  content.setAttribute('role', 'dialog')
  content.style.display = 'none'

  if (title) {
    const titleEl = document.createElement('div')
    titleEl.className = 'fv-popover__title'
    titleEl.textContent = title
    content.appendChild(titleEl)
  }

  if (children) {
    if (typeof children === 'string') {
      const desc = document.createElement('div')
      desc.className = 'fv-popover__desc'
      desc.textContent = children
      content.appendChild(desc)
    } else {
      content.appendChild(children)
    }
  }

  function position() {
    const triggerRect = trigger.getBoundingClientRect()
    const contentRect = content.getBoundingClientRect()
    const gap = 8

    content.style.position = 'absolute'
    content.style.bottom = `${window.innerHeight - triggerRect.top + gap}px`
    content.style.left = '0px'
    content.style.right = '0px'

    if (align === 'start') {
      content.style.left = '0px'
    } else if (align === 'end') {
      content.style.right = '0px'
    } else {
      content.style.left = `${triggerRect.left + triggerRect.width / 2 - contentRect.width / 2}px`
    }
  }

  function open() {
    if (disabled) return
    content.style.display = 'block'
    wrapper.appendChild(content)
    position()
  }

  function close() {
    content.style.display = 'none'
  }

  function toggle() {
    if (content.style.display === 'block') {
      close()
    } else {
      open()
    }
  }

  trigger.addEventListener('click', () => {
    toggle()
  })

  const handleClickOutside = (e: MouseEvent) => {
    if (!wrapper.contains(e.target as Node)) {
      close()
      document.removeEventListener('click', handleClickOutside)
    }
  }

  trigger.addEventListener('click', () => {
    if (content.style.display === 'block') {
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside)
      }, 0)
    }
  })

  wrapper.appendChild(trigger)
  wrapper.appendChild(content)

  return wrapper
}
