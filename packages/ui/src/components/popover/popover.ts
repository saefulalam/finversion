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

    if (align === 'start') {
      content.style.left = `${triggerRect.left}px`
    } else if (align === 'end') {
      content.style.left = `${triggerRect.right - contentRect.width}px`
    } else {
      content.style.left = `${triggerRect.left + triggerRect.width / 2 - contentRect.width / 2}px`
    }

    content.style.top = `${triggerRect.bottom + gap}px`
    content.style.right = 'auto'
  }

  function open() {
    if (disabled) return
    wrapper.appendChild(content)
    position()
    requestAnimationFrame(() => {
      content.classList.add('active')
    })
  }

  function close() {
    content.classList.remove('active')
  }

  function toggle() {
    if (content.classList.contains('active')) {
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
    if (content.classList.contains('active')) {
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside)
      }, 0)
    }
  })

  wrapper.appendChild(trigger)
  wrapper.appendChild(content)

  return wrapper
}
