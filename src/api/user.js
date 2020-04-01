import request from '@/utils/request'
import qs from 'qs'

export function login(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: '/estate-agency/sys/login',
    method: 'post',
    // headers: {
    //   'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //   {'X-Requested-With': 'XMLHttpRequest'}
    // },
    data: qs.stringify(data)
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
