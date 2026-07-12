import { mergeClasses } from '@fv-ui/shared'

export interface CardProps {
  children: string | HTMLElement | (string | HTMLElement)[]
  noHover?: boolean
  className?: string
}

export function Card(props: CardProps): HTMLDivElement {
  const { children, noHover = false, className = '' } = props

  const card = document.createElement('div')

  card.className = mergeClasses(
    'fv-card',
    noHover && 'fv-card--no-hover',
    className
  )

  if (Array.isArray(children)) {
    children.forEach(child => {
      if (typeof child === 'string') {
        card.appendChild(document.createTextNode(child))
      } else {
        card.appendChild(child)
      }
    })
  } else if (typeof children === 'string') {
    card.textContent = children
  } else {
    card.appendChild(children)
  }

  return card
}
