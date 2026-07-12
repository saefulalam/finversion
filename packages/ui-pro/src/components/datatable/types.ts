export interface Column<T = any> {
  key: string
  label: string
  sortable?: boolean
  render?: (value: any, row: T) => string | HTMLElement
}

export interface DataTableProps<T = any> {
  columns: Column<T>[]
  data: T[]
  sortable?: boolean
  filterable?: boolean
  paginated?: boolean
  pageSize?: number
  onSort?: (key: string, direction: 'asc' | 'desc') => void
  onFilter?: (query: string) => void
  onPageChange?: (page: number) => void
}
