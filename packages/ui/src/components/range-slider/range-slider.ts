import { mergeClasses } from '@fv-ui/shared'

export interface RangeSliderProps {
  min?: number
  max?: number
  value?: [number, number]
  step?: number
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onChange?: (value: [number, number]) => void
}

export function RangeSlider(props: RangeSliderProps): HTMLDivElement {
  const {
    min = 0,
    max = 100,
    value = [25, 75],
    step = 1,
    size = 'md',
    disabled = false,
    onChange
  } = props

  const wrapper = document.createElement('div')
  wrapper.className = mergeClasses(
    'fv-range-slider',
    size !== 'md' && `fv-range-slider--${size}`,
    disabled && 'fv-range-slider--disabled'
  )

  const track = document.createElement('div')
  track.className = 'fv-range-slider__track'

  const fill = document.createElement('div')
  fill.className = 'fv-range-slider__fill'

  const thumbMin = document.createElement('button')
  thumbMin.type = 'button'
  thumbMin.className = 'fv-range-slider__thumb'
  thumbMin.disabled = disabled
  thumbMin.setAttribute('aria-label', `Min value ${value[0]}`)
  thumbMin.setAttribute('tabindex', disabled ? '-1' : '0')

  const thumbMax = document.createElement('button')
  thumbMax.type = 'button'
  thumbMax.className = 'fv-range-slider__thumb'
  thumbMax.disabled = disabled
  thumbMax.setAttribute('aria-label', `Max value ${value[1]}`)
  thumbMax.setAttribute('tabindex', disabled ? '-1' : '0')

  const labelMin = document.createElement('span')
  labelMin.className = 'fv-range-slider__label'
  labelMin.textContent = String(value[0])

  const labelMax = document.createElement('span')
  labelMax.className = 'fv-range-slider__label'
  labelMax.textContent = String(value[1])

  const valueMin = document.createElement('span')
  valueMin.className = 'fv-range-slider__value'
  valueMin.textContent = String(value[0])

  const valueMax = document.createElement('span')
  valueMax.className = 'fv-range-slider__value'
  valueMax.textContent = String(value[1])

  function pct(v: number) {
    return ((v - min) / (max - min)) * 100
  }

  function update() {
    const minPct = pct(value[0])
    const maxPct = pct(value[1])

    fill.style.left = `${minPct}%`
    fill.style.width = `${maxPct - minPct}%`
    thumbMin.style.left = `${minPct}%`
    thumbMax.style.left = `${maxPct}%`

    labelMin.textContent = String(value[0])
    labelMax.textContent = String(value[1])
    valueMin.textContent = String(value[0])
    valueMax.textContent = String(value[1])

    thumbMin.setAttribute('aria-label', `Min value ${value[0]}`)
    thumbMax.setAttribute('aria-label', `Max value ${value[1]}`)
  }

  update()

  function clamp(v: number) {
    return Math.min(max, Math.max(min, v))
  }

  function snap(v: number) {
    return Math.round(v / step) * step
  }

  function handleDrag(thumb: HTMLButtonElement, isMin: boolean) {
    const onMove = (e: MouseEvent | TouchEvent) => {
      const rect = wrapper.getBoundingClientRect()
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      let pct = (clientX - rect.left) / rect.width
      pct = Math.max(0, Math.min(1, pct))
      let newVal = snap(min + pct * (max - min))

      if (isMin) {
        newVal = Math.min(newVal, value[1] - step)
        value[0] = clamp(newVal)
      } else {
        newVal = Math.max(newVal, value[0] + step)
        value[1] = clamp(newVal)
      }

      update()
      if (onChange) onChange([value[0], value[1]])
    }

    const onUp = () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('touchmove', onMove)
      document.removeEventListener('touchend', onUp)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('touchmove', onMove)
    document.addEventListener('touchend', onUp)
  }

  thumbMin.addEventListener('mousedown', () => handleDrag(thumbMin, true))
  thumbMin.addEventListener('touchstart', () => handleDrag(thumbMin, true))
  thumbMax.addEventListener('mousedown', () => handleDrag(thumbMax, false))
  thumbMax.addEventListener('touchstart', () => handleDrag(thumbMax, false))

  wrapper.appendChild(track)
  wrapper.appendChild(fill)
  wrapper.appendChild(thumbMin)
  wrapper.appendChild(thumbMax)
  wrapper.appendChild(labelMin)
  wrapper.appendChild(labelMax)
  wrapper.appendChild(valueMin)
  wrapper.appendChild(valueMax)

  return wrapper
}
