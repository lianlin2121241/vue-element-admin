import request from '@/utils/request'
import requestMock from '@/utils/request-mock'

export function getToken() {
  return requestMock({
    url: '/qiniu/upload/token', // 假地址 自行替换
    method: 'get'
  })
}
