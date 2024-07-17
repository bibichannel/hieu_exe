/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios'
import {
  AuthControllerApi,
  CandidateControllerApi,
  CategoryControllerApi,
  EmployerControllerApi,
  JobControllerApi,
  JobRoleControllerApi,
  PackageControllerApi,
  UserControllerApi,
  ProfileControllerApi,
  PaymentControllerApi
} from './v1'
import { BaseAPI } from './v1/base'
// import globalAxios, { AxiosError } from 'axios'
// import { responseInterceptor, responseErrorInterceptor } from '~/utils'
// globalAxios.interceptors.response.use(responseInterceptor, responseErrorInterceptor)

const profileApi = new ProfileControllerApi()
const employerApi = new EmployerControllerApi()
const categoryApi = new CategoryControllerApi()
const authApi = new AuthControllerApi()
const candidateApi = new CandidateControllerApi()
const jobApi = new JobControllerApi()
const packageApi = new PackageControllerApi()
const userApi = new UserControllerApi()
const jobRoleApi = new JobRoleControllerApi()
const paymentApi = new PaymentControllerApi()
type ProfileApiType = typeof profileApi
type AuthApiType = typeof authApi
type CategoryApiType = typeof categoryApi
type CandidateApiType = typeof candidateApi
type EmployerApiType = typeof employerApi
type JobApiType = typeof jobApi
type JobRoleApiType = typeof jobRoleApi
type PackageApiType = typeof packageApi
type UserApiType = typeof userApi
type PaymentApiType = typeof paymentApi

type ApiType = AuthApiType &
  CandidateApiType &
  CategoryApiType &
  EmployerApiType &
  JobApiType &
  JobRoleApiType &
  PackageApiType &
  UserApiType &
  ProfileApiType &
  PaymentApiType

const mergeApis = (...apis: BaseAPI[]): ApiType => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mergedApi: any = {}
  apis.forEach((api) => {
    const proto = Object.getPrototypeOf(api)
    const keys = Object.getOwnPropertyNames(proto)

    keys.forEach((key) => {
      // Kiểm tra xem thuộc tính có phải là một phương thức không
      if (key !== 'constructor') {
        const descriptor = Object.getOwnPropertyDescriptor(proto, key)
        if (descriptor && typeof descriptor.value === 'function') {
          mergedApi[key] = descriptor.value.bind(api)
        } else if (!mergedApi[key]) {
          mergedApi[key] = api[key]
        }
      }
    })
  })
  return mergedApi
}

const api: ApiType = mergeApis(
  authApi,
  candidateApi,
  employerApi,
  jobApi,
  jobRoleApi,
  packageApi,
  userApi,
  profileApi,
  categoryApi,
  paymentApi
)
export interface StringResponse {
  /**
   *
   * @type {number}
   * @memberof StringResponse
   */
  code?: number
  /**
   *
   * @type {string}
   * @memberof StringResponse
   */
  message?: string
  /**
   *
   * @type {number}
   * @memberof StringResponse
   */
  timestamp?: number
}
export const formatError = (err: any) => {
  const error = err as AxiosError<StringResponse>

  if (error.response?.data.message) {
    return error.response?.data?.message
  } else if (error.message) {
    return error.message
  }
  return 'Có lỗi xảy ra'
}
export default api
