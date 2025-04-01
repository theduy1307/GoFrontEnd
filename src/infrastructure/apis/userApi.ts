import type { AxiosResponse } from 'axios'
import axiosClient from '../axiosClient'
import { UserInfoEnpoint } from '../enums/userInfoEndpoint'
import type { UserInfo } from '@/types/UserInfo'

export function userApi() {
  function getUserInfo(): Promise<UserInfo> {
    return axiosClient.get(UserInfoEnpoint.Employee)
  }
  return {
    getUserInfo
  }
}
