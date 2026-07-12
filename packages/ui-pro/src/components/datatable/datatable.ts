import { checkPro } from '../../license'
import type { DataTableProps, Column } from './types'

export function DataTable<T extends Record<string, any>>(props: DataTableProps<T>): HTMLTableElement {
  if (!checkPro()) {
    const div = document.createElement('div')
    div.className = 'fv-pro-required'
    div.textContent = '[FV-UI Pro] License required. Get yours at fv-ui.dev/pro'
    // Convert to table-like element
    const table = document.createElement('table')
    table.appendChild(div)
    return table
  }

  const {
    columns,
    data,
    sortable = false,
    paginated = false,
    pageSize = 10,
    onSort,
    onFilter,
    onPageChange
  } = props

  let currentPage = 1
  let sortKey = ''
  let sortDirection: 'asc' | 'desc' = 'asc'
  let filterQuery = ''

  const table = document.createElement('table')
  table.className = 'fv-datatable'

  // Create thead
  const thead = document.createElement('thead')
  const headerRow = document.createElement('tr')

  columns.forEach(col => {
    const th = document.createElement('th')
    th.textContent = col.label
    if (sortable && col.sortable !== false) {
      th.style.cursor = 'pointer'
      th.addEventListener('click', () => {
        if (sortKey === col.key) {
          sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'
        } else {
          sortKey = col.key
          sortDirection = 'asc'
        }
        if (onSort) onSort(sortKey, sortDirection)
        renderBody()
      })
    }
    headerRow.appendChild(th)
  })

  thead.appendChild(headerRow)
  table.appendChild(thead)

  // Create tbody
  const tbody = document.createElement('tbody')
  table.appendChild(tbody)

  // Filter function
  function filterData(data: T[]): T[] {
    if (!filterQuery) return data
    return data.filter(row =>
      Object.values(row).some(val =>
        String(val).toLowerCase().includes(filterQuery.toLowerCase())
      )
    )
  }

  // Sort function
  function sortData(data: T[]): T[] {
    if (!sortKey) return data
    return [...data].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      const compare = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      return sortDirection === 'asc' ? compare : -compare
    })
  }

  // Paginate function
  function paginateData(data: T[]): T[] {
    if (!paginated) return data
    const start = (currentPage - 1) * pageSize
    return data.slice(start, start + pageSize)
  }

  // Render body
  function renderBody() {
    tbody.innerHTML = ''
    let processedData = filterData(data)
    processedData = sortData(processedData)
    processedData = paginateData(processedData)

    processedData.forEach(row => {
      const tr = document.createElement('tr')
      columns.forEach(col => {
        const td = document.createElement('td')
        if (col.render) {
          const rendered = col.render(row[col.key], row)
          if (typeof rendered === 'string') {
            td.textContent = rendered
          } else {
            td.appendChild(rendered)
          }
        } else {
          td.textContent = String(row[col.key] ?? '')
        }
        tr.appendChild(td)
      })
      tbody.appendChild(tr)
    })
  }

  // Initial render
  renderBody()

  // Add pagination controls if needed
  if (paginated) {
    const paginationDiv = document.createElement('div')
    paginationDiv.className = 'fv-datatable__pagination'

    const totalPages = Math.ceil(data.length / pageSize)

    const prevBtn = document.createElement('button')
    prevBtn.textContent = 'Previous'
    prevBtn.disabled = currentPage === 1
    prevBtn.addEventListener('click', () => {
      currentPage--
      renderBody()
      updatePagination()
      if (onPageChange) onPageChange(currentPage)
    })

    const pageIndicator = document.createElement('span')
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`

    const nextBtn = document.createElement('button')
    nextBtn.textContent = 'Next'
    nextBtn.disabled = currentPage === totalPages
    nextBtn.addEventListener('click', () => {
      currentPage++
      renderBody()
      updatePagination()
      if (onPageChange) onPageChange(currentPage)
    })

    function updatePagination() {
      pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`
      prevBtn.disabled = currentPage === 1
      nextBtn.disabled = currentPage === totalPages
    }

    paginationDiv.appendChild(prevBtn)
    paginationDiv.appendChild(pageIndicator)
    paginationDiv.appendChild(nextBtn)

    table.parentElement?.appendChild(paginationDiv)
  }

  return table
}
