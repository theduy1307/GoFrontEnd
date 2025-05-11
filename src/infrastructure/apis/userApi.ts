import type { AxiosResponse } from 'axios'
import axiosClient from '../axiosClient'
import { UserInfoEnpoint } from '../enums/userInfoEndpoint'
import type { UserInfo } from '@/types/UserInfo'
import type { PagingResultBase } from '@/types/shared/PagingResultBase'
import type { Employee } from '@/types/Employee'

export function userApi() {
  function getUserInfo(): Promise<UserInfo> {
    return axiosClient.get(UserInfoEnpoint.Me)
  }
  function getEmployeePaging(pageIndex: number, pageSize: number): Promise<PagingResultBase<Employee[]>> {
    return axiosClient.get(UserInfoEnpoint.Employee, { params: { pageIndex, pageSize } })
  }
  return {
    getUserInfo,
    getEmployeePaging
  }
}
