import type { AxiosResponse } from 'axios'
import axiosClient from '../axiosClient'
import { EmployeeEndpoint } from '../enums/employeeEndpoint'
import type { PagingResultBase } from '@/types/shared/PagingResultBase'
import type { Employee } from '@/types/Employee'

export function employeeApi() {
  function getEmployeePaging(pageIndex: number, pageSize: number): Promise<PagingResultBase<Employee[]>> {
    return axiosClient.get(EmployeeEndpoint.Employee, { params: { pageIndex, pageSize } })
  }

  return {
    getEmployeePaging
  }
}
