import request from '@/utils/request'
import requestMock from '@/utils/request-mock'

export function searchUser(name) {
  return requestMock({
    url: '/vue-element-admin/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return requestMock({
    url: '/vue-element-admin/transaction/list',
    method: 'get',
    params: query
  })
}
