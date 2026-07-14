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

  const tabList = document.createElement('div')
  tabList.className = 'fv-tabs'

  const contentArea = document.createElement('div')
  contentArea.className = 'fv-tabs__content'

  const tabButtons: HTMLButtonElement[] = []
  const panels: HTMLDivElement[] = []

  tabs.forEach((tab, index) => {
    const btn = document.createElement('button')
    btn.className = mergeClasses('fv-tab', tab.id === defaultTab && 'active')
    btn.textContent = tab.label
    btn.dataset.tabId = tab.id

    const panel = document.createElement('div')
    panel.className = 'fv-tab-panel'
    if (tab.id === defaultTab) {
      panel.classList.add('active')
    }
    if (typeof tab.content === 'string') {
      panel.textContent = tab.content
    } else {
      panel.appendChild(tab.content)
    }

    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'))
      panels.forEach(p => p.classList.remove('active'))
      btn.classList.add('active')
      panel.classList.add('active')
      if (onChange) onChange(tab.id)
    })

    tabButtons.push(btn)
    panels.push(panel)
    tabList.appendChild(btn)
    contentArea.appendChild(panel)
  })

  container.appendChild(tabList)
  container.appendChild(contentArea)

  return container
}
