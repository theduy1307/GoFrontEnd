import axios, { type AxiosResponse } from 'axios'
import constants from '@/utils/constants'
import { useToastStore } from '@/shared/store/toast'
import type { Result } from '@/types/shared/Result'

const axiosClient = axios.create({
  baseURL: 'https://localhost:5000/api/v1',
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
      const {code, message} = response.data.error
      console.log(code, message)
    }
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default axiosClient
