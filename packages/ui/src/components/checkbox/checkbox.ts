import { mergeClasses } from '@fv-ui/shared'

export interface CheckboxProps {
  label: string
  checked?: boolean
  onChange?: (checked: boolean) => void
}

export function Checkbox(props: CheckboxProps): HTMLLabelElement {
  const { label, checked = false, onChange } = props

  const wrapper = document.createElement('label')
  wrapper.className = 'fv-checkbox'

  const input = document.createElement('input')
  input.type = 'checkbox'
  input.checked = checked

  const box = document.createElement('span')
  box.className = 'fv-checkbox__box'

  const labelEl = document.createElement('span')
  labelEl.className = 'fv-checkbox__label'
  labelEl.textContent = label

  input.addEventListener('change', (e) => {
    if (onChange) onChange((e.target as HTMLInputElement).checked)
  })

  wrapper.appendChild(input)
  wrapper.appendChild(box)
  wrapper.appendChild(labelEl)

  return wrapper
}