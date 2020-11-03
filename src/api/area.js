import request from '@/utils/request'

export function getDataList(params) {
  return request({
    url: `${window.globalVar.contextPath}/estateAgency/areainfo/queryAreaInfoList`,
    method: 'post',
    data: params
  })
}

export function save(data) {
  return request({
    url: `${window.globalVar.contextPath}/estateAgency/areainfo/save`,
    method: 'post',
    data: data
  })
}

export function getInfoById(id) {
  return request({
    url: `${window.globalVar.contextPath}/estateAgency/areainfo/info/${id}`,
    method: 'get'
  })
}

export function deleteData(ids) {
  return request({
    url: `${window.globalVar.contextPath}/estateAgency/areainfo/delete`,
    method: 'post',
    data: ids
  })
}
