import { mergeClasses } from '@fv-ui/shared'

export interface SelectOption {
  value: string
  label: string
}

export interface MultiSelectProps {
  options: SelectOption[]
  value?: string[]
  maxSelected?: number
  searchable?: boolean
  disabled?: boolean
  onChange?: (value: string[]) => void
}

export function MultiSelect(props: MultiSelectProps): HTMLDivElement {
  const {
    options,
    value: initialValue = [],
    maxSelected,
    searchable = true,
    disabled = false,
    onChange
  } = props

  let currentValue = [...initialValue]

  const wrapper = document.createElement('div')
  wrapper.className = mergeClasses(
    'fv-multi-select',
    disabled && 'fv-multi-select--disabled'
  )

  const input = document.createElement('input')
  input.type = 'text'
  input.className = 'fv-multi-select__input'
  input.placeholder = currentValue.length === 0 ? 'Pilih...' : ''
  input.disabled = disabled || (maxSelected !== undefined && currentValue.length >= maxSelected)
  input.setAttribute('autocomplete', 'off')

  const dropdown = document.createElement('div')
  dropdown.className = 'fv-multi-select__dropdown'
  dropdown.style.display = 'none'

  function updateInputState() {
    input.placeholder = currentValue.length === 0 ? 'Pilih...' : ''
    input.disabled = disabled || (maxSelected !== undefined && currentValue.length >= maxSelected)
  }

  function renderTags() {
    wrapper.querySelectorAll('.fv-multi-select__tag').forEach(t => t.remove())
    currentValue.forEach(val => {
      const opt = options.find(o => o.value === val)
      if (!opt) return

      const tag = document.createElement('span')
      tag.className = 'fv-multi-select__tag'

      const label = document.createElement('span')
      label.textContent = opt.label
      tag.appendChild(label)

      const remove = document.createElement('button')
      remove.type = 'button'
      remove.className = 'fv-multi-select__tag-remove'
      remove.innerHTML = '&times;'
      remove.addEventListener('click', (e) => {
        e.stopPropagation()
        currentValue = currentValue.filter(v => v !== val)
        if (onChange) onChange(currentValue)
        renderTags()
        updateInputState()
      })
      tag.appendChild(remove)

      wrapper.insertBefore(tag, input)
    })
  }

  function renderDropdown(query: string = '') {
    dropdown.innerHTML = ''
    const filtered = options.filter(o =>
      o.label.toLowerCase().includes(query.toLowerCase()) &&
      !currentValue.includes(o.value)
    )

    if (filtered.length === 0) {
      const empty = document.createElement('div')
      empty.className = 'fv-multi-select__empty'
      empty.textContent = query ? 'Tidak ditemukan' : 'Semua sudah dipilih'
      dropdown.appendChild(empty)
    } else {
      filtered.forEach(opt => {
        const item = document.createElement('div')
        item.className = 'fv-multi-select__option'
        item.textContent = opt.label
        item.addEventListener('click', () => {
          currentValue = [...currentValue, opt.value]
          if (onChange) onChange(currentValue)
          renderTags()
          input.value = ''
          updateInputState()
          dropdown.style.display = 'none'
        })
        dropdown.appendChild(item)
      })
    }
  }

  if (searchable) {
    input.addEventListener('focus', () => {
      renderDropdown()
      dropdown.style.display = 'block'
    })

    input.addEventListener('input', () => {
      renderDropdown(input.value)
      dropdown.style.display = 'block'
    })
  }

  input.addEventListener('blur', () => {
    setTimeout(() => {
      dropdown.style.display = 'none'
    }, 150)
  })

  wrapper.appendChild(input)
  wrapper.appendChild(dropdown)

  renderTags()

  return wrapper
}
