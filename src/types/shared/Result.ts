export interface Result<T = any> {
  value: T
  isSuccess: boolean
  isError: boolean
  error: Error
}
export interface Error {
  code: string
  message: string
}
