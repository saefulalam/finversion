import { mergeClasses } from '@fv-ui/shared'

export interface TooltipProps {
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export function Tooltip(props: TooltipProps): HTMLDivElement {
  const { content, position = 'top' } = props

  const wrapper = document.createElement('div')
  wrapper.className = mergeClasses('fv-tooltip', `fv-tooltip--${position}`)
  wrapper.dataset.fvTooltip = content

  return wrapper
}