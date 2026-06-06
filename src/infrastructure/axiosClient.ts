import axios, { type AxiosResponse } from 'axios'
import constants from '@/utils/constants'
import { useToastStore } from '@/shared/store/toast'
import type { Result } from '@/types/shared/Result'
import { DEFAULT_API_BASE_URL } from '@/infrastructure/constants/apiConstants'

const axiosClient = axios.create({
  baseURL: DEFAULT_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }
})
axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(constants.ACCESS_TOKEN)
    Object.assign(config.headers, { Authorization: `Bearer ${accessToken}` })
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
axiosClient.interceptors.response.use(
  (response: AxiosResponse<Result>) => {
    if(response.data.isSuccess)
    {
      return response.data.value
    }
    else {
      const error = response.data.error
      const errorMessage = error?.message || 'An error occurred'
      const errorCode = error?.code || 'UNKNOWN_ERROR'
      console.log(errorCode, errorMessage)
      return Promise.reject(new Error(errorMessage))
    }
  },
  (error: AxiosResponse<Result>) => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default axiosClient
