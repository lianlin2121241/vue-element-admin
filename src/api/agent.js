import request from '@/utils/request'

export function getDataList(params) {
  return request({
    url: `${window.globalVar.contextPath}/estateAgency/register/queryRegisterList`,
    method: 'post',
    data: params
  })
}

export function save(data) {
  return request({
    url: `${window.globalVar.contextPath}/estateAgency/register/save`,
    method: 'post',
    data: data
  })
}

export function getInfoById(id) {
  return request({
    url: `${window.globalVar.contextPath}/estateAgency/register/info/${id}`,
    method: 'get'
  })
}

export function deleteData(ids) {
  return request({
    url: `${window.globalVar.contextPath}/estateAgency/register/delete`,
    method: 'post',
    data: ids
  })
}
