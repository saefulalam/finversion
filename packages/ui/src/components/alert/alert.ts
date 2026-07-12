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