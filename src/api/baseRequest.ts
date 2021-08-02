import Axios, { AxiosError, AxiosResponse } from 'axios'

const axios = Axios.create({
  baseURL: 'dev',
})

const respSuccessInterceptor = (response: AxiosResponse) => {
  return response.data
}

const respFailInterceptor = (error: AxiosError) => {
  return Promise.reject(error)
}

axios.interceptors.response.use(respSuccessInterceptor, respFailInterceptor)

export const get = axios.get
export const post = axios.post
export default axios
