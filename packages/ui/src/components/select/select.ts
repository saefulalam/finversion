import { mergeClasses } from '@fv-ui/shared'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (e: Event) => void
}

export function Select(props: SelectProps): HTMLSelectElement {
  const { options, value = '', onChange } = props

  const select = document.createElement('select')
  select.className = 'fv-select'

  options.forEach(opt => {
    const option = document.createElement('option')
    option.value = opt.value
    option.textContent = opt.label
    if (opt.value === value) option.selected = true
    select.appendChild(option)
  })

  if (onChange) {
    select.addEventListener('change', onChange)
  }

  return select
}