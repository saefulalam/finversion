import { mergeClasses } from '@fv-ui/shared'

export interface TabItem {
  id: string
  label: string
  content: string | HTMLElement
}

export interface TabsProps {
  tabs: TabItem[]
  defaultTab?: string
  onChange?: (tabId: string) => void
}

export function Tabs(props: TabsProps): HTMLDivElement {
  const { tabs, defaultTab = tabs[0]?.id, onChange } = props

  const container = document.createElement('div')

  // Tab list
  const tabList = document.createElement('div')
  tabList.className = 'fv-tabs'

  // Content area
  const content = document.createElement('div')
  content.className = 'fv-tabs__content'

  const tabButtons: HTMLButtonElement[] = []

  tabs.forEach(tab => {
    const btn = document.createElement('button')
    btn.className = mergeClasses('fv-tab', tab.id === defaultTab && 'active')
    btn.textContent = tab.label
    btn.dataset.tabId = tab.id

    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'))
      btn.classList.add('active')

      while (content.firstChild) {
        content.removeChild(content.firstChild)
      }
      if (typeof tab.content === 'string') {
        content.textContent = tab.content
      } else {
        content.appendChild(tab.content.cloneNode(true))
      }

      if (onChange) onChange(tab.id)
    })

    tabButtons.push(btn)
    tabList.appendChild(btn)
  })

  // Show default tab content
  const defaultTabData = tabs.find(t => t.id === defaultTab)
  if (defaultTabData) {
    if (typeof defaultTabData.content === 'string') {
      content.textContent = defaultTabData.content
    } else {
      content.appendChild(defaultTabData.content)
    }
  }

  container.appendChild(tabList)
  container.appendChild(content)

  return container
}