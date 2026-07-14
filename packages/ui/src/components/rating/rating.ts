import { mergeClasses } from '@fv-ui/shared'

export interface RatingProps {
  value?: number
  max?: number
  variant?: 'star' | 'heart' | 'dot' | 'number'
  size?: 'sm' | 'md' | 'lg'
  readonly?: boolean
  allowHalf?: boolean
  showValue?: boolean
  onChange?: (value: number) => void
}

export function Rating(props: RatingProps): HTMLDivElement {
  const {
    value = 0,
    max = 5,
    variant = 'star',
    size = 'md',
    readonly = false,
    allowHalf = false,
    showValue = false,
    onChange
  } = props

  const root = document.createElement('div')
  root.className = mergeClasses(
    'fv-rating',
    `fv-rating--${variant}`,
    `fv-rating--${size}`,
    readonly && 'fv-rating--readonly'
  )

  if (variant === 'number') {
    const numSpan = document.createElement('span')
    numSpan.className = 'fv-rating__value'
    numSpan.textContent = `${value} / ${max}`
    root.appendChild(numSpan)
    return root
  }

  for (let i = 1; i <= max; i++) {
    const item = document.createElement(variant === 'dot' ? 'span' : 'button')
    item.className = mergeClasses('fv-rating__item')
    item.dataset.value = String(i)

    let iconClass = 'bi'
    let isFilled = value >= i
    let isHalf = false

    if (allowHalf && variant === 'star') {
      if (value >= i) {
        iconClass += ' bi-star-fill'
      } else if (value >= i - 0.5) {
        iconClass += ' bi-star-half'
        isHalf = true
      } else {
        iconClass += ' bi-star'
      }
    } else if (variant === 'star') {
      iconClass += isFilled ? ' bi-star-fill' : ' bi-star'
    } else if (variant === 'heart') {
      iconClass += isFilled ? ' bi-heart-fill' : ' bi-heart'
    }

    if (!isFilled && !isHalf) {
      item.classList.add('fv-rating__empty')
    }

    if (variant === 'dot') {
      if (isFilled) {
        item.classList.add('fv-rating__item--filled')
      }
    } else {
      const icon = document.createElement('i')
      icon.className = iconClass
      item.appendChild(icon)
    }

    if (!readonly && variant !== 'dot') {
      item.addEventListener('click', (e) => {
        let newValue = i
        if (allowHalf && variant === 'star') {
          const rect = item.getBoundingClientRect()
          const isLeftHalf = ((e as MouseEvent).clientX - rect.left) < rect.width / 2
          newValue = isLeftHalf ? i - 0.5 : i
        }
        if (onChange) onChange(newValue)
      })
    }

    root.appendChild(item)
  }

  if (showValue) {
    const valueSpan = document.createElement('span')
    valueSpan.className = 'fv-rating__value'
    valueSpan.textContent = String(value)
    root.appendChild(valueSpan)
  }

  return root
}
