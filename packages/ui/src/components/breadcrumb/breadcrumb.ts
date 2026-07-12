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

    const link = document.createElement('a')
    link.className = mergeClasses('fv-breadcrumb__item', item.active && 'active')
    link.textContent = item.label
    if (item.href) link.href = item.href

    nav.appendChild(link)
  })

  return nav
}