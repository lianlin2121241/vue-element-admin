import request from '@/utils/request'
import requestMock from '@/utils/request-mock'
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

export function getRoles() {
  return request({
    url: '/estate-agency/sys/menu/nav',
    method: 'get'
  })
}

export function getInfo() {
  return request({
    url: '/estate-agency/sys/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/estate-agency/sys/logoutsys',
    method: 'get'
  })
}
