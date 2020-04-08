import request from '@/utils/request'
import requestMock from '@/utils/request-mock'

export function fetchList(query) {
  return requestMock({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return requestMock({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return requestMock({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return requestMock({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return requestMock({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
