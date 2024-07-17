/* eslint-disable @typescript-eslint/no-explicit-any */
export const formatErrorMessage = (error: any): string => {
  if (error.response && error.response.data.data) {
    return error.response.data.data.join(', ')
  } else if (error.response && error.response.data.message) {
    return error.response.data.message
  } else if (error.message) {
    return error.message
  } else {
    return 'Server đang bị lỗi !!!'
  }
}
export const formatUserImageUrl = (image?: string): string => {
  return `${import.meta.env.VITE_BASE_PATH}/uploads/images/users/${image}`
}
export const formatJobImageUrl = (image?: string): string => {
  return `${import.meta.env.VITE_BASE_PATH}/uploads/images/jobs/${image}`
}
export const responseInterceptor = (response: any) => {
  /**
   * Add logic for successful response
   */
  return response?.data || {}
}
export const responseErrorInterceptor = async (error: any) => {
  return Promise.reject(error)
}
export const formatCurrencyVND = (amount?: number): string => {
  if (!amount) return Number(0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}
export const formatDateToDDMMYYYY = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0') // Lấy ngày và đảm bảo có 2 chữ số
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Lấy tháng và đảm bảo có 2 chữ số (lưu ý tháng bắt đầu từ 0)
  const year = date.getFullYear().toString()

  return `${day}-${month}-${year}`
}
export const formatDateToDDMMYYYYHHMMSS = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0') // Lấy ngày và đảm bảo có 2 chữ số
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Lấy tháng và đảm bảo có 2 chữ số (lưu ý tháng bắt đầu từ 0)
  const year = date.getFullYear().toString() // Lấy năm

  const hours = date.getHours().toString().padStart(2, '0') // Lấy giờ và đảm bảo có 2 chữ số
  const minutes = date.getMinutes().toString().padStart(2, '0') // Lấy phút và đảm bảo có 2 chữ số
  const seconds = date.getSeconds().toString().padStart(2, '0') // Lấy giây và đảm bảo có 2 chữ số

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
}
