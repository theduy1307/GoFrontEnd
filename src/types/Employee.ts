export interface Employee {
  id: number
  firstName: string
  lastName: string
  nickName: string
  dateOfBirth: string
  placeOfBirth: string
  gender: number
  passportNumber: string
  taxId: string
  isActive: boolean
  roleIds: number[]
}

export interface CreateEmployeeCommand {
  firstName: string
  lastName: string
  nickName: string
  email: string
  dateOfBirth: string
  placeOfBirth: string
  gender: number
}
