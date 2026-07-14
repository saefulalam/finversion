import { mergeClasses } from '@fv-ui/shared'

export interface PinInputProps {
  length?: number
  mask?: boolean
  disabled?: boolean
  onChange?: (value: string) => void
}

export function PinInput(props: PinInputProps): HTMLDivElement {
  const { length = 4, mask = false, disabled = false, onChange } = props

  const wrapper = document.createElement('div')
  wrapper.className = 'fv-pin-input'

  const fields: HTMLInputElement[] = []

  for (let i = 0; i < length; i++) {
    const input = document.createElement('input')
    input.type = mask ? 'password' : 'text'
    input.maxLength = 1
    input.className = 'fv-pin-input__field'
    input.disabled = disabled
    input.dataset.index = String(i)

    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 1)
      if (input.value && i < length - 1) {
        fields[i + 1].focus()
      }
      emitChange()
    })

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && i > 0) {
        fields[i - 1].focus()
      }
      if (e.key === 'ArrowLeft' && i > 0) {
        fields[i - 1].focus()
      }
      if (e.key === 'ArrowRight' && i < length - 1) {
        fields[i + 1].focus()
      }
    })

    input.addEventListener('focus', () => {
      input.select()
    })

    input.addEventListener('paste', (e) => {
      e.preventDefault()
      const text = (e.clipboardData?.getData('text') || '').replace(/[^a-zA-Z0-9]/g, '').slice(0, length)
      text.split('').forEach((char, idx) => {
        if (idx + i < length) {
          fields[idx + i].value = char
        }
      })
      const lastIdx = Math.min(i + text.length - 1, length - 1)
      fields[lastIdx].focus()
      emitChange()
    })

    fields.push(input)
    wrapper.appendChild(input)

    if (i < length - 1) {
      const sep = document.createElement('span')
      sep.className = 'fv-pin-input__separator'
      sep.textContent = '—'
      wrapper.appendChild(sep)
    }
  }

  function emitChange() {
    const val = fields.map(f => f.value).join('')
    if (onChange) onChange(val)
  }

  return wrapper
}
