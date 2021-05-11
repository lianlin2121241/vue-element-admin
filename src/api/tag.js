import request from '@/utils/request'

export function getDataList() {
  return request({
    url: `${window.globalVar.contextPath}/estateAgency/tag/list`,
    method: 'get'
  })
}

export function getDataTree() {
  return request({
    url: `${window.globalVar.contextPath}/estateAgency/tag/tree`,
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: `${window.globalVar.contextPath}/estateAgency/tag/save`,
    method: 'post',
    data: data
  })
}

export function update(data) {
  return request({
    url: `${window.globalVar.contextPath}/estateAgency/tag/update`,
    method: 'post',
    data: data
  })
}

export function deleteData(id) {
  return request({
    url: `${window.globalVar.contextPath}/estateAgency/tag/delete`,
    method: 'post',
    params: {
      tagId: id
    }
  })
}
