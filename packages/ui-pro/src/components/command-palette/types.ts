export interface CommandItem {
  id: string
  label: string
  description?: string
  icon?: string
  shortcut?: string
  onSelect?: () => void
}

export interface CommandGroup {
  title: string
  items: CommandItem[]
}

export interface CommandPaletteProps {
  groups: CommandGroup[]
  placeholder?: string
  onSelect?: (item: CommandItem) => void
}
