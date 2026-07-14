import { mergeClasses } from '@fv-ui/shared'

export interface NumberInputProps {
  value?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  onChange?: (value: number) => void
}

export function NumberInput(props: NumberInputProps): HTMLDivElement {
  const {
    value = 0,
    min,
    max,
    step = 1,
    disabled = false,
    onChange
  } = props

  const wrapper = document.createElement('div')
  wrapper.className = 'fv-number-input'

  const minusBtn = document.createElement('button')
  minusBtn.type = 'button'
  minusBtn.className = 'fv-number-input__btn fv-number-input__btn--minus'
  minusBtn.textContent = '−'
  minusBtn.disabled = disabled

  const input = document.createElement('input')
  input.type = 'number'
  input.className = 'fv-number-input__field'
  input.value = String(value)
  input.disabled = disabled

  const plusBtn = document.createElement('button')
  plusBtn.type = 'button'
  plusBtn.className = 'fv-number-input__btn fv-number-input__btn--plus'
  plusBtn.textContent = '+'
  plusBtn.disabled = disabled

  function clamp(v: number): number {
    if (min !== undefined && v < min) return min
    if (max !== undefined && v > max) return max
    return v
  }

  function setValue(v: number) {
    const newVal = clamp(v)
    input.value = String(newVal)
    if (onChange) onChange(newVal)
  }

  minusBtn.addEventListener('click', () => {
    setValue(Number(input.value) - step)
  })

  plusBtn.addEventListener('click', () => {
    setValue(Number(input.value) + step)
  })

  input.addEventListener('input', () => {
    const raw = Number(input.value)
    if (!Number.isNaN(raw)) {
      setValue(raw)
    }
  })

  input.addEventListener('blur', () => {
    if (input.value === '' || Number.isNaN(Number(input.value))) {
      setValue(0)
    }
  })

  wrapper.appendChild(minusBtn)
  wrapper.appendChild(input)
  wrapper.appendChild(plusBtn)

  return wrapper
}
