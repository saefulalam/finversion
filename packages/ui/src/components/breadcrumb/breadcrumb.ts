import { mergeClasses } from '@fv-ui/shared'

export interface BreadcrumbItem {
  label: string
  href?: string
  active?: boolean
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb(props: BreadcrumbProps): HTMLElement {
  const { items } = props

  const nav = document.createElement('nav')
  nav.className = 'fv-breadcrumb'

  items.forEach((item, index) => {
    if (index > 0) {
      const sep = document.createElement('span')
      sep.className = 'fv-breadcrumb__sep'
      sep.textContent = '/'
      nav.appendChild(sep)
    }

    if (item.active) {
      const span = document.createElement('span')
      span.className = mergeClasses('fv-breadcrumb__item', 'active')
      span.textContent = item.label
      span.setAttribute('aria-current', 'page')
      nav.appendChild(span)
    } else {
      const link = document.createElement('a')
      link.className = 'fv-breadcrumb__item'
      link.textContent = item.label
      if (item.href) link.href = item.href
      nav.appendChild(link)
    }
  })

  return nav
}