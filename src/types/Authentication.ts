export interface Menu {
  id: string
  label: string
  icon?: string
  to?: string
  parentId?: string
  url?: string
  items?: Menu[]
  target?: string
  class?: string
  separator?: boolean
  visible?: boolean
  disabled?: boolean
}
