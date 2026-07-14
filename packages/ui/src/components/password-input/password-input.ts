import { mergeClasses } from '@fv-ui/shared'

export interface PasswordInputProps {
  showToggle?: boolean
  value?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (e: Event) => void
}

export function PasswordInput(props: PasswordInputProps): HTMLDivElement {
  const {
    showToggle = true,
    value = '',
    placeholder = 'Password',
    disabled = false,
    onChange
  } = props

  const wrapper = document.createElement('div')
  wrapper.className = 'fv-password-input'

  const input = document.createElement('input')
  input.type = 'password'
  input.placeholder = placeholder
  input.value = value
  input.className = 'fv-password-input__field'
  input.disabled = disabled

  if (onChange) {
    input.addEventListener('input', onChange)
  }

  wrapper.appendChild(input)

  if (showToggle) {
    const toggle = document.createElement('button')
    toggle.type = 'button'
    toggle.className = 'fv-password-input__toggle'
    toggle.innerHTML = '<i class="bi bi-eye"></i>'
    toggle.setAttribute('aria-label', 'Toggle password visibility')
    toggle.addEventListener('click', () => {
      const isPassword = input.type === 'password'
      input.type = isPassword ? 'text' : 'password'
      toggle.innerHTML = isPassword ? '<i class="bi bi-eye-slash"></i>' : '<i class="bi bi-eye"></i>'
      toggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password')
    })
    wrapper.appendChild(toggle)
  }

  return wrapper
}
