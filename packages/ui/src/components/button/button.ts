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