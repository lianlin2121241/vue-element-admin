import request from '@/utils/request'
import requestMock from '@/utils/request-mock'

export function getRoutes() {
  return requestMock({
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}

export function getRoles() {
  return requestMock({
    url: '/vue-element-admin/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return requestMock({
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return requestMock({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return requestMock({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}
