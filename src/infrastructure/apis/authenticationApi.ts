import type { AxiosResponse } from 'axios'
import axiosClient from '../axiosClient'
import { AuthenticationEndpoint } from '../enums/authenticationEndpoint'
import type { Menu } from '@/types/Authentication'
import type { Result } from '@/types/shared/Result'

export function authenticationApi() {
  function login(credentials: { email: string; password: string }): Promise<string> {
    return axiosClient.post(AuthenticationEndpoint.Login, credentials)
  }

  function getMenu(employeeId: string): Promise<Menu[]> {
    return axiosClient.get(AuthenticationEndpoint.Menu, { params: { employeeId } })
  }
  return {
    login,
    getMenu
  }
}
