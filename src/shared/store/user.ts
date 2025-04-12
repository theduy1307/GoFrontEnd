import { authenticationApi } from '@/infrastructure/apis/authenticationApi'
import { userApi } from '@/infrastructure/apis/userApi'
import constants from '@/utils/constants'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToastStore } from './toast'
import type { AxiosError, AxiosResponse } from 'axios'
import type { UserInfo } from '@/types/UserInfo'
import type { Menu } from '@/types/Authentication'
import type { Result } from '@/types/shared/Result'

export const useUserStore = defineStore('user', () => {
  const route = useRoute()
  const userInfo = ref<UserInfo>({
    id: '',
    fullName: '',
    accessToken: localStorage.getItem(constants.ACCESS_TOKEN) ?? '',
    roleIds: [],
    email: ''
  })
  const listMenus = ref<Menu[]>([])
  const { getUserInfo } = userApi()
  const { login, getMenu } = authenticationApi()
  const redirectUrl = route.query.redirectUrl || '/'
  const router = useRouter()
  const isAuthenticated = computed(() => !!userInfo.value.accessToken)
  const toast = useToastStore()
  // Hàm login: Gửi email & password, lấy token về
  const userLogin = async (email: string, password: string) => {
    try {
      const token = await login({ email, password })
      localStorage.setItem(constants.ACCESS_TOKEN, token)
      userInfo.value.accessToken = token
      router.push(redirectUrl as string)
      toast.addToast({
        severity: 'success',
        summary: 'Thành công!',
        detail: 'Đăng nhập thành công',
        life: 3000
      })
      await getUser() // Gọi API lấy thông tin user sau khi login
      return true
    } catch (error) {
      const { response } = error as AxiosError<Result>
      console.log(response?.data.error.message)
      toast.addToast({
        severity: 'error',
        summary: 'Lỗi',
        detail: response?.data.error.message as string,
        life: 3000
      })
      return false
    }
  }

  // Hàm lấy thông tin user
  const getUser = async () => {
    try {
      const user = await getUserInfo() // Gọi API lấy thông tin user sau khi login
      userInfo.value = user
      await getUserMenu()
    } catch (error) {
      if ((error as any).response && (error as any).response.status == 401) {
        router.push(`/auth/login`)
      }
      userInfo.value = { id: '', fullName: '', accessToken: '', roleIds: [], email: '' }
      console.error('Failed to fetch user info', error)
      //logout() // Nếu lỗi token, logout
    }
  }

  // Hàm lấy thông tin user
  const getUserMenu = async () => {
    await getMenu(userInfo.value.id).then((menu: Menu[]) => {
      listMenus.value = menu ?? []
    })
  }

  // Hàm logout
  const logout = () => {
    userInfo.value = { id: '', fullName: '', accessToken: '', roleIds: [], email: '' }
    localStorage.removeItem(constants.USER_INFO)
    localStorage.removeItem(constants.ACCESS_TOKEN)
  }

  return { userInfo, listMenus, isAuthenticated, logout, userLogin, getUser, getUserMenu }
})
