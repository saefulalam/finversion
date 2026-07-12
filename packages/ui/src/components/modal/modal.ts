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
