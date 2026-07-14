import { mergeClasses } from '@fv-ui/shared'

export interface BadgeProps {
  children: string
  variant?: 'accent' | 'success' | 'warning' | 'danger' | 'outline-accent' | 'outline-success' | 'outline-warning' | 'outline-danger'
  dot?: boolean
  count?: boolean
}

export function Badge(props: BadgeProps): HTMLSpanElement {
  const { children, variant = 'accent', dot = false, count = false } = props

  const badge = document.createElement('span')
  badge.className = mergeClasses(
    'fv-badge',
    `fv-badge--${variant}`,
    dot && 'fv-badge--dot',
    count && 'fv-badge--count'
  )
  badge.textContent = children
  return badge
}