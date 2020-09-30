import request from '@/utils/request'

export function getDataList(params) {
  return request({
    url: `${window.globalVar.contextPath}/estateAgency/agency/list`,
    method: 'get',
    params: params
  })
}

export function getDataListAll() {
  return request({
    url: `${window.globalVar.contextPath}/estateAgency/agency/listAll`,
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: `${window.globalVar.contextPath}/estateAgency/agency/save`,
    method: 'post',
    data: data
  })
}

export function deleteData(ids) {
  return request({
    url: `${window.globalVar.contextPath}/estateAgency/agency/delete`,
    method: 'post',
    data: ids
  })
}
