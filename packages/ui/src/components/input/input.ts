import { mergeClasses } from '@fv-ui/shared'

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
  value?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onChange?: (e: Event) => void
}

export function Input(props: InputProps): HTMLInputElement {
  const {
    type = 'text',
    placeholder = '',
    value = '',
    size = 'md',
    disabled = false,
    onChange
  } = props

  const input = document.createElement('input')
  input.type = type
  input.placeholder = placeholder
  input.value = value
  input.className = mergeClasses(
    'fv-input',
    size !== 'md' && `fv-input--${size}`
  )
  input.disabled = disabled

  if (onChange) {
    input.addEventListener('input', onChange)
  }

  return input
}