import { mergeClasses } from '@fv-ui/shared'

export interface AccordionItem {
  title: string
  content: string | HTMLElement
}

export interface AccordionProps {
  items: AccordionItem[]
}

export function Accordion(props: AccordionProps): HTMLDivElement {
  const { items } = props

  const container = document.createElement('div')
  container.className = 'fv-accordion'

  items.forEach(item => {
    const itemEl = document.createElement('div')
    itemEl.className = 'fv-accordion__item'

    const trigger = document.createElement('button')
    trigger.className = 'fv-accordion__trigger'
    trigger.setAttribute('aria-expanded', 'false')
    trigger.innerHTML = `
      <span>${item.title}</span>
      <i class="bi bi-chevron-down"></i>
    `

    const content = document.createElement('div')
    content.className = 'fv-accordion__content'
    content.setAttribute('hidden', '')

    const body = document.createElement('div')
    body.className = 'fv-accordion__body'
    if (typeof item.content === 'string') {
      body.textContent = item.content
    } else {
      body.appendChild(item.content)
    }
    content.appendChild(body)

    trigger.addEventListener('click', () => {
      const isOpen = itemEl.classList.toggle('open')
      trigger.setAttribute('aria-expanded', String(isOpen))
      if (isOpen) {
        content.removeAttribute('hidden')
      } else {
        content.setAttribute('hidden', '')
      }
    })

    itemEl.appendChild(trigger)
    itemEl.appendChild(content)
    container.appendChild(itemEl)
  })

  return container
}