export interface PagingResultBase<T> {
  pageSize: number
  totalRecords: number
  items: T
}
