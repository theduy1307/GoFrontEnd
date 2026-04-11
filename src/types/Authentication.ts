export interface Menu {
  id: number
  label: string
  icon?: string
  to?: string | null
  parentId?: number | null
  items?: Menu[]
  visible?: boolean
  url?: string
  target?: string
  class?: string
  separator?: boolean
  disabled?: boolean
}
