import request from '@/utils/request'

export function getDataList() {
  return request({
    url: `${window.globalVar.contextPath}/estateAgency/areacategory/list`,
    method: 'get'
  })
}

export function getDataTree() {
  return request({
    url: `${window.globalVar.contextPath}/estateAgency/areacategory/tree`,
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: `${window.globalVar.contextPath}/estateAgency/areacategory/save`,
    method: 'post',
    data: data
  })
}

export function update(data) {
  return request({
    url: `${window.globalVar.contextPath}/estateAgency/areacategory/update`,
    method: 'post',
    data: data
  })
}

export function deleteData(id) {
  return request({
    url: `${window.globalVar.contextPath}/estateAgency/areacategory/delete`,
    method: 'post',
    params: {
      categoryId: id
    }
  })
}
